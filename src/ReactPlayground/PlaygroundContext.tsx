import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { comporss, fileNameToLanguage, uncompress } from "./utils";
import { initFiles } from "./files";

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export interface PlaygroundContext {
  files: Files;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export type Theme = "light" | "dark";

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "App.tsx",
} as PlaygroundContext);

const getFilesFromUrl = () => {
  let files: Files | undefined;
  try {
    const hash = uncompress(window.location.hash.slice(1));
    files = JSON.parse(hash);
  } catch (error) {
    console.log(error);
  }
  return files;
};

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles);
  const [selectedFileName, setSelectedFileName] = useState("App.tsx");
  const [theme, setTheme] = useState<Theme>("light");

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileNameToLanguage(name),
      value: "",
    };
    setFiles({ ...files });
  };

  const removeFile = (name: string) => {
    delete files[name];
    setFiles({ ...files });
  };

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || newFieldName == null) return;
    const { [oldFieldName]: value, ...rest } = files;
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileNameToLanguage(newFieldName),
        name: newFieldName,
      },
    };
    setFiles({
      ...rest,
      ...newFile,
    });
  };

  useEffect(() => {
    const hash = comporss(JSON.stringify(files));
    window.location.hash = hash;
  }, []);

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
        theme,
        setTheme,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
