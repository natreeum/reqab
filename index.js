module.exports = function (requirePath) {
  if (typeof requirePath !== "string") {
    throw new Error("requirePath must be a string");
  }

  let config;
  try {
    config = require("./pathconfig");
  } catch (e) {
    throw new Error("pathconfig.js is not found");
  }

  const pathConfig = config.aliases;

  const cwd = process.cwd();
  const parsedPath = requirePath.split("/");
  const alias = parsedPath.find((p) => p.startsWith("@"));

  const isAbsolute = requirePath.startsWith("/");
  // if the path is absolute or does not contain an alias, we require it directly
  if (isAbsolute || !alias) {
    return require(requirePath);
  }

  const aliasPath = pathConfig[alias.replace("@", "")];
  if (aliasPath === undefined) {
    throw new Error(`Alias "${aliasPath}" not found in path configuration`);
  }

  const fullPath = `${cwd}/${aliasPath}/${parsedPath.slice(1).join("/")}`;
  return require(fullPath);
};
