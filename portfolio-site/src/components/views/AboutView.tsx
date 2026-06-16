"use client";

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
          <div className={styles.sectionLabel}>
            <span className={styles.sectionGray}>TOOLBOX:</span>&nbsp;
            <span style={{ color: "var(--accent)" }}>TECH</span>
            <span className={styles.sectionDot}> • </span>
            <span style={{ color: "#89b4fa" }}>DESIGN/RESEARCH</span>
            <span className={styles.sectionDot}> • </span>
            <span style={{ color: "#cba6f7" }}>CREATIVE</span>
          </div>
          <div className={styles.toolbox}>
            {doc.toolbox.map((t) => (
              <span
                key={t}
                className={clsx(
                  styles.tool,
                  CREATIVE_TOOLS.has(t) ? styles.toolCreative
                    : DESIGN_TOOLS.has(t) ? styles.toolDesign
                    : styles.toolTech
                )}
              >{t}</span>
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
