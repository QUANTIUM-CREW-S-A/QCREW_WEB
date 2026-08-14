-- =============================================================
-- QCREW_WEB - esquema inicial (migracion desde Firestore)
-- =============================================================
-- Modelo de admin: se considera admin al usuario cuyo JWT trae
-- app_metadata.role = 'admin'. app_metadata NO es editable por el
-- usuario, a diferencia de user_metadata, por eso es seguro usarlo
-- en policies de RLS.
-- =============================================================

-- -------------------------------------------------------------
-- Helper: es el usuario actual un admin?
-- -------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(
    (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- =============================================================
-- TESTIMONIALS
-- =============================================================
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null default '',
  company     text        not null default '',
  role        text        not null default '',
  content     text        not null,
  rating      smallint    not null default 5 check (rating between 1 and 5),
  category    text        not null default '',
  image_url   text        not null default '',
  status      text        not null default 'pending'
                check (status in ('pending', 'approved', 'rejected')),
  featured    boolean     not null default false,
  admin_notes text        not null default '',
  approved_at timestamptz,
  approved_by text        not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Consulta publica: status='approved' ordenado por fecha desc
create index if not exists testimonials_public_idx
  on public.testimonials (status, created_at desc);

-- Consulta de destacados
create index if not exists testimonials_featured_idx
  on public.testimonials (status, featured, created_at desc)
  where featured;

alter table public.testimonials enable row level security;

-- Cualquiera puede leer los testimonios aprobados
create policy "testimonios aprobados son publicos"
  on public.testimonials for select
  to anon, authenticated
  using (status = 'approved');

-- Cualquiera puede enviar un testimonio, pero SIEMPRE entra como
-- pendiente y sin destacar. El WITH CHECK impide auto-aprobarse.
create policy "cualquiera puede enviar un testimonio"
  on public.testimonials for insert
  to anon, authenticated
  with check (
    status = 'pending'
    and featured = false
    and approved_at is null
    and approved_by = ''
    and admin_notes = ''
  );

-- El admin ve y gestiona todo
create policy "admin lee todos los testimonios"
  on public.testimonials for select
  to authenticated
  using ((select public.is_admin()));

create policy "admin actualiza testimonios"
  on public.testimonials for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "admin borra testimonios"
  on public.testimonials for delete
  to authenticated
  using ((select public.is_admin()));

-- =============================================================
-- CONVERSATIONS
-- =============================================================
create table if not exists public.conversations (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users (id) on delete set null,
  client_name  text        not null default '',
  client_email text        not null default '',
  client_phone text        not null default '',
  status       text        not null default 'unread'
                 check (status in ('unread', 'read', 'responded')),
  priority     text        not null default 'medium'
                 check (priority in ('low', 'medium', 'high', 'urgent')),
  tags         text[]      not null default '{}',
  notes        text        not null default '',
  last_message text        not null default '',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists conversations_updated_idx
  on public.conversations (updated_at desc);

create index if not exists conversations_user_idx
  on public.conversations (user_id);

alter table public.conversations enable row level security;

-- El cliente (sesion anonima) solo ve y toca su propia conversacion
create policy "el cliente lee su conversacion"
  on public.conversations for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "el cliente crea su conversacion"
  on public.conversations for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "el cliente actualiza su conversacion"
  on public.conversations for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- El admin ve y gestiona todas
create policy "admin lee todas las conversaciones"
  on public.conversations for select
  to authenticated
  using ((select public.is_admin()));

create policy "admin actualiza conversaciones"
  on public.conversations for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "admin borra conversaciones"
  on public.conversations for delete
  to authenticated
  using ((select public.is_admin()));

-- =============================================================
-- MESSAGES
-- =============================================================
create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null
                    references public.conversations (id) on delete cascade,
  text            text not null,
  sender          text not null check (sender in ('client', 'admin')),
  created_at      timestamptz not null default now()
);

create index if not exists messages_conversation_idx
  on public.messages (conversation_id, created_at);

alter table public.messages enable row level security;

-- El cliente lee los mensajes de su conversacion
create policy "el cliente lee sus mensajes"
  on public.messages for select
  to authenticated
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and c.user_id = (select auth.uid())
    )
  );

-- El cliente solo puede escribir mensajes con sender='client'
create policy "el cliente escribe en su conversacion"
  on public.messages for insert
  to authenticated
  with check (
    sender = 'client'
    and exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and c.user_id = (select auth.uid())
    )
  );

create policy "admin lee todos los mensajes"
  on public.messages for select
  to authenticated
  using ((select public.is_admin()));

create policy "admin responde mensajes"
  on public.messages for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "admin borra mensajes"
  on public.messages for delete
  to authenticated
  using ((select public.is_admin()));

-- =============================================================
-- updated_at automatico
-- =============================================================
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists testimonials_touch_updated_at on public.testimonials;
create trigger testimonials_touch_updated_at
  before update on public.testimonials
  for each row execute function public.touch_updated_at();

drop trigger if exists conversations_touch_updated_at on public.conversations;
create trigger conversations_touch_updated_at
  before update on public.conversations
  for each row execute function public.touch_updated_at();

-- Al insertar un mensaje, refrescamos la conversacion (last_message,
-- updated_at y status) sin depender de que el cliente lo haga bien.
create or replace function public.sync_conversation_on_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.conversations
     set last_message = new.text,
         updated_at   = now(),
         status       = case when new.sender = 'client' then 'unread'
                             else 'responded' end
   where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists messages_sync_conversation on public.messages;
create trigger messages_sync_conversation
  after insert on public.messages
  for each row execute function public.sync_conversation_on_message();

-- El mensaje de bienvenida lo genera la base de datos: el cliente no
-- puede insertar mensajes con sender='admin' (lo bloquea RLS).
create or replace function public.seed_welcome_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.messages (conversation_id, text, sender)
  values (
    new.id,
    '¡Hola ' || coalesce(nullif(new.client_name, ''), 'y bienvenido') ||
      '! Soy el asistente de Quantium Crew. ¿En qué puedo ayudarte hoy?',
    'admin'
  );
  return new;
end;
$$;

drop trigger if exists conversations_seed_welcome on public.conversations;
create trigger conversations_seed_welcome
  after insert on public.conversations
  for each row execute function public.seed_welcome_message();

-- Postgres concede EXECUTE a PUBLIC en toda funcion nueva, asi que una
-- funcion SECURITY DEFINER en el schema public queda expuesta como endpoint
-- llamable por anon/authenticated. Estas son funciones de trigger y solo
-- deben ejecutarlas los triggers.
revoke execute on function public.sync_conversation_on_message() from public, anon, authenticated;
revoke execute on function public.seed_welcome_message() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;

-- =============================================================
-- ACCESO A LA DATA API
-- =============================================================
-- Segun la configuracion de Data API del proyecto, una tabla creada por SQL
-- puede no quedar expuesta. Concedemos el acceso explicitamente; que RLS ya
-- este activo es lo que decide que FILAS ve cada rol.
grant select, insert          on public.testimonials  to anon, authenticated;
grant update, delete          on public.testimonials  to authenticated;
grant select, insert, update  on public.conversations to authenticated;
grant delete                  on public.conversations to authenticated;
grant select, insert          on public.messages      to authenticated;
grant delete                  on public.messages      to authenticated;

-- =============================================================
-- REALTIME
-- =============================================================
alter publication supabase_realtime add table public.testimonials;
alter publication supabase_realtime add table public.conversations;
alter publication supabase_realtime add table public.messages;

-- NOTA: las policies de SELECT/UPDATE/INSERT definidas arriba se fusionan
-- despues en 20260813031228_consolidate_permissive_policies.sql. El estado
-- final de RLS es el de ese archivo.
