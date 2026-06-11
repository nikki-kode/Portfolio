import { Files, Search, GitBranch, Settings } from "lucide-react";
import styles from "./ActivityBar.module.css";
import clsx from "clsx";

const tiles = [
  { icon: Files, label: "Explorer", active: true },
  { icon: Search, label: "Search", active: false },
  { icon: GitBranch, label: "Source Control", active: false },
];

export default function ActivityBar() {
  return (
    <div className={styles.bar}>
      {tiles.map(({ icon: Icon, label, active }) => (
        <div
          key={label}
          className={clsx(styles.tile, active && styles.tileActive)}
          title={label}
        >
          <Icon size={18} strokeWidth={1.75} />
        </div>
      ))}
      <div className={clsx(styles.tile, styles.bottom)} title="Settings">
        <Settings size={18} strokeWidth={1.75} />
      </div>
    </div>
  );
}
