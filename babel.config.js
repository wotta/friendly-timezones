module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset',
      'babel-preset-expo'
    ],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./"],
          "extensions": [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json"
          ],
          "alias": {
            "@components": "./components",
            "@assets": "./assets",
          }
        }
      ]
    ]
  };
};
