const { override, fixBabelImports, addBabelPlugins } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: "css"
  }),
  addBabelPlugins([
    "@babel/plugin-proposal-decorators",
    {
      legacy: true
    }
  ])
);
