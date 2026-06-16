"use client";

import { useState } from "react";
import clsx from "clsx";
import type { AboutDoc } from "@/data/docs";
import styles from "./AboutView.module.css";

const DESIGN_TOOLS = new Set(["Figma", "Adobe Suite", "Otter.ai", "Claude", "Cursor", "Gemini"]);
const CREATIVE_TOOLS = new Set(["Logic Pro X", "Ableton Live", "Unity"]);

export default function AboutView({
  doc,
  onOpenContact,
}: {
  doc: AboutDoc;
  onOpenContact: () => void;
}) {
  const [filter, setFilter] = useState<"tech" | "design" | "creative" | null>(null);

  function toggle(cat: "tech" | "design" | "creative") {
    setFilter((f) => (f === cat ? null : cat));
  }

  function pillClass(t: string) {
    const cat = CREATIVE_TOOLS.has(t) ? "creative" : DESIGN_TOOLS.has(t) ? "design" : "tech";
    if (filter === null) return undefined;
    if (filter === cat) {
      return cat === "creative" ? styles.toolCreative : cat === "design" ? styles.toolDesign : styles.toolTech;
    }
    return styles.toolDim;
  }

  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.avatar}><img src="/profilepic.jpg" alt="Nikki Kode" /></div>
          <div className={styles.nameBlock}>
            <h1 className={styles.name}>Nikki Kode</h1>
            <div className={styles.role}>Software Engineer · UX Designer/Researcher · Musician</div>
            <div className={styles.location}>⌖ Pittsburgh, PA · UTC−5</div>
          </div>
        </div>

        {/* Bio paragraphs */}
        {doc.paras.map((p, i) => (
          <p key={i} className={styles.para}>{p}</p>
        ))}

        {/* What I do */}
        <div className={styles.whatIDo}>
          {doc.whatIDo.map((item) => (
            <div key={item.k} className={styles.disciplineCard}>
              <div className={styles.disciplineHeading}>
                <span className={styles.disciplineDot} />
                <span className={styles.disciplineTitle}>{item.k}</span>
              </div>
              <p className={styles.disciplineDesc}>{item.d}</p>
            </div>
          ))}
        </div>

        {/* Toolbox */}
        <div className={styles.toolboxSection}>
          <div className={styles.toolboxHeader}>
            <span className={styles.sectionLabel} style={{ marginBottom: 0, color: "var(--text-meta)" }}>TOOLBOX:</span>
            <div className={styles.filterBtns}>
              <button className={clsx(styles.filterBtn, filter === null && styles.filterBtnActive)} style={{"--btn-color": "var(--text-meta)"} as React.CSSProperties} onClick={() => setFilter(null)}>ALL</button>
              <span className={styles.sectionDot}> • </span>
              <button className={clsx(styles.filterBtn, filter === "tech" && styles.filterBtnActive)} style={{"--btn-color": "var(--accent)"} as React.CSSProperties} onClick={() => toggle("tech")}>TECH</button>
              <span className={styles.sectionDot}> • </span>
              <button className={clsx(styles.filterBtn, filter === "design" && styles.filterBtnActive)} style={{"--btn-color": "#89b4fa"} as React.CSSProperties} onClick={() => toggle("design")}>DESIGN/RESEARCH</button>
              <span className={styles.sectionDot}> • </span>
              <button className={clsx(styles.filterBtn, filter === "creative" && styles.filterBtnActive)} style={{"--btn-color": "#cba6f7"} as React.CSSProperties} onClick={() => toggle("creative")}>CREATIVE</button>
            </div>
          </div>
          <div className={styles.toolbox}>
            {doc.toolbox.map((t) => (
              <span key={t} className={clsx(styles.tool, pillClass(t))}>{t}</span>
            ))}
          </div>
        </div>

        {/* Currently */}
        <div className={styles.currently}>
          <div className={styles.sectionLabel}>CURRENTLY</div>
          {doc.now.map((item, i) => (
            <div key={i} className={styles.nowRow}>
              <span className={styles.bullet}>▹</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className={styles.cta} onClick={onOpenContact}>
          Let&apos;s talk →
        </button>
      </div>
    </div>
  );
}
