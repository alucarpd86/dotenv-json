const path = require("path");
const fs = require("fs");

var opts = {
    path: ".env.json",
    override: false,
    watch: false
};

module.exports = function dotenvJSON(options) {
    opts = Object.assign(opts, options);

    updateConfiguration();

    if (opts.watch) {
        fs.watchFile(path.resolve(process.cwd(), opts.path), {interval: 1000}, (curr, prev) => {
            updateConfiguration();
        });
    }
};

function updateConfiguration() {
    const jsonString = fs.readFileSync(path.resolve(process.cwd(), opts.path), {
        encoding: "utf8"
    });

    const envConfig = JSON.parse(jsonString);

    try {
        for (const key in envConfig) {
            if (opts.override) {
                process.env[key] = envConfig[key];
            } else {
                process.env[key] = process.env[key] || envConfig[key];
            }
        }
    } catch (err) {
        console.error(err);
    }
}