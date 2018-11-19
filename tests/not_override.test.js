const assert = require("assert");

const dotenvJSON = require("../index");

var previousValue = "WrongValue";
process.env.sample = previousValue;

assert.ok(process.env.hasOwnProperty("sample"));
assert.equal(process.env.sample, previousValue);

dotenvJSON({
    override: false
}); // loads .env.json

assert.ok(process.env.hasOwnProperty("sample"));
assert.equal(process.env.sample, previousValue);
