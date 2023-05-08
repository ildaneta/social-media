import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../../src/components/Themed";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/initSupabase";
import AddPostForm from "../../src/components/AddPostForm";
import { Posts, getPosts } from "../../src/lib/api";

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  const handleSubmit = async (content: string) => {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        content,
      })
      .select();

    if (error) {
      throw error;
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
        renderItem={({ item }) => <Text>{item.content}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
