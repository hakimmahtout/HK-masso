import Dialog from "../components/ui/Dialog";
import { SEO } from "../components/ui/SEO";
import UserHeader from "../components/users/UserHeader";
import UserTableAndOperations from "../components/users/UserTableAndOperations";

export default function Users() {
  return (
    <>
      <SEO
        title="Users | HK Masso Dashboard"
        description="Manage therapist accounts, administrative staff roles, and system permissions on the HK Masso dashboard."
      />

      <div className="space-y-6">
        <Dialog>
          <UserHeader />

          <UserTableAndOperations />
        </Dialog>
      </div>
    </>
  );
}
