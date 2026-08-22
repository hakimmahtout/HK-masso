export function pricesToMap(service) {
  const result = {};
  const prices = service.prices;

  if (!prices) return result;

  for (const [key, value] of Object.entries(prices)) {
    const duration = key.replace("d", "");
    result[duration] = String(value);
  }

  return result;
}

export function priceRange(service) {
  const values = Object.values(pricesToMap(service))
    .map(Number)
    .filter(Number.isFinite);

  if (!values.length) return "—";

  const min = Math.min(...values);
  const max = Math.max(...values);

  return min === max ? `${min}` : `${min} – ${max}`;
}
