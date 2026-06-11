"use client";

import { useIDEState } from "@/hooks/useIDEState";
import ActivityBar from "@/components/ActivityBar/ActivityBar";
import FileTree from "@/components/FileTree/FileTree";
import TabBar from "@/components/TabBar/TabBar";
import ContentArea from "@/components/views/ContentArea";
import Terminal from "@/components/Terminal/Terminal";
import StatusBar from "@/components/StatusBar/StatusBar";
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
          tabs={ide.state.tabs}
          activeKey={ide.state.activeKey}
          view={ide.state.view}
          setView={ide.setView}
          onTabClick={ide.openDoc}
          onTabClose={ide.closeTab}
        />
        <div className={styles.body}>
          <ContentArea
            activeKey={ide.state.activeKey}
            view={ide.state.view}
            activeSection={ide.state.activeSection}
            setSection={ide.setSection}
            openDoc={ide.openDoc}
          />
        </div>
        {ide.state.termOpen && (
          <Terminal
            lines={ide.state.termLines}
            input={ide.state.termInput}
            onInputChange={ide.setTermInput}
            onKeyDown={ide.onTermKeyDown}
            onClear={ide.clearTerm}
            onCollapse={ide.toggleTerm}
          />
        )}
        <StatusBar
          activeKey={ide.state.activeKey}
          termOpen={ide.state.termOpen}
          toggleTerm={ide.toggleTerm}
        />
      </div>
    </div>
  );
}
