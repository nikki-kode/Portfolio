"use client";

import { useRef, useLayoutEffect, useState } from "react";
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
  reorderTabs: (from: number, to: number) => void;
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

// Returns the insert-before index (0..tabs.length) based on cursor midpoint.
function insertIdx(e: React.DragEvent<HTMLDivElement>, i: number): number {
  const rect = e.currentTarget.getBoundingClientRect();
  return e.clientX > rect.left + rect.width / 2 ? i + 1 : i;
}

export default function TabBar({ tabs, activeKey, view, setView, onTabClick, onTabClose, openDoc, reorderTabs }: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const dragIdx = useRef<number | null>(null);
  // insertAt is the gap index (0..tabs.length) where the drop line appears
  const [insertAt, setInsertAt] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = tabsRef.current;
    if (!el || tabs.length <= 1) return;
    if (el.scrollWidth > el.clientWidth) {
      onTabClose(tabs[0]);
    }
  }, [tabs, onTabClose]);

  function handleDrop(e: React.DragEvent<HTMLDivElement>, i: number) {
    e.preventDefault();
    const from = dragIdx.current;
    if (from === null) return;
    let to = insertIdx(e, i);
    // Adjust for the element being removed before the insertion point
    if (from < to) to--;
    if (from !== to) reorderTabs(from, to);
    dragIdx.current = null;
    setInsertAt(null);
  }

  return (
    <div className={styles.bar}>
      <div ref={tabsRef} className={styles.tabs}>
        {tabs.map((key, i) => {
          const active = key === activeKey;
          const color = active ? fileColor(key) : undefined;
          return (
            <div
              key={key}
              className={clsx(
                styles.tab,
                active && styles.tabActive,
                insertAt === i && styles.tabDropBefore,
                insertAt === i + 1 && styles.tabDropAfter,
              )}
              style={active ? { borderTopColor: color } : undefined}
              onClick={() => onTabClick(key)}
              draggable
              onDragStart={(e) => {
                dragIdx.current = i;
                e.dataTransfer.effectAllowed = "move";
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                setInsertAt(insertIdx(e, i));
              }}
              onDragLeave={() => setInsertAt(null)}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={() => { dragIdx.current = null; setInsertAt(null); }}
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
