import ProfileDanger from "../components/profile/ProfileDanger";
import ProfileForm from "../components/profile/ProfileForm";
import ProfileHeader from "../components/profile/ProfileHeader";
import { SEO } from "../components/ui/SEO";

export default function Profile() {
  return (
    <>
      <SEO
        title="Profile Settings | HK Masso Dashboard"
        description="Manage your admin account profile, update credentials, and configure security settings."
      />

      <div className="space-y-6">
        <ProfileHeader />

        <div className="grid gap-6 lg:grid-cols-3">
          <ProfileForm />
          <ProfileDanger />
        </div>
      </div>
    </>
  );
}
