import clsx from "clsx";
import type { View } from "@/hooks/useIDEState";
import styles from "./TabBar.module.css";

type Props = {
  tabs: string[];
  activeKey: string;
  view: View;
  setView: (v: View) => void;
  onTabClick: (key: string) => void;
  onTabClose: (key: string) => void;
};

const VIEWS: { value: View; label: string }[] = [
  { value: "code", label: "</> Source" },
  { value: "split", label: "Split" },
  { value: "preview", label: "Preview" },
];

export default function TabBar({ tabs, activeKey, view, setView, onTabClick, onTabClose }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.tabs}>
        {tabs.map((key) => {
          const active = key === activeKey;
          return (
            <div
              key={key}
              className={clsx(styles.tab, active && styles.tabActive)}
              onClick={() => onTabClick(key)}
            >
              <span className={clsx(styles.tabDot, active && styles.tabDotActive)} />
              {key}
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
    </div>
  );
}
