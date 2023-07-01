export function formatAmount(amount) {
  return new Intl.NumberFormat("es-AR", {
    style: "decimal",
  }).format(amount);
}
