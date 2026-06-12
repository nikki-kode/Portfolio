"use client";

import { useState } from "react";
import clsx from "clsx";
import type { ContactDoc } from "@/data/docs";
import styles from "./ContactView.module.css";

type Row = ContactDoc["rows"][number];

function ContactRow({ row }: { row: Row }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    if (row.action === "copy") {
      navigator.clipboard.writeText(row.copyVal ?? row.value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    } else if (row.action === "↗") {
      const href = row.value.startsWith("http") ? row.value : `https://${row.value}`;
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (row.action === "↓") {
      window.open(`/${row.value}`, "_blank");
    }
  }

  return (
    <div className={styles.row} onClick={handleClick}>
      <span className={clsx(styles.iconBox, (row.action === "copy" || row.action === "↓") && styles.iconBoxBigGlyph)}>{row.icon}</span>
      <span className={styles.label}>{row.label}</span>
      <span className={styles.value}>{row.value}</span>
      {row.tag && <span className={styles.tag}>{row.tag}</span>}
      <span className={clsx(styles.action, copied && styles.actionCopied, row.action !== "copy" && styles.actionLarge)}>
        {copied ? "copied ✓" : row.action}
      </span>
    </div>
  );
}

export default function ContactView({ doc }: { doc: ContactDoc }) {
  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Get in touch</h1>
        <p className={styles.intro}>
          Open to SWE, UX design, and UX research roles. The fastest way to reach me is email — click to copy.
        </p>

        <div className={styles.availPill}>
          <span className={styles.availDot} />
          <span className={styles.availText}>{doc.avail}</span>
        </div>

        {doc.rows.map((row) => (
          <ContactRow key={row.label} row={row} />
        ))}

        <div className={styles.location}>
          <span>⌖</span>
          {doc.location}
        </div>
      </div>
    </div>
  );
}
