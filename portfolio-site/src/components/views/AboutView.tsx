"use client";

import type { AboutDoc } from "@/data/docs";
import styles from "./AboutView.module.css";

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
          <div className={styles.avatar}>NK</div>
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
          <div className={styles.sectionLabel}>TOOLBOX</div>
          <div className={styles.toolbox}>
            {doc.toolbox.map((t) => (
              <span key={t} className={styles.tool}>{t}</span>
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
