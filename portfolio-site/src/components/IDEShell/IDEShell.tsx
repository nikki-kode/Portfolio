"use client";

import { useIDEState } from "@/hooks/useIDEState";
import ActivityBar from "@/components/ActivityBar/ActivityBar";
import styles from "./IDEShell.module.css";

export default function IDEShell() {
  const ide = useIDEState();

  return (
    <div className={styles.root}>
      <ActivityBar />
      <div className={styles.main}>
        <div className={styles.body}>
          {/* FileTree, TabBar, content, Terminal, StatusBar — coming next */}
        </div>
      </div>
    </div>
  );
}
