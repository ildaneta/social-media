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
};

export const getAvatar = async (path: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);

    if (error) throw error;

    const fr = new FileReader();

    fr.readAsDataURL(data);

    return new Promise((resolve) => {
      fr.onload = () => {
        resolve(fr.result as string);
      };
    });
  } catch (error) {
    console.log('Error getting avatar: ', error);
    return '';
  }
}

export type Posts = Awaited<ReturnType<typeof getPosts>>
export type Post = Posts[number]
export type Profile = Database['public']['Tables']['profiles']['Row']