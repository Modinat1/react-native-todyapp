// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//       "nativewind/babel",
//     ],
//     plugins: [
//       "react-native-reanimated/plugin",
//       [
//         "module:react-native-dotenv",
//         {
//           moduleName: "@env",
//           path: ".env", // Optional: specify the path to your .env file
//           // Other options like blacklist, whitelist, safe, allowUndefined
//         },
//       ],
//     ],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
