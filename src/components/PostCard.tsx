import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Post } from "../lib/api";
import { Card, Text, View, useThemeColor } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props): JSX.Element => {
  const primary = useThemeColor({}, "primary");

  return (
    <Card style={styles.container}>
      <Card style={styles.header}>
        <Image
          source={{ uri: "https://github.com/ildaneta.png" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Ilda Neta</Text>
      </Card>

      {post.image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: post.image }} style={styles.image} />
        </View>
      )}

      <Card style={styles.content}>
        <Text style={styles.contentText}>{post.content}</Text>

        <Card style={styles.footer}>
          <TouchableOpacity>
            <FontAwesome name="heart-o" size={24} color={primary} />
          </TouchableOpacity>
        </Card>
      </Card>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 16,
  },

  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 8,
  },

  username: {
    fontWeight: "bold",
  },

  imageContainer: {
    width: "100%",
    height: 300,
    marginTop: 8,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  content: {
    padding: 16,
  },

  contentText: {
    fontSize: 16,
  },

  footer: {
    paddingTop: 8,
  },
});

export default PostCard;
