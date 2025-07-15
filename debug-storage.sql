-- Script de diagnostic pour Supabase Storage
-- À exécuter dans Supabase SQL Editor pour vérifier la configuration

-- Vérifier si le bucket existe
SELECT * FROM storage.buckets WHERE id = 'avatars';

-- Vérifier les politiques sur storage.objects
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

-- Vérifier les permissions RLS
SELECT * FROM storage.objects WHERE bucket_id = 'avatars' LIMIT 5; 