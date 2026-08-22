export function statusTone(status) {
  switch (status) {
    case "confirmed":
      return "bg-info/15 text-info border-info/25";

    case "completed":
      return "bg-success/15 text-success border-success/25";

    case "cancelled":
      return "bg-destructive/12 text-destructive border-destructive/25";

    default:
      return "bg-warning/20 text-warning-foreground border-warning/30";
  }
}

export function displayName(value, fallback = "—") {
  if (!value) return fallback;

  if (typeof value === "string") {
    return value;
  }

  const record = value;

  return record["name"] ?? record["email"] ?? fallback;
}

export function getBookingPrice(booking) {
  const value = booking.price;

  return typeof value === "number" ? value : 0;
}

export function getWorkerName(booking) {
  const worker = booking.worker.name;

  return displayName(worker);
}

export function formatHours(hours) {
  if (!Number.isFinite(hours)) return "0h";

  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (minutes === 0) {
    return `${wholeHours}h`;
  }

  return `${wholeHours}h ${minutes}m`;
}

export function formatCurrency(value) {
  return `${value.toFixed(2)}$`;
}

export function formatBookingTime(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
