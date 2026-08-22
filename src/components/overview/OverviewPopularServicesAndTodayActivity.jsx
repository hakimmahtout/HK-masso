import { CalendarCheck, TrendingUp } from "lucide-react";
import React from "react";
import Skeleton from "../ui/Skeleton";
import { EmptyState, ErrorState } from "../dashboard/States";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Badge from "../ui/Badge";

export default function OverviewPopularServicesAndTodayActivity({
  startTimes,
  serviceStats,
  isLoading,
  error,
  refetch,
}) {
  const data = startTimes.map((item) => ({
    // Extract "09:00" from "2026-08-21T09:00:00"
    hour: item._id.slice(11, 16),
    bookings: item.num,
  }));
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {/* POPULAR SERVICES */}

      <section className="surface-card overflow-hidden">
        <div className="border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-muted-foreground h-4 w-4" />

            <div>
              <h2 className="text-base font-semibold">Popular services</h2>

              <p className="text-muted-foreground text-xs">
                Highest-performing services
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <Skeleton key={index} className="h-12 rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState error={error} onRetry={() => refetch()} />
        ) : serviceStats.length === 0 ? (
          <EmptyState
            title="No popular services yet"
            description="Service performance will appear here once bookings are available."
          />
        ) : (
          <div className="divide-y max-h-[320px] overflow-auto">
            {serviceStats.map((item, index) => (
              <div
                key={`${item.service_id}-${index}`}
                className="flex items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{item.service.name}</p>

                    <p className="text-muted-foreground text-xs">
                      Popular service
                    </p>
                  </div>
                </div>

                <Badge variant="outline">{item.num} bookings</Badge>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="surface-card overflow-hidden">
        <div className="border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <CalendarCheck className="text-muted-foreground h-4 w-4" />

            <div>
              <h2 className="text-base font-semibold">
                Today's booking activity
              </h2>

              <p className="text-muted-foreground text-xs">
                See which hours are busiest today
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <Skeleton className="h-[280px] w-full rounded-xl" />
          ) : startTimes.length === 0 ? (
            <EmptyState
              title="No booking activity yet"
              description="Today's booking activity will appear here."
            />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={data}
                margin={{
                  top: 8,
                  right: 8,
                  left: -16,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />

                <XAxis
                  dataKey="hour"
                  tick={{
                    fontSize: 12,
                    fill: "var(--color-muted-foreground)",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 12,
                    fill: "var(--color-muted-foreground)",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.75rem",
                    color: "var(--color-popover-foreground)",
                    fontSize: 12,
                  }}
                />

                <Bar
                  dataKey="bookings"
                  name="Bookings"
                  fill="var(--color-chart-1)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </div>
  );
}
