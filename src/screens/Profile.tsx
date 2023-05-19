import { supabase } from "../lib/initSupabase";
import { useUserContext } from "../hooks/userContext";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  const { profile } = useUserContext();
  return (
    <ProfileForm
      profile={profile}
      loading={false}
      onSave={() => {}}
      onLogout={() => supabase.auth.signOut()}
    />
  );
};

export default Profile;
