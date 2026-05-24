// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseService = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ── Browser client (use in components) ────────────────────────
export const supabase = createClient(supabaseUrl, supabaseAnon);

// ── Server client (use in API routes — has full access) ────────
export const supabaseAdmin = createClient(supabaseUrl, supabaseService);

// ── Storage helpers ────────────────────────────────────────────
export const BUCKETS = {
  diary: "diary-files",
};

/**
 * Upload a file to Supabase Storage
 * @param {File} file
 * @param {string} userId
 * @param {string} bucket
 * @returns {Promise<{url: string, path: string}>}
 */
export async function uploadFile(file, userId, bucket = BUCKETS.diary) {
  const ext      = file.name.split(".").pop();
  const path     = `${userId}/${Date.now()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, { upsert: false });

  if (error) throw error;

  const { data } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(path);

  return { url: data.publicUrl, path };
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(path, bucket = BUCKETS.diary) {
  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .remove([path]);
  if (error) throw error;
}