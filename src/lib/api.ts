import { supabase } from "./initSupabase";

export const getPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
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