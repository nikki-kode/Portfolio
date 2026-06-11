import clsx from "clsx";
import { docs } from "@/data/docs";
import styles from "./ProjectsIndexView.module.css";

const PROJECT_KEYS = ["project-alpha.md", "project-bravo.md", "project-charlie.md"] as const;

type Props = { openDoc: (key: string) => void };

export default function ProjectsIndexView({ openDoc }: Props) {
  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>projects/</h1>
        <p className={styles.sub}>Case studies — engineering, design, and research.</p>

        {PROJECT_KEYS.map((key) => {
          const doc = docs[key];
          const isProject = doc?.type === "project";

          return (
            <div
              key={key}
              className={clsx(styles.card, !isProject && styles.cardStub)}
              onClick={() => isProject && openDoc(key)}
            >
              <span className={clsx(styles.cardDot, !isProject && styles.cardDotStub)} />
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>
                  {isProject ? doc.title : key}
                  {!isProject && <span className={styles.draftBadge}>draft</span>}
                </div>
                {isProject && (
                  <>
                    <div className={styles.cardTagline}>{doc.tagline}</div>
                    <div className={styles.cardMeta}>{doc.role} · {doc.timeline}</div>
                  </>
                )}
              </div>
              {isProject && <span className={styles.arrow}>›</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
