import ServicesSearch from "./ServicesSearch";
import ServicesArticle from "./ServicesArticle";
import { useServices } from "../../features/services/useServices";

export default function ServicesArticleOperations() {
  const {
    isLoading,
    error,
    services = [],
    totalResults,
    refetch,
  } = useServices();
  return (
    // {(topQuery.data?.length ?? 0) > 0 && (
    //     <section className="surface-card p-5">
    //       <div className="mb-4 flex items-center gap-2">
    //         <Star className="text-accent h-4 w-4" />
    //         <h2 className="text-base font-semibold">Top services</h2>
    //       </div>
    //       <div className="flex flex-wrap gap-2">
    //         {topQuery.data?.map((service) => (
    //           <Badge
    //             key={entityId(service)}
    //             variant="secondary"
    //             className="gap-1.5 py-1.5"
    //           >
    //             {service.name}
    //             <span className="text-muted-foreground">
    //               {service.ratingsAverage?.toFixed?.(1) ?? "—"}
    //             </span>
    //           </Badge>
    //         ))}
    //       </div>
    //     </section>
    //   )}
    <>
      <ServicesSearch totalResults={totalResults} />
      <ServicesArticle
        services={services}
        error={error}
        isLoading={isLoading}
        refetch={refetch}
      />
    </>
  );
}
