import test from "node:test";
import assert from "node:assert/strict";
import { applyMovement, classifyStock } from "../src/inventory.js";

test("receipts and issues return new balances in milli-units", () => {
  assert.equal(applyMovement(1250, { type: "receipt", quantityMilli: 500 }), 1750);
  assert.equal(applyMovement(1750, { type: "issue", quantityMilli: 250 }), 1500);
});
test("an issue cannot make stock negative", () => {
  assert.throws(() => applyMovement(200, { type: "issue", quantityMilli: 201 }), /negative/);
});
test("adjustments accept a signed delta", () => {
  assert.equal(applyMovement(1000, { type: "adjustment", deltaMilli: -250 }), 750);
});
test("stock classification covers zero, reorder threshold and available stock", () => {
  assert.equal(classifyStock(0, 300), "out_of_stock");
  assert.equal(classifyStock(300, 300), "low");
  assert.equal(classifyStock(301, 300), "available");
});
