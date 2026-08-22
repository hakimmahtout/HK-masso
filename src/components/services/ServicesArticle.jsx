import Dialog from "../ui/Dialog";
import ServicesFormHeader from "./ServicesFormHeader";
import ServicesFormBody from "./ServicesFormBody";
import ServiceData from "./ServiceData";
import Skeleton from "../ui/Skeleton";
import { EmptyState, ErrorState } from "../dashboard/States";
import { Eye, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import { priceRange } from "../../utils/pricesHandler";
import { useSearchParams } from "react-router-dom";
import Badge from "../ui/Badge";
import { ConfirmDialog } from "../dashboard/ConfirmDialog";
import { useDeleteService } from "../../features/services/useDeleteService";
import { useState } from "react";

export default function ServicesArticle({
  services,
  error,
  isLoading,
  refetch,
}) {
  const { isDeleting, deleteService } = useDeleteService();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [deleting, setDeleting] = useState(null);

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-64 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="surface-card">
        <EmptyState
          icon={<Sparkles className="h-5 w-5" />}
          title={search ? "No matching services" : "No services yet"}
          description={
            search
              ? "Try another search term."
              : "Create your first service to fill the catalogue."
          }
          action={
            !search ? (
              <>
                <Dialog.Open opens="createService">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> New service
                  </Button>
                </Dialog.Open>
                <Dialog.Overlay name="createService">
                  <Dialog.Window className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    <ServicesFormHeader
                      title="Create service"
                      description="Configure pricing, durations, benefits and visibility."
                    />
                    <Dialog.Body>
                      <ServicesFormBody />
                    </Dialog.Body>
                  </Dialog.Window>
                </Dialog.Overlay>
              </>
            ) : undefined
          }
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="surface-card">
        <ErrorState error={error} onRetry={() => refetch()} />
      </div>
    );
  }
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service._id}
            className="surface-card hover:shadow-lift group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="bg-muted relative h-36 overflow-hidden">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.name ?? "Service image"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="bg-gradient-brand grid h-full w-full place-items-center opacity-80">
                  <Sparkles className="text-primary-foreground h-7 w-7" />
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-1.5">
                {service.isFeatured && (
                  <Badge className="bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
                <Badge
                  variant={service.isActive === false ? "outline" : "secondary"}
                >
                  {service.isActive === false ? "Inactive" : "Active"}
                </Badge>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate text-base font-semibold">
                    {service.name ?? "Untitled"}
                  </h3>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {service.category ?? "—"}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                  {service.description ?? "No description provided."}
                </p>
              </div>

              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                <span className="text-foreground font-semibold">
                  {priceRange(service)}
                </span>
                <span>{service.durations?.length ?? 0} durations</span>
              </div>

              <div className="mt-auto flex gap-1 border-t pt-3">
                <Dialog.Open opens={`viewService-${service._id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-1.5 h-4 w-4" /> View
                  </Button>
                </Dialog.Open>
                <Dialog.Overlay name={`viewService-${service._id}`}>
                  <Dialog.Window className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
                    <ServicesFormHeader
                      title={service?.name ?? "Service"}
                      description={service?.category}
                    />
                    <Dialog.Body>
                      <ServiceData service={service} />
                    </Dialog.Body>
                  </Dialog.Window>
                </Dialog.Overlay>

                <Dialog.Open opens={`editService-${service._id}`}>
                  <Button variant="ghost" size="sm">
                    <Pencil className="mr-1.5 h-4 w-4" /> Edit
                  </Button>
                </Dialog.Open>
                <Dialog.Overlay name={`editService-${service._id}`}>
                  <Dialog.Window className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    <ServicesFormHeader
                      title="Edit service"
                      description="Configure pricing, durations, benefits and visibility."
                    />
                    <Dialog.Body>
                      <ServicesFormBody service={service} />
                    </Dialog.Body>
                  </Dialog.Window>
                </Dialog.Overlay>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive ml-auto"
                  onClick={() => setDeleting(service)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete this service?"
        description={`${deleting?.name ?? "This service"} will be permanently removed from your catalogue.`}
        confirmLabel="Delete service"
        loading={isDeleting}
        onConfirm={() =>
          deleting &&
          deleteService(
            { _id: deleting._id },
            {
              onSuccess: () => {
                setDeleting(null);
              },
            },
          )
        }
      />{" "}
    </>
  );
}
