import { Database } from "../types/supabase";
import { supabase } from "./initSupabase";

export const getPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profile: profiles(username)")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return []
  } else {
    return data
  }
}

export type Posts = Awaited<ReturnType<typeof getPosts>>
export type Post = Posts[number]
export type Profile = Database['public']['Tables']['profiles']['Row']