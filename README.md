# reqab

custom-require

A utility function to support @alias-based module resolution in Node.js using a custom pathconfig.js.

## 📦 Overview

This module allows you to use custom path aliases (e.g. @utils/logger) instead of relative paths in your Node.js project.
It resolves the alias based on a user-defined pathconfig.js file located in the root directory.

## 📁 File Structure Example

```
project-root/
├── pathconfig.js
├── utils/
│   └── logger.js
├── index.js
└── ...
```

pathconfig.js

```
module.exports = {
  aliases: {
    utils: "utils",
    components: "src/components",
    // Add more as needed
  },
};
```

**🚀 Usage**

```js
const customRequire = require("./customRequire");

const logger = customRequire("@utils/logger");
logger.log("Hello!");
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

## 🧪 Example

```js
// utils/logger.js
module.exports = {
  log: (msg) => console.log("[LOG]", msg),
};
```

```js
// index.js
const requireWithAlias = require("./customRequire");
const logger = requireWithAlias("@utils/logger");

logger.log("This works!");
```
