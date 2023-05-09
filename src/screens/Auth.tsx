import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { supabase } from "../lib/initSupabase";
import { Alert } from "react-native";

const Auth = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (credentials: SignUpWithPasswordCredentials) => {
    if (!("email" in credentials)) return;

    setLoading(true);

    const { email, password, options } = credentials;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (error) Alert.alert(error.message);

    setLoading(false);
  };

  const handleSignIn = async (credentials: SignInWithPasswordCredentials) => {
    if (!("email" in credentials)) return;

    setLoading(true);

    const { email, password } = credentials;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);

    setLoading(false);
  };

  return (
    <AuthForm
      onLogin={handleSignIn}
      onSignUp={handleSignUp}
      loading={loading}
    />
  );
};

export default Auth;
