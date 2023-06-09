import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Post, getAvatar } from "../lib/api";
import { Card, Text, View, useThemeColor } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useUserContext } from "../hooks/userContext";

interface Props {
  post: Post;
  onDelete: () => void;
}

const PostCard = ({ post, onDelete }: Props): JSX.Element => {
  const [avatarUri, setAvatarUri] = useState("");

  const primary = useThemeColor({}, "primary");
  const { image, content } = post;
  const { profile } = useUserContext();

  if (profile?.avatar_url) {
    getAvatar(profile.avatar_url).then(setAvatarUri);
  }

  return (
    <Card style={styles.container}>
      <Card style={styles.header}>
        <Image
          source={{
            uri: avatarUri
              ? avatarUri
              : "https://github.com/ildaneta/gopizza/assets/21963291/98686857-13b0-4b89-ac64-1e0eac69e03e",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{profile?.username}</Text>
      </Card>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      <Card style={styles.content}>
        <Text style={styles.contentText}>{content}</Text>

        <Card style={styles.footer}>
          <TouchableOpacity>
            <FontAwesome name="heart-o" size={20} color={primary} />
          </TouchableOpacity>

          {profile?.id === post.user_id && (
            <TouchableOpacity onPress={onDelete}>
              <FontAwesome name="trash" size={20} color={primary} />
            </TouchableOpacity>
          )}
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
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PostCard;
