const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get Expo's default Metro configuration
const config = getDefaultConfig(__dirname);

// Add support for importing SVG as a React component
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

// Add Victory Native specific configuration
config.resolver.sourceExts.push("cjs");
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

// Ensure Victory Native modules are not excluded
config.resolver.blacklistRE = undefined;

// Apply NativeWind configuration
module.exports = withNativeWind(config, { input: "./global.css" });
