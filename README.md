# dotenv-json

> Load environment variables via a JSON file

```bash
npm install @alucarpd86/dotenv-json
```

Define your environment variables in `.env.json` in the root of your project (or wherever you start your node process):

```json
{
  "sample_key": "sample_value"
}
```

Load your environment variables at the beginning of your program:

```js
require("dotenv-json")();

console.log(process.env.sample_key) // => sample_value
```

_N.B. Existing keys in `process.env` will **not** be overwritten._

You can customize the location of your `.env.json` file by passing a `path` option:

```js
const dotenvJSON = require("dotenv-json");
dotenvJSON({ path: "./config/example.json"});
```

You can override existing options by passing a ovverride option:

```js
const dotenvJSON = require("dotenv-json");
dotenvJSON({ override: true});
```

You can monitor the file changes and reload the environment variables by passing watch option:

```js
const dotenvJSON = require("dotenv-json");
dotenvJSON({ watch: true});
```