import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/Home";
import AuthScreen from "../screens/Auth";
import { RootStackParamList, RootTabParamList } from "../types/route";
import { useUserContext } from "../hooks/userContext";
import Profile from "../screens/Profile";

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...Colors.dark,
  },
};

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...Colors.light,
  },
};

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? darkTheme : lightTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { session } = useUserContext();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={session ? BottomTabNavigator : AuthScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShadowVisible: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          title: "Home",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIcon name="home" color={color} />
            ) : (
              <TabBarIcon name="home-outline" color={color} />
            ),
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIcon name="ios-person" color={color} />
            ) : (
              <TabBarIcon name="md-person-outline" color={color} />
            ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
