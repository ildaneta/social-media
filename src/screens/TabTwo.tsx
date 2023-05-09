import { StyleSheet } from "react-native";

import { Button, Text, View } from "../components/Themed";
import { supabase } from "../lib/initSupabase";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text>Nothing</Text>
      <Button title="Cerrar sesión" onPress={() => supabase.auth.signOut()} />
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
