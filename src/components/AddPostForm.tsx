import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

interface IAddPostForm {
  onSubmit: (content: string) => void;
}

const AddPostForm = ({ onSubmit }: IAddPostForm): JSX.Element => {
  const [content, setContent] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />

      <Button
        title="Publicar"
        onPress={() => {
          onSubmit(content);
          setContent("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },

  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
  },
});

export default AddPostForm;
