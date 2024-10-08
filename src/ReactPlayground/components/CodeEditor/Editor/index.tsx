import MonacoEditor, { EditorProps, OnMount } from "@monaco-editor/react";
import { createATA } from "./ata";
import { editor } from "monaco-editor";
import { useContext } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface Props {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props;
  const { files } = useContext(PlaygroundContext);

  const handleEditorMount: OnMount = (editor, monaco) => {
    console.dir(monaco);

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve, // 使用 React JSX 语法
      esModuleInterop: true,
      target: monaco.languages.typescript.ScriptTarget.ESNext, // ECMAScript 目标版本
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(files["main.tsx"].value);
    ata(editor.getValue());
  };

  return (
    <MonacoEditor
      height={"100%"}
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      value={file.value}
      onChange={onChange}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
}
