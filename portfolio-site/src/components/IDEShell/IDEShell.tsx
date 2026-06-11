"use client";

import { useIDEState } from "@/hooks/useIDEState";
import ActivityBar from "@/components/ActivityBar/ActivityBar";
import FileTree from "@/components/FileTree/FileTree";
import styles from "./IDEShell.module.css";

export default function IDEShell() {
  const ide = useIDEState();

  return (
    <div className={styles.root}>
      <ActivityBar />
      <FileTree
        activeKey={ide.state.activeKey}
        open={ide.state.open}
        openDoc={ide.openDoc}
        toggleFolder={ide.toggleFolder}
      />
      <div className={styles.main}>
        <div className={styles.body}>
          {/* TabBar, content, Terminal, StatusBar — coming next */}
        </div>
      </div>
    </div>
  );
}
