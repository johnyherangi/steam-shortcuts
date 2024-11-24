import eslintConfigPrettier from "eslint-config-prettier";

export default [
  eslintConfigPrettier,
  {
    ignores: ["**/coverage/", "**/dist/", "**/gen/", "**/target/"]
  }
];