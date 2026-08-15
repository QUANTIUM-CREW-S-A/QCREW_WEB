-- =============================================================
-- TIENDA: products, quote_requests, quote_items
-- =============================================================
-- Modelo "carrito -> solicitud de cotizacion": el cliente arma un carrito
-- y lo envia como quote_request + quote_items. No hay pago en linea; el
-- admin cierra la venta por fuera (transferencia, en persona, etc.) y
-- gestiona el estado del pedido desde el panel.
--
-- Reusa public.is_admin() y public.touch_updated_at(), definidos en
-- 20260813031045_init_qcrew_schema.sql.
-- =============================================================

-- =============================================================
-- PRODUCTS
-- =============================================================
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  category    text        not null default '',
  description text        not null default '',
  price       numeric(12,2) not null default 0 check (price >= 0),
  stock       integer     not null default 0 check (stock >= 0),
  image_url   text        not null default '',
  featured    boolean     not null default false,
  status      text        not null default 'active'
                check (status in ('active', 'draft')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Consulta publica: status='active' ordenado por fecha desc
create index if not exists products_public_idx
  on public.products (status, created_at desc);

create index if not exists products_category_idx
  on public.products (category);

alter table public.products enable row level security;

-- Lectura: cualquiera ve los activos, el admin ve todo (incluye borradores)
create policy "lectura de productos"
  on public.products for select
  to anon, authenticated
  using (status = 'active' or (select public.is_admin()));

-- Escritura: solo admin
create policy "admin escribe productos"
  on public.products for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "admin actualiza productos"
  on public.products for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "admin borra productos"
  on public.products for delete
  to authenticated
  using ((select public.is_admin()));

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
  before update on public.products
  for each row execute function public.touch_updated_at();

-- =============================================================
-- QUOTE_REQUESTS (el carrito enviado)
-- =============================================================
create table if not exists public.quote_requests (
  id             uuid primary key default gen_random_uuid(),
  customer_name  text        not null,
  customer_email text        not null,
  customer_phone text        not null default '',
  notes          text        not null default '',
  status         text        not null default 'pending'
                   check (status in ('pending', 'contacted', 'closed')),
  total          numeric(12,2) not null default 0 check (total >= 0),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists quote_requests_admin_idx
  on public.quote_requests (status, created_at desc);

alter table public.quote_requests enable row level security;

-- Cualquiera puede enviar una solicitud, pero SIEMPRE entra como pending.
-- El WITH CHECK impide que el cliente la marque contacted/closed de entrada.
create policy "cualquiera envia una solicitud de cotizacion"
  on public.quote_requests for insert
  to anon, authenticated
  with check (status = 'pending');

-- Solo el admin lee y gestiona la lista de pedidos.
create policy "admin lee solicitudes de cotizacion"
  on public.quote_requests for select
  to authenticated
  using ((select public.is_admin()));

create policy "admin actualiza solicitudes de cotizacion"
  on public.quote_requests for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop trigger if exists quote_requests_touch_updated_at on public.quote_requests;
create trigger quote_requests_touch_updated_at
  before update on public.quote_requests
  for each row execute function public.touch_updated_at();

-- =============================================================
-- QUOTE_ITEMS (lineas del pedido, con nombre y precio congelados)
-- =============================================================
create table if not exists public.quote_items (
  id                   uuid primary key default gen_random_uuid(),
  quote_request_id     uuid not null references public.quote_requests(id) on delete cascade,
  -- on delete set null: si el producto se borra despues, el historico del
  -- pedido sigue siendo legible via los campos _snapshot.
  product_id           uuid references public.products(id) on delete set null,
  product_name_snapshot  text not null,
  unit_price_snapshot    numeric(12,2) not null check (unit_price_snapshot >= 0),
  quantity                integer not null default 1 check (quantity > 0),
  created_at              timestamptz not null default now()
);

create index if not exists quote_items_request_idx
  on public.quote_items (quote_request_id);

alter table public.quote_items enable row level security;

-- El cliente puede agregar lineas, pero solo a una solicitud propia que
-- todavia este 'pending' (recien creada, sin procesar por el admin) — evita
-- que alguien inyecte lineas en pedidos ajenos ya gestionados.
create policy "cualquiera agrega lineas a una solicitud pendiente"
  on public.quote_items for insert
  to anon, authenticated
  with check (
    exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id
        and qr.status = 'pending'
    )
  );

create policy "admin lee lineas de cotizacion"
  on public.quote_items for select
  to authenticated
  using ((select public.is_admin()));

create policy "admin gestiona lineas de cotizacion"
  on public.quote_items for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "admin borra lineas de cotizacion"
  on public.quote_items for delete
  to authenticated
  using ((select public.is_admin()));

-- =============================================================
-- STORAGE: fotos de producto
-- =============================================================
-- A diferencia de testimonios, solo el admin sube fotos de producto desde
-- el panel — el publico nunca escribe en este bucket.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'products',
  'products',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create policy "las fotos de producto son publicas"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'products');

create policy "admin sube fotos de producto"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'products' and (select public.is_admin()));

create policy "admin borra fotos de producto"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'products' and (select public.is_admin()));

-- =============================================================
-- Permisos de tabla explicitos, como en el esquema inicial
-- =============================================================
revoke all on public.products        from public, anon, authenticated;
revoke all on public.quote_requests  from public, anon, authenticated;
revoke all on public.quote_items     from public, anon, authenticated;

grant select                          on public.products       to anon, authenticated;
grant insert, update, delete          on public.products       to authenticated;
grant insert                          on public.quote_requests to anon, authenticated;
grant select, update                  on public.quote_requests to authenticated;
grant insert                          on public.quote_items    to anon, authenticated;
grant select, update, delete          on public.quote_items    to authenticated;
