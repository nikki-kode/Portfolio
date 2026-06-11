import clsx from "clsx";
import styles from "./FileTree.module.css";

type Props = {
  activeKey: string;
  open: Record<string, boolean>;
  openDoc: (key: string) => void;
  toggleFolder: (name: string) => void;
};

type FileEntry = { kind: "file"; key: string; label: string; depth: number; dotColor?: string };
type FolderEntry = { kind: "folder"; name: string; label: string; isOpen: boolean };
type TreeEntry = FileEntry | FolderEntry;

function buildTree(open: Record<string, boolean>): TreeEntry[] {
  const rows: TreeEntry[] = [];

  rows.push({ kind: "file", key: "about.md", label: "about.md", depth: 0 });

  rows.push({ kind: "folder", name: "projects", label: "projects", isOpen: !!open.projects });
  if (open.projects) {
    rows.push({ kind: "file", key: "project-alpha.md", label: "project-alpha.md", depth: 1 });
    rows.push({ kind: "file", key: "project-bravo.md", label: "project-bravo.md", depth: 1 });
    rows.push({ kind: "file", key: "project-charlie.md", label: "project-charlie.md", depth: 1 });
  }

  rows.push({ kind: "folder", name: "ux-research", label: "ux-research", isOpen: !!open["ux-research"] });
  if (open["ux-research"]) {
    rows.push({ kind: "file", key: "capstone.md", label: "capstone.md", depth: 1 });
    rows.push({ kind: "file", key: "ixdf.md", label: "ixdf.md", depth: 1 });
    rows.push({ kind: "file", key: "usability-study.md", label: "usability-study.md", depth: 1 });
  }

  rows.push({ kind: "file", key: "resume.pdf", label: "resume.pdf", depth: 0, dotColor: "#e0655b" });
  rows.push({ kind: "file", key: "contact.md", label: "contact.md", depth: 0 });

  return rows;
}

export default function FileTree({ activeKey, open, openDoc, toggleFolder }: Props) {
  const rows = buildTree(open);

  return (
    <div className={styles.tree}>
      <div className={styles.header}>EXPLORER — NIKKIKODE.DEV</div>

      <div className={styles.rows}>
        {rows.map((entry) => {
          if (entry.kind === "folder") {
            return (
              <div
                key={entry.name}
                className={styles.row}
                onClick={() => toggleFolder(entry.name)}
              >
                <span className={styles.caret}>{entry.isOpen ? "▾" : "▸"}</span>
                <span className={styles.label}>{entry.label}</span>
              </div>
            );
          }

          const active = entry.key === activeKey;
          const dotColor = active ? "var(--accent)" : (entry.dotColor ?? "#555b66");

          return (
            <div
              key={entry.key}
              className={clsx(styles.row, active && styles.rowActive)}
              style={{ paddingLeft: 7 + entry.depth * 16 }}
              onClick={() => openDoc(entry.key)}
            >
              <span className={styles.caret} />
              <span className={styles.fileDot} style={{ background: dotColor }} />
              <span className={styles.label}>{entry.label}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <span className={styles.dot} />
        open to work
      </div>
    </div>
  );
}
