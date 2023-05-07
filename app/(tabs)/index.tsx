import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../../src/components/Themed";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/initSupabase";

interface IPosts {
  id: string;
  created_at: string;
  content: string;
  image: string;
}

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Array<IPosts>>([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.log("error: ", error);
      } else {
        setPosts(data as Array<IPosts>);
      }
    };

    getPosts();
  }, []);

  return (
    <View style={styles.container}>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
