import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './contants';
import 'react-native-url-polyfill/auto'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);