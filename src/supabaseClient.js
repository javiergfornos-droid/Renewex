// src/supabaseClient.js
// Cliente único de Supabase para toda la app.
// Las claves se leen de variables de entorno (Vite -> import.meta.env).
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY

// Si faltan las claves, la app sigue funcionando en "modo demo" (sin backend).
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn('[RENEWEX] Supabase no configurado: faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Modo demo activo.')
}

// Solo creamos el cliente si hay credenciales (evita que createClient lance error).
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// ---- Helpers de autenticación ----

export async function signUp({ email, password, firstName, lastName, institution }) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName, institution },
    },
  })
}

export async function signIn({ email, password }) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getProfile(userId) {
  return supabase.from('profiles').select('*').eq('id', userId).single()
}

// ---- NBOs ----
export async function insertNBO(nbo) {
  return supabase.from('nbos').insert(nbo)
}
export async function getMyNBOs(userId) {
  return supabase.from('nbos').select('*').eq('user_id', userId).order('submitted_at', { ascending: false })
}
export async function getLeaderboard() {
  return supabase.from('bids_leaderboard').select('*')
}

// ---- Compras / recursos ----
export async function insertPurchase(purchase) {
  return supabase.from('purchases').insert(purchase)
}
export async function getMyPurchases(userId) {
  return supabase.from('purchases').select('*').eq('user_id', userId)
}
