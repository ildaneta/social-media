import { supabase } from "../lib/initSupabase";
import { useUserContext } from "../hooks/userContext";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  const { profile, loading, saveProfileUpdate } = useUserContext();

  return (
    <ProfileForm
      profile={profile}
      loading={loading!}
      onSave={saveProfileUpdate}
      onLogout={() => supabase.auth.signOut()}
    />
  );
};

export default Profile;
