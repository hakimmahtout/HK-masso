import ServicesArticleOperations from "../components/services/ServicesArticleOperations";
import ServicesHeader from "../components/services/ServicesHeader";
import Dialog from "../components/ui/Dialog";
import { SEO } from "../components/ui/SEO";

export default function Services() {
  return (
    <>
      <SEO
        title="Services | HK Masso Dashboard"
        description="Manage massotherapy service offerings, pricing, durations, and categories on the HK Masso admin dashboard."
      />

      <div className="space-y-6">
        <Dialog>
          <ServicesHeader />
          <ServicesArticleOperations />
        </Dialog>
      </div>
    </>
  );
}
