# reqab

custom-require

A utility function to support @alias-based module resolution in Node.js using a custom pathconfig.js.

## 📦 Overview

This module allows you to use custom path aliases (e.g. @utils/logger) instead of relative paths in your Node.js project.
It resolves the alias based on a user-defined pathconfig.js file located in the root directory.

In contrast to the require() function, autocomplete is not supported at the editor level.

## 📁 File Structure Example

```
project-root/
├── pathconfig.js
├── src/
│   └── utils/
│     └── logger.js
├── index.js
└── ...
```

pathconfig.js

```
module.exports = {
  aliases: {
    utils: "src/utils",
  },
};
```

## 🧪 Example

```js
// src/utils/logger.js
module.exports = (msg) => console.log("[LOG]", msg);
```

```js
// service.js
const logger = reqab("@utils/logger");
module.exports = () => {
  logger("This works!");
};

// index.js
global.reqab = require("reqab");
const main = require("./service.js"); // reqab doesn't support relative import
main();
```

or

```js
// index.js
const reqab = require("./customRequire");
const logger = reqab("@utils/logger");

logger("This works!");
```

```js
// You can import npm module with reqab

const axios = reqab("axios");
axios.get("https://www.npmjs.com/package/reqab").then((res) => {
  console.log(res.status);
});
```

## ⚙️ How It Works

    •	If the path starts with / or does not include an alias like @, it behaves like a normal require().
    •	If the path contains an alias (e.g. @utils/logger), it:
    1.	Looks up the alias in pathconfig.js.
    2.	Resolves the full path based on the current working directory.
    3.	Requires the actual file at the resolved path.

## ❗ Error Handling

    •	Throws if pathconfig.js is not found.
    •	Throws if the provided path is not a string.
    •	Throws if an alias is used but not found in pathconfig.js.
