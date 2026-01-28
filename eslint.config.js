import expoConfig from "eslint-config-expo/flat";

export default [
  ...expoConfig,
  {
    ignores: ["web/**", "node_modules/**"],
  },
];
