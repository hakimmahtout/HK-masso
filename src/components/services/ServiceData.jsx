import React from "react";
import { pricesToMap } from "../../utils/pricesHandler";

export default function ServiceData({ service }) {
  return (
    <div className="space-y-4 text-sm">
      <p className="text-muted-foreground">{service?.description ?? "—"}</p>
      {service?.benefits?.length ? (
        <div>
          <p className="mb-1.5 font-medium">Benefits</p>
          <ul className="text-muted-foreground list-disc space-y-1 pl-5">
            {service.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(service ? pricesToMap(service) : {}).map(
          ([duration, price]) => (
            <div key={duration} className="rounded-lg border p-2.5">
              <p className="text-muted-foreground text-xs">{duration} min</p>
              <p className="font-semibold">{price}$</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
