import { Session } from "@supabase/supabase-js";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/initSupabase";
import { Profile } from "../lib/api";
import { Alert } from "react-native";

export interface IUserInfo {
  session: Session | null;
  profile: Profile | null;
  loading?: boolean;
  saveProfileUpdate?: (updatedProfile: Profile) => void;
}

const UserContext = createContext<IUserInfo>({
  session: null,
  profile: null,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    session: null,
    profile: null,
  });

  const getProfile = async () => {
    if (!userInfo.session) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userInfo.session.user.id);

    if (error) {
      console.log("error: ", error);
    }

    if (data) {
      setUserInfo({ ...userInfo, profile: data[0] });
    }
  };

  const saveProfileUpdate = async (updateProfile: Profile) => {
    setLoading(true);

    // update a data into supabase table
    const { error, data } = await supabase
      .from("profiles")
      .update(updateProfile)
      .eq("id", userInfo.profile?.id);

    if (error) {
      Alert.alert("Server error updating data", error.message);
    } else {
      Alert.alert("Username update with success!");

      getProfile();
    }
    setLoading(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
      } else {
        setUserInfo({ ...userInfo, session });
      }
    };

    getUserInfo();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfo({ session, profile: null });
    });
  }, []);

  useEffect(() => {
    getProfile();
  }, [userInfo.session]);

  return (
    <UserContext.Provider value={{ ...userInfo, loading, saveProfileUpdate }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};

export { AuthProvider, useUserContext };
