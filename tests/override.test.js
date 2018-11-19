const assert = require("assert");

const dotenvJSON = require("../index");

var wrongValue = "WrongValue";
process.env.sample = wrongValue;

assert.ok(process.env.hasOwnProperty("sample"));
assert.equal(process.env.sample, wrongValue);

dotenvJSON({
    override: true
}); // loads .env.json

assert.ok(process.env.hasOwnProperty("sample"));
assert.notEqual(process.env.sample, wrongValue);
assert.equal(process.env.sample, "value1");
