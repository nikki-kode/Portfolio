"use client";

import { useRef, useLayoutEffect } from "react";
import clsx from "clsx";
import type { View } from "@/hooks/useIDEState";
import { fileColor } from "@/lib/fileColor";
import styles from "./TabBar.module.css";

type Props = {
  tabs: string[];
  activeKey: string;
  view: View;
  setView: (v: View) => void;
  onTabClick: (key: string) => void;
  onTabClose: (key: string) => void;
  openDoc: (key: string) => void;
};

const VIEWS: { value: View; label: string }[] = [
  { value: "code", label: "</> Source" },
  { value: "split", label: "Split" },
  { value: "preview", label: "Preview" },
];

function tabLabel(key: string): string {
  if (key === "home") return "⌂  home";
  return key;
}

export default function TabBar({ tabs, activeKey, view, setView, onTabClick, onTabClose, openDoc }: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = tabsRef.current;
    if (!el || tabs.length <= 1) return;
    if (el.scrollWidth > el.clientWidth) {
      onTabClose(tabs[0]);
    }
  }, [tabs, onTabClose]);

  return (
    <div className={styles.bar}>
      <div ref={tabsRef} className={styles.tabs}>
        {tabs.map((key) => {
          const active = key === activeKey;
          const color = active ? fileColor(key) : undefined;
          return (
            <div
              key={key}
              className={clsx(styles.tab, active && styles.tabActive)}
              style={active ? { borderTopColor: color } : undefined}
              onClick={() => onTabClick(key)}
            >
              {key !== "home" && (
                <span
                  className={clsx(styles.tabDot, active && styles.tabDotActive)}
                  style={active ? { background: color } : undefined}
                />
              )}
              {tabLabel(key)}
              <span
                className={styles.tabClose}
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(key);
                }}
              >
                ×
              </span>
            </div>
          );
        })}
      </div>

      {activeKey === "home" ? (
        <div className={styles.quickLinks}>
          <span className={styles.quickLink} onClick={() => openDoc("about.md")}>about.md</span>
          <span className={styles.quickSep}>·</span>
          <span className={styles.quickLink} onClick={() => openDoc("projects/")}>projects</span>
          <span className={styles.quickSep}>·</span>
          <span className={styles.quickLink} onClick={() => openDoc("contact.md")}>contact.md</span>
        </div>
      ) : (
        <div className={styles.toggleWrap}>
          <div className={styles.toggle}>
            {VIEWS.map(({ value, label }) => (
              <button
                key={value}
                className={clsx(styles.toggleBtn, view === value && styles.toggleBtnActive)}
                onClick={() => setView(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
