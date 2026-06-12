import clsx from "clsx";
import { fileColor } from "@/lib/fileColor";
import styles from "./FileTree.module.css";

const FOLDER_ACCENT: Record<string, string> = {
  "projects/": "var(--accent)",
  "music/":    "#cba6f7",
};

type Props = {
  activeKey: string;
  open: Record<string, boolean>;
  openDoc: (key: string) => void;
  toggleFolder: (name: string) => void;
};

type FileEntry = { kind: "file"; key: string; label: string; depth: number; dotColor?: string };
type FolderEntry = { kind: "folder"; name: string; label: string; isOpen: boolean; indexKey?: string };
type TreeEntry = FileEntry | FolderEntry;

function buildTree(open: Record<string, boolean>): TreeEntry[] {
  const rows: TreeEntry[] = [];

  rows.push({ kind: "file", key: "about.md", label: "about.md", depth: 0 });

  rows.push({ kind: "folder", name: "projects", label: "projects", isOpen: !!open.projects, indexKey: "projects/" });
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

  rows.push({ kind: "folder", name: "music", label: "music", isOpen: !!open.music, indexKey: "music/" });
  if (open.music) {
    rows.push({ kind: "file", key: "nocturne-in-blue.mp3", label: "nocturne-in-blue.mp3", depth: 1, dotColor: "#cba6f7" });
    rows.push({ kind: "file", key: "tidewater.mp3", label: "tidewater.mp3", depth: 1, dotColor: "#cba6f7" });
    rows.push({ kind: "file", key: "signal-lost.mp3", label: "signal-lost.mp3", depth: 1, dotColor: "#cba6f7" });
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
            const indexActive = !!entry.indexKey && activeKey === entry.indexKey;
            const accent = entry.indexKey ? FOLDER_ACCENT[entry.indexKey] : undefined;
            return (
              <div
                key={entry.name}
                className={clsx(styles.row, indexActive && styles.rowActive)}
                style={indexActive && accent ? { boxShadow: `inset 2px 0 0 ${accent}` } : undefined}
                onClick={() => toggleFolder(entry.name)}
              >
                <span className={styles.caret}>{entry.isOpen ? "▾" : "▸"}</span>
                <span className={styles.label}>{entry.label}</span>
                {entry.indexKey && accent && (
                  <span
                    className={styles.pill}
                    style={indexActive
                      ? { borderColor: accent, background: accent, color: "#1a1d23" }
                      : { borderColor: accent, color: accent }}
                    onClick={(e) => { e.stopPropagation(); openDoc(entry.indexKey!); }}
                  >
                    open →
                  </span>
                )}
              </div>
            );
          }

          const active = entry.key === activeKey;
          const dotColor = entry.dotColor ?? (active ? "var(--accent)" : "#555b66");

          return (
            <div
              key={entry.key}
              className={clsx(styles.row, active && styles.rowActive)}
              style={{
                paddingLeft: 7 + entry.depth * 16,
                ...(active && { boxShadow: `inset 2px 0 0 ${fileColor(entry.key)}` }),
              }}
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
