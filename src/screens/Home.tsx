import { Alert, FlatList, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import AddPostForm from "../components/AddPostForm";
import { getPosts, Posts } from "../lib/api";
import PostCard from "../components/PostCard";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Posts>([]);

  const handleDeletePost = async (postId: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.log(error);
      Alert.alert("Server error to delete", error.message);
    } else {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  const handleSubmit = async (content: string) => {
    const { data, error } = await supabase
      .from("posts")
      .insert({ content })
      .select("*, profile: profiles(username)");
    if (error) {
      console.log(error);
      Alert.alert("Server error", error.message);
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
        renderItem={({ item }) => (
          <PostCard post={item} onDelete={() => handleDeletePost(item.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
