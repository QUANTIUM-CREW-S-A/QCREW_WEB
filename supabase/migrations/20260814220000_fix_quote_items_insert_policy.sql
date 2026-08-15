-- =============================================================
-- FIX: la policy de insert de quote_items no podia evaluarse
-- =============================================================
-- La policy original hacia `exists (select 1 from quote_requests ...)`
-- directo en el WITH CHECK. Esa subquery corre con los privilegios del rol
-- que dispara la policy (anon/authenticated), y anon nunca tuvo GRANT
-- SELECT sobre quote_requests (a proposito: una solicitud pendiente solo la
-- lee el admin). Sin el grant de tabla, ni siquiera se llega a evaluar
-- RLS — Postgres corta antes con "permission denied for table
-- quote_requests", aunque la logica de la policy fuera correcta.
--
-- Fix: una funcion SECURITY DEFINER corre con los privilegios de quien la
-- crea (bypasea el GRANT/RLS del rol llamante para esa consulta puntual),
-- el mismo patron que evita reimplementar is_admin() en cada policy.
-- =============================================================

create or replace function public.quote_request_accepts_items(request_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.quote_requests
    where id = request_id
      and status = 'pending'
  );
$$;

revoke execute on function public.quote_request_accepts_items(uuid) from public;
grant execute on function public.quote_request_accepts_items(uuid) to anon, authenticated;

drop policy if exists "cualquiera agrega lineas a una solicitud pendiente" on public.quote_items;

create policy "cualquiera agrega lineas a una solicitud pendiente"
  on public.quote_items for insert
  to anon, authenticated
  with check (public.quote_request_accepts_items(quote_request_id));
