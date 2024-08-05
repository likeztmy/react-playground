import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import classnames from "classnames";
import { Popconfirm } from "antd";

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  creating: boolean;
  readonly: boolean;
  onClick: () => void;
  onRemove: () => void;
  onEditComplete: (value: string) => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    value,
    actived,
    creating,
    readonly,
    onClick,
    onRemove,
    onEditComplete,
  } = props;

  const [name, setName] = useState(value);
  const [isEdit, setIsEdit] = useState(creating);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setIsEdit(false);
    onEditComplete(name);
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [creating]);

  return (
    <div
      className={classnames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {isEdit ? (
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleBlur}
          className={styles["tab-item-input"]}
        />
      ) : (
        <>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly && (
            <Popconfirm
              title="确认删除该文件吗？"
              onConfirm={(e) => {
                e?.stopPropagation();
                onRemove();
              }}
              okText="确认"
              cancelText="取消"
              overlayClassName="custom-popconfirm"
            >
              <span style={{ marginLeft: 5, display: "flex" }}>
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </Popconfirm>
          )}
        </>
      )}
    </div>
  );
};
