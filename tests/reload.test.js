const assert = require("assert");
const fs = require("fs");
const path = require("path");

const beforeValue = "value2";
const afterValue = "value1";

const dotenvJSON = require("../index");

changeValueTo(beforeValue);

assert.ok(!process.env.hasOwnProperty("sample"));

dotenvJSON({
    watch: true,
    override: true
}); // loads .env.json

assert.ok(process.env.hasOwnProperty("sample"));
assert.equal(process.env.sample, beforeValue);

changeValueTo(afterValue);

setTimeout(() => {
    assert.ok(process.env.hasOwnProperty("sample"));
    assert.equal(process.env.sample, afterValue);

    process.exit(0);
},1000);

function changeValueTo(str) {
    var filepath = path.resolve(process.cwd(), ".env.json");
    var jsonString = fs.readFileSync(filepath, {
        encoding: "utf8"
    });
    jsonString = JSON.parse(jsonString);
    jsonString.sample = str;
    fs.writeFileSync(filepath, JSON.stringify(jsonString), {
        encoding: "utf8"
    });
}