function assertMilliQuantity(value, label, { allowZero = true } = {}) {
  if (!Number.isSafeInteger(value) || value < (allowZero ? 0 : 1)) {
    throw new TypeError(`${label} must be a safe integer in milli-units`);
  }
}
export function applyMovement(currentMilli, movement) {
  assertMilliQuantity(currentMilli, "currentMilli");
  if (!movement || !["receipt", "issue", "adjustment"].includes(movement.type)) {
    throw new TypeError("unsupported movement type");
  }
  const delta = movement.type === "adjustment" ? movement.deltaMilli : movement.quantityMilli;
  assertMilliQuantity(Math.abs(delta), "movement quantity", { allowZero: false });
  if (movement.type === "adjustment" && !Number.isSafeInteger(delta)) {
    throw new TypeError("adjustment delta must be a safe integer");
  }
  const signedDelta = movement.type === "receipt" ? delta : movement.type === "issue" ? -delta : delta;
  const next = currentMilli + signedDelta;
  if (!Number.isSafeInteger(next) || next < 0) throw new RangeError("movement would make stock negative or overflow");
  return next;
}
export function classifyStock(quantityMilli, reorderPointMilli) {
  assertMilliQuantity(quantityMilli, "quantityMilli");
  assertMilliQuantity(reorderPointMilli, "reorderPointMilli");
  if (quantityMilli === 0) return "out_of_stock";
  if (quantityMilli <= reorderPointMilli) return "low";
  return "available";
}
