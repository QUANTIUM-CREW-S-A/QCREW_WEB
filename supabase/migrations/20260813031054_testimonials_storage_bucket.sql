-- =============================================================
-- STORAGE: imagenes de testimonios
-- =============================================================
-- Bucket publico: las imagenes se muestran en la web sin autenticacion.
-- El limite de 5MB y los mime types replican la validacion del cliente,
-- para que no se pueda saltar llamando a la API directamente.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'testimonials',
  'testimonials',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create policy "las imagenes de testimonios son publicas"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'testimonials');

-- El formulario de testimonios es publico y no exige sesion, asi que la
-- subida tiene que permitir el rol anon.
create policy "cualquiera puede subir imagen de testimonio"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'testimonials');

create policy "admin borra imagenes de testimonios"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'testimonials' and (select public.is_admin()));
