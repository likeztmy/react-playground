import { useContext } from "react";
import logoSvg from "./icons/logo.svg";
import styles from "./index.module.scss";
import { PlaygroundContext } from "../../PlaygroundContext";
import {
  DownloadOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined,
} from "@ant-design/icons";
import copy from "copy-to-clipboard";
import message from "antd/es/message";
import { downloadFiles } from "../../utils";
export default function Header() {
  const { files, theme, setTheme } = useContext(PlaygroundContext);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logoSvg} alt="logo" />
        <span>React Playground</span>
      </div>
      <div>
        {theme === "dark" && (
          <MoonOutlined
            title="切换亮色主题"
            className={styles.theme}
            onClick={() => setTheme("light")}
          />
        )}
        {theme === "light" && (
          <SunOutlined
            title="切换暗色主题"
            className={styles.theme}
            onClick={() => setTheme("dark")}
          />
        )}
        <ShareAltOutlined
          style={{ marginLeft: "10px" }}
          onClick={() => {
            copy(window.location.href);
            message.success("分享链接已复制");
          }}
        />
        <DownloadOutlined
          style={{ marginLeft: "10px" }}
          onClick={async () => {
            await downloadFiles(files);
            message.success("下载完成");
          }}
        />
      </div>
    </div>
  );
}
