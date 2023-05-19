import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, TextInput, View } from "./Themed";
import { Profile } from "../lib/api";

interface ProfileFormProps {
  profile: Profile | null;
  loading: boolean;
  onSave: (updatedProfile: Profile) => void;
  onLogout: () => void;
}

const ProfileForm = ({
  profile,
  loading,
  onSave,
  onLogout,
}: ProfileFormProps): JSX.Element => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (profile?.username) {
      setUsername(profile.username);
    }
  }, [profile]);

  const handleSubmit = () => {
    if (profile) {
      onSave({ ...profile, username });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.input}>
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.input}>
              <Button
                title="Save changes"
                onPress={handleSubmit}
                disabled={loading || !username}
              />
            </View>
            <View style={styles.input}>
              <Button title="Logout" onPress={onLogout} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 16,
    flex: 1,
  },
  input: {
    paddingVertical: 8,
  },
});

export default ProfileForm;
