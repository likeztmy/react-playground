import { useContext } from "react";
import logoSvg from "./icons/logo.svg";
import styles from "./index.module.scss";
import { PlaygroundContext } from "../../PlaygroundContext";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext);

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
      </div>
    </div>
  );
}
