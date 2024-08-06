import React, { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

export interface MessageProps {
  content: string;
  type: "warn" | "error";
}

export const Message: React.FC<MessageProps> = (props) => {
  const { content, type } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  return visible ? (
    <div className={classnames(styles.msg, styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={styles.dismiss} onClick={() => setVisible(false)}>
        X
      </button>
    </div>
  ) : null;
};
