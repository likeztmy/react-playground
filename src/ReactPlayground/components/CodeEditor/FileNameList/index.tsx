import { useContext, useEffect, useRef, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";

import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "../../../files";

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
  const [creating, setCreating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleEditComplete = (oldName: string, newName: string) => {
    if (newName === oldName) return;
    updateFileName(oldName, newName);
    setSelectedFileName(newName);
    setCreating(false);
  };

  const addTab = () => {
    setCreating(true);
    addFile("Comp" + Math.random().toString().slice(2, 8) + ".tsx");
  };

  const handleRemove = (fileName: string) => {
    removeFile(fileName);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  return (
    <div className={styles.tabs} ref={scrollContainerRef}>
      {tabs.map((tab, index, arr) => (
        <FileNameItem
          key={tab + index}
          value={tab}
          actived={selectedFileName === tab}
          readonly={readonlyFileNames.includes(tab)}
          creating={creating && index === arr.length - 1}
          onClick={() => {
            setSelectedFileName(tab);
          }}
          onRemove={() => {
            handleRemove(tab);
          }}
          onEditComplete={(newName) => handleEditComplete(tab, newName)}
        />
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  );
}
