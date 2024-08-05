import { Files } from "./PlaygroundContext";
import main from "./template/main.tsx?raw";
import App from "./template/App.tsx?raw";
import AppCss from "./template/App.css?raw";
import importMap from "./template/import-map.json?raw";
import { fileNameToLanguage } from "./utils";

// app文件名
export const APP_COMPONENT_FILE_NAME = "App.tsx";
// esm 模块映射文件名
export const IMPORT_MAP_FILE_NAME = "import-map.json";
// 入口文件名
export const ENTRY_FILE_NAME = "main.tsx";

export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileNameToLanguage(ENTRY_FILE_NAME),
    value: main,
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileNameToLanguage(APP_COMPONENT_FILE_NAME),
    value: App,
  },
  "App.css": {
    name: "App.css",
    language: "css",
    value: AppCss,
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileNameToLanguage(IMPORT_MAP_FILE_NAME),
    value: importMap,
  },
};
