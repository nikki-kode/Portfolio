import clsx from "clsx";
import type { View } from "@/hooks/useIDEState";
import styles from "./TabBar.module.css";

type Props = {
  activeKey: string;
  view: View;
  setView: (v: View) => void;
};

const VIEWS: { value: View; label: string }[] = [
  { value: "code", label: "</> Source" },
  { value: "split", label: "Split" },
  { value: "preview", label: "Preview" },
];

export default function TabBar({ activeKey, view, setView }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.tabs}>
        <div className={styles.tab}>
          <span className={styles.tabDot} />
          {activeKey}
          <span className={styles.tabClose}>×</span>
        </div>
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
