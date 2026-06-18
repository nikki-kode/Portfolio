import clsx from "clsx";
import { GitBranch } from "lucide-react";
import styles from "./StatusBar.module.css";

const FILE_TYPE_LABELS: Record<string, string> = {
  md:   "markdown",
  pdf:  "pdf",
  png:  "png",
  jpg:  "jpg",
  jpeg: "jpg",
  html: "html",
  mp3:  "audio file",
};

function fileTypeLabel(key: string): string {
  if (key === "home") return "welcome";
  if (key.endsWith("/")) return "folder";
  const ext = key.split(".").pop()?.toLowerCase() ?? "";
  return FILE_TYPE_LABELS[ext] ?? ext;
}

type Props = {
  activeKey: string;
  termOpen: boolean;
  toggleTerm: () => void;
};

export default function StatusBar({ activeKey, termOpen, toggleTerm }: Props) {
  return (
    <div className={styles.bar}>
      <span className={styles.branch}>
        <GitBranch size={11} className={styles.branchIcon} />
        main
      </span>
      <span>{activeKey}</span>
      <span>{fileTypeLabel(activeKey)}</span>

      <div className={styles.right}>
        <span
          className={clsx(styles.termToggle, termOpen && styles.termToggleActive)}
          onClick={toggleTerm}
        >
          <span>▸_</span>
          terminal
        </span>
        <span>UTF-8</span>
        <span className={styles.hint}>type &apos;help&apos;</span>
      </div>
    </div>
  );
}
