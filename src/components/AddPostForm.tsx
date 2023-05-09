import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  View,
  Button,
  TextInput,
  useThemeColor,
  Card,
} from "../components/Themed";
import { Feather } from "@expo/vector-icons";
interface IAddPostForm {
  onSubmit: (content: string) => void;
}

const AddPostForm = ({ onSubmit }: IAddPostForm): JSX.Element => {
  const [content, setContent] = useState("");
  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "card");
  const placeholderColor = useThemeColor(
    { light: "#6b7280", dark: "#9ca3af" },
    "text"
  );
  const primary = useThemeColor({}, "primary");

  return (
    <Card style={styles.container}>
      <TextInput
        value={content}
        onChangeText={setContent}
        style={[styles.input, { color, backgroundColor }]}
        placeholderTextColor={placeholderColor}
        placeholder="Vamos compartilhar"
      />
      <Card style={styles.row}>
        <TouchableOpacity>
          <Feather name="image" size={24} color={primary} />
        </TouchableOpacity>

        <Button
          title="Publicar"
          onPress={() => {
            onSubmit(content);
            setContent("");
          }}
        />
      </Card>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },

  input: {
    padding: 8,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AddPostForm;
