import { FlatList, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import AddPostForm from "../components/AddPostForm";
import { getPosts, Posts } from "../lib/api";
import PostCard from "../components/PostCard";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  const handleSubmit = async (content: string) => {
    const { data, error } = await supabase
      .from("posts")
      .insert({ content })
      .select();
    if (error) {
      console.log(error);
    } else {
      setPosts([data[0], ...posts]);
    }
  };

  return (
    <View style={styles.container}>
      <AddPostForm onSubmit={handleSubmit} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
