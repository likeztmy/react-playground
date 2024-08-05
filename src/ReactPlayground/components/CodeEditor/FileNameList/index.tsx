import React, { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";

export default function FileNameList() {
  const {
    files,
    addFile,
    removeFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <FileNameItem
          key={tab + index}
          value={tab}
          actived={selectedFileName === tab}
          onClick={() => {
            setSelectedFileName(tab);
          }}
        />
      ))}
    </div>
  );
}
