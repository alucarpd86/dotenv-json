const assert = require("assert");

const dotenvJSON = require("../index");

assert.ok(!process.env.hasOwnProperty("complex"));

dotenvJSON(); // loads .env.json

assert.ok(process.env.hasOwnProperty("complex"));
assert.equal(JSON.parse(process.env.complex).number, 42);
