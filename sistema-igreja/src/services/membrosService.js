import { supabase } from '../lib/supabase'

export async function getMembros() {
  const { data, error } = await supabase
    .from('membros')
    .select('*')
    .order('nome')
  return { data, error }
}

export async function createMembro(membro) {
  const { data, error } = await supabase
    .from('membros')
    .insert(membro)
  return { data, error }
}

export async function updateMembro(id, membro) {
  const { data, error } = await supabase
    .from('membros')
    .update(membro)
    .eq('id', id)
  return { data, error }
}

export async function deleteMembro(id) {
  const { data, error } = await supabase
    .from('membros')
    .delete()
    .eq('id', id)
  return { data, error }
}