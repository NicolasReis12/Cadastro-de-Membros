import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://scriujeyeovghkrqxfhu.supabase.co'
const supabaseKey = 'sb_publishable_u5XlxPWtc4SAQJtJMk9sVw_MP2iejI1'

export const supabase = createClient(supabaseUrl, supabaseKey)