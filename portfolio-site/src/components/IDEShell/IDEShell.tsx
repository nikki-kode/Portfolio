"use client";

import { useIDEState } from "@/hooks/useIDEState";
import ActivityBar from "@/components/ActivityBar/ActivityBar";
import FileTree from "@/components/FileTree/FileTree";
import TabBar from "@/components/TabBar/TabBar";
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
        <TabBar
          activeKey={ide.state.activeKey}
          view={ide.state.view}
          setView={ide.setView}
        />
        <div className={styles.body}>
          {/* content, Terminal, StatusBar — coming next */}
        </div>
      </div>
    </div>
  );
}
