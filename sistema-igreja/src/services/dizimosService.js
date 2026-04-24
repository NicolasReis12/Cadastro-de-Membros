import { supabase } from '../lib/supabase'

export async function getDizimos() {
  const { data, error } = await supabase
    .from('dizimos')
    .select('*')
    .order('data', { ascending: false })
  return { data, error }
}

export async function createDizimo(dizimo) {
  const { data, error } = await supabase
    .from('dizimos')
    .insert(dizimo)
  return { data, error }
}

export async function deleteDizimo(id) {
  const { data, error } = await supabase
    .from('dizimos')
    .delete()
    .eq('id', id)
  return { data, error }
}