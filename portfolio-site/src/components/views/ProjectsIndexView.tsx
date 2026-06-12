"use client";

import { useState } from "react";
import clsx from "clsx";
import { docs } from "@/data/docs";
import styles from "./ProjectsIndexView.module.css";

const PROJECT_KEYS = ["project-alpha.md", "project-bravo.md", "project-charlie.md"] as const;
const FILTERS = ["All", "Engineering", "Design", "Research"] as const;
type Filter = (typeof FILTERS)[number];

type Props = { openDoc: (key: string) => void };

export default function ProjectsIndexView({ openDoc }: Props) {
  const [filter, setFilter] = useState<Filter>("All");

  const allProjects = PROJECT_KEYS.map((key) => ({ key, doc: docs[key] }));
  const liveProjects = allProjects.filter(({ doc }) => doc?.type === "project");
  const stubProjects = allProjects.filter(({ doc }) => doc?.type !== "project");

  const visibleLive =
    filter === "All"
      ? liveProjects
      : liveProjects.filter(
          ({ doc }) =>
            doc?.type === "project" && doc.tags.includes(filter)
        );

  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <h1 className={styles.heading}>projects/</h1>
          <span className={styles.count}>{liveProjects.length} case {liveProjects.length === 1 ? "study" : "studies"}</span>
        </div>
        <p className={styles.sub}>
          Selected work across engineering, design, and research. Filter by discipline, or open any case study.
        </p>

        <div className={styles.filterRow}>
          {FILTERS.map((f) => (
            <span
              key={f}
              className={clsx(styles.filterTab, filter === f && styles.filterTabActive)}
              onClick={() => setFilter(f)}
            >
              {f}
            </span>
          ))}
        </div>

        <div className={styles.grid}>
          {visibleLive.map(({ key, doc }) => {
            if (doc?.type !== "project") return null;
            return (
              <div key={key} className={styles.card} onClick={() => openDoc(key)}>
                <div className={styles.thumb} />
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.kindBadge}>{doc.kind}</span>
                    <span className={styles.year}>{doc.year}</span>
                  </div>
                  <div className={styles.cardTitle}>{doc.title}</div>
                  <div className={styles.cardBlurb}>{doc.tagline}</div>
                  <div className={styles.readLink}>Read case study <span>→</span></div>
                </div>
              </div>
            );
          })}

          {stubProjects.map(({ key }) => (
            <div key={key} className={clsx(styles.card, styles.cardStub)}>
              <div className={styles.thumbStub} />
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.draftBadge}>draft</span>
                </div>
                <div className={styles.cardTitle}>{key}</div>
                <div className={styles.cardBlurb}>Coming soon.</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
