-- Correction de la politique d'upload pour Supabase Storage
-- À exécuter dans Supabase SQL Editor

-- Supprimer l'ancienne politique d'upload
DROP POLICY IF EXISTS "Les utilisateurs peuvent uploader leur avatar" ON storage.objects;

-- Recréer la politique d'upload avec la bonne syntaxe
CREATE POLICY "Les utilisateurs peuvent uploader leur avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
  AND (storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'gif')
);

-- Vérifier que la politique a été créée correctement
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Les utilisateurs peuvent uploader leur avatar'; 