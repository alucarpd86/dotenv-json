const path = require("path");
const fs = require("fs");
const fileWatcher = require('chokidar');

var opts = {
    path: ".env.json",
    override: false,
    watch: false
};

module.exports = function dotenvJSON(options) {
    opts = Object.assign(opts, options);

    updateConfiguration();

    if (opts.watch) {
        fileWatcher.watch(path.resolve(process.cwd(), opts.path), {
            cwd: __dirname,
            awaitWriteFinish: true,
            depth: 1
        }).on('all', (event, path) => {
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
            if (typeof envConfig[key] === "object") {
                envConfig[key] = JSON.stringify(envConfig[key]);
            }
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