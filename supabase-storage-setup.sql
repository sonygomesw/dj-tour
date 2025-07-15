-- Configuration Supabase Storage pour DJ Tour
-- À exécuter dans Supabase SQL Editor

-- Créer le bucket 'avatars' s'il n'existe pas
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Créer la politique pour permettre l'upload d'avatars
CREATE POLICY "Les utilisateurs peuvent uploader leur avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND (storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'gif')
);

-- Créer la politique pour permettre la lecture des avatars
CREATE POLICY "Les avatars sont visibles publiquement" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- Créer la politique pour permettre la mise à jour des avatars
CREATE POLICY "Les utilisateurs peuvent modifier leur avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
) WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND (storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'gif')
);

-- Créer la politique pour permettre la suppression des avatars
CREATE POLICY "Les utilisateurs peuvent supprimer leur avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
); 