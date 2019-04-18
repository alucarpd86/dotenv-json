const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const filepath = __dirname + "/.env.json";

describe('load properties', () => {

    const dotenvJSON = require("../index");

    afterEach(() => {
        resetProcessEnv();
    });

    after(() => {
        setTimeout(function() {
            process.exit(0);
        },100);
    });

    it('load simple variables from json', () => {
        expect(process.env.sample).to.be.undefined;
        dotenvJSON({
            path: filepath
        });
        expect(process.env.sample).to.be.equal('value1');
    });

    it('load objects from json', () => {
        expect(process.env.complex).to.be.undefined;
        dotenvJSON({
            path: filepath
        });
        expect(JSON.parse(process.env.complex)).to.be.deep.equal({
            "string": "Hello",
            "number": 42,
            "list": [
                "one",
                "two",
                "three"
            ]
        });
    });

    it('not override flag', () => {
        var value = "ShouldNotBeChanged";
        process.env.sample2 = value;
        expect(process.env.sample2).to.be.equal(value);
        dotenvJSON({
            path: filepath
        });
        expect(process.env.sample2).to.be.equal(value);
        dotenvJSON({
            path: filepath,
            override: true
        });
        expect(process.env.sample2).to.not.be.equal(value);
    });

    it('watch file change', (done) => {
        var newValue = 'valueChanged';
        var oldValue = 'value1';
        dotenvJSON({
            path: filepath,
            watch: true
        });
        expect(process.env.sample).to.be.equal('value1');
        changeValueTo(newValue);
        setTimeout(function() {
            expect(process.env.sample).to.be.equal(newValue);
            changeValueTo(oldValue);
            done();
        },100);
    });
});

function resetProcessEnv() {
    const jsonString = fs.readFileSync(path.resolve(process.cwd(), filepath), {
        encoding: "utf8"
    });
    const envConfig = JSON.parse(jsonString);
    for (const key in envConfig) {
        delete process.env[key];
    }
}

function changeValueTo(str) {
    var f = path.resolve(process.cwd(), filepath);
    var jsonString = fs.readFileSync(f, {
        encoding: "utf8"
    });
    jsonString = JSON.parse(jsonString);
    jsonString.sample = str;
    fs.writeFileSync(f, JSON.stringify(jsonString, null, 2), {
        encoding: "utf8"
    });
}