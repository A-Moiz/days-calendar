import test from "node:test";
import assert from "node:assert";
import { calculateEventDay } from "./common.mjs";

// Check if the function calculates the 2nd Tuesday of October 2024
test("calculates the second Tuesday of October 2024 (Ada Lovelace Day)", () => {
  const day = calculateEventDay(2024, "October", "Tuesday", "second");
  assert.equal(day, 8);
});

// Check if the function calculates the 2nd Tuesday of October 2020
test("calculates the second Tuesday of October 2020 (Ada Lovelace Day)", () => {
  const day = calculateEventDay(2020, "October", "Tuesday", "second");
  assert.equal(day, 13);
});
