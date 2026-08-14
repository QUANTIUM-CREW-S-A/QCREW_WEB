-- =============================================================
-- Fusiona los pares de policies admin/cliente en una sola por accion.
-- =============================================================
-- Postgres evalua CADA policy permisiva para cada fila, asi que dos
-- policies para el mismo rol y accion cuestan el doble. Con un OR en una
-- sola policy la evaluacion corta antes. Lo reporta el advisor de
-- performance como `multiple_permissive_policies`.
--
-- Este archivo define el estado FINAL de RLS del proyecto.
-- =============================================================

-- ---------- TESTIMONIALS: SELECT ----------
drop policy if exists "testimonios aprobados son publicos" on public.testimonials;
drop policy if exists "admin lee todos los testimonios"    on public.testimonials;

-- Para el rol anon, is_admin() siempre devuelve false.
create policy "lectura de testimonios"
  on public.testimonials for select
  to anon, authenticated
  using (status = 'approved' or (select public.is_admin()));

-- ---------- CONVERSATIONS: SELECT ----------
drop policy if exists "el cliente lee su conversacion"     on public.conversations;
drop policy if exists "admin lee todas las conversaciones" on public.conversations;

create policy "lectura de conversaciones"
  on public.conversations for select
  to authenticated
  using ((select auth.uid()) = user_id or (select public.is_admin()));

-- ---------- CONVERSATIONS: UPDATE ----------
drop policy if exists "el cliente actualiza su conversacion" on public.conversations;
drop policy if exists "admin actualiza conversaciones"       on public.conversations;

-- El WITH CHECK impide que un cliente reasigne su conversacion a otro user_id.
create policy "actualizacion de conversaciones"
  on public.conversations for update
  to authenticated
  using ((select auth.uid()) = user_id or (select public.is_admin()))
  with check ((select auth.uid()) = user_id or (select public.is_admin()));

-- ---------- MESSAGES: SELECT ----------
drop policy if exists "el cliente lee sus mensajes"  on public.messages;
drop policy if exists "admin lee todos los mensajes" on public.messages;

create policy "lectura de mensajes"
  on public.messages for select
  to authenticated
  using (
    (select public.is_admin())
    or exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and c.user_id = (select auth.uid())
    )
  );

-- ---------- MESSAGES: INSERT ----------
drop policy if exists "el cliente escribe en su conversacion" on public.messages;
drop policy if exists "admin responde mensajes"               on public.messages;

-- El cliente solo puede escribir con sender='client'. Que no pueda hacerse
-- pasar por 'admin' es lo que obliga a que el mensaje de bienvenida lo
-- inserte un trigger SECURITY DEFINER y no el navegador.
create policy "escritura de mensajes"
  on public.messages for insert
  to authenticated
  with check (
    (select public.is_admin())
    or (
      sender = 'client'
      and exists (
        select 1 from public.conversations c
        where c.id = conversation_id
          and c.user_id = (select auth.uid())
      )
    )
  );
