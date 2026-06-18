"use client";

import { useState } from "react";
import styles from "./ResumeView.module.css";

const RESUMES = [
  { id: "swe", label: "SWE / Backend", file: "/resume-swe.pdf" },
  { id: "ux",  label: "UX / Research",  file: "/resume-ux.pdf"  },
] as const;

export default function ResumeView() {
  const [active, setActive] = useState<"swe" | "ux">("swe");
  const current = RESUMES.find((r) => r.id === active)!;

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          {RESUMES.map((r) => (
            <button
              key={r.id}
              className={styles.tab}
              data-active={active === r.id}
              onClick={() => setActive(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <a className={styles.dl} href={current.file} download>
          Download ↓
        </a>
      </div>
      <iframe
        key={current.file}
        className={styles.frame}
        src={current.file}
        title={current.label}
      />
    </div>
  );
}
