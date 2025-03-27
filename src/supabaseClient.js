import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://ojzwklhfhcgcobhoqiqe.supabase.co'; // Sua URL do Supabase
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Sua chave pública (ou privada, dependendo do caso)
const supabase = createClient(supabaseUrl, supabaseKey);
