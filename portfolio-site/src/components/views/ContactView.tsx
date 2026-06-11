"use client";

import { useState } from "react";
import clsx from "clsx";
import type { ContactDoc } from "@/data/docs";
import styles from "./ContactView.module.css";

type Props = { doc: ContactDoc };

function ContactRow({ label, value, action, tag }: { label: string; value: string; action: string; tag?: string }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    if (action === "copy") {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    } else if (action === "↗") {
      const href = value.startsWith("http") ? value : `https://${value}`;
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (action === "↓") {
      window.open(`/${value}`, "_blank");
    }
  }

  return (
    <div className={styles.row} onClick={handleClick}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {tag && <span className={styles.tag}>{tag}</span>}
      <span className={clsx(styles.action, copied && styles.copied)}>
        {copied ? "✓" : action}
      </span>
    </div>
  );
}

export default function ContactView({ doc }: Props) {
  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Get in touch</h1>
        <p className={styles.intro}>
          Open to SWE, UX design, and UX research roles. The fastest way to reach me is email.
        </p>
        {doc.rows.map((row) => (
          <ContactRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  );
}
