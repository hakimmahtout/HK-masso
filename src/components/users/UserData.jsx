import React from "react";

export default function UserData({ user }) {
  return (
    <dl className="space-y-3 text-sm">
      {[
        ["Role", user?.role],
        ["Phone", user?.phone],
        ["Gender", user?.gender],
        [
          "Active",
          user?.active === undefined ? undefined : String(user.active),
        ],
        [
          "Created",
          user?.createdAt
            ? new Date(user.createdAt).toLocaleString()
            : undefined,
        ],
        ["ID", user._id],
      ].map(([label, value]) => (
        <div
          key={String(label)}
          className="flex justify-between gap-4 border-b pb-2"
        >
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="truncate font-medium">{value ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
