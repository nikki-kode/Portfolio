"use client";

import { useRef } from "react";
import styles from "./HomeView.module.css";

type Props = {
  openDoc: (key: string) => void;
};

const WHAT_I_DO = [
  { n: "01", k: "Engineering", d: "Full-stack web apps, systems design, and AI-integrated products." },
  { n: "02", k: "Design", d: "Interaction and systems design — from Figma prototypes to component libraries." },
  { n: "03", k: "Research", d: "Interviews, usability testing, and synthesis." },
];

const FEATURED = [
  { key: "project-alpha.md",   title: "Aurora",  kind: "Design system",    year: "2024", blurb: "Unified six fintech products onto one accessible, themeable component library." },
  { key: "project-bravo.md",   title: "Ledger",  kind: "Internal tool",    year: "2023", blurb: "Turned a 3-hour manual month-end close into a 20-minute guided flow." },
  { key: "project-charlie.md", title: "Atlas",   kind: "Mobile · research", year: "2023", blurb: "A research-led hospital wayfinding app, tested with real patients & visitors." },
];

export default function HomeView({ openDoc }: Props) {
  const workRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>

        {/* ── HERO ── */}
        <div className={styles.hero}>

          {/* Left */}
          <div className={styles.heroLeft}>
            <div className={styles.prompt}>
              <span className={styles.promptUser}>visitor@portfolio</span>
              <span className={styles.promptTilde}> ~ </span>
              <span className={styles.promptPct}>%</span>
              <span className={styles.promptCmd}> whoami</span>
            </div>

            <h1 className={styles.name}>
              Nikki Kode
              <span className={styles.cursor} />
            </h1>

            <div className={styles.roleLine}>Software Engineer · UX Designer/Researcher</div>

            <p className={styles.lead}>
              Software engineer &amp; UX researcher with a foot on both sides of the design–engineering divide.
            </p>
            <p className={styles.creds}>
              BS in Computer Science &amp; Arts · MHCI, Carnegie Mellon — graduating August 2026.
            </p>

            <div className={styles.statusPill}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>open to work · grad Aug 2026</span>
            </div>

            <div className={styles.btnRow}>
              <button className={styles.btnPrimary} onClick={() => workRef.current?.scrollIntoView({ behavior: "smooth" })}>
                View selected work ↓
              </button>
              <button className={styles.btnOutline} onClick={() => openDoc("about.md")}>
                about.md <span className={styles.btnArrow}>→</span>
              </button>
              <button className={styles.btnOutline} onClick={() => openDoc("resume.pdf")}>
                resume.pdf <span className={styles.btnArrow}>↓</span>
              </button>
            </div>
          </div>

          {/* Right — portrait card */}
          <div className={styles.portraitCard}>
            <div className={styles.portraitTitleBar}>
              <div className={styles.trafficLights}>
                <span className={styles.tlRed} />
                <span className={styles.tlYellow} />
                <span className={styles.tlGreen} />
              </div>
              <span className={styles.portraitFilename}>me.png</span>
            </div>
            <img src="/profilepic.jpg" alt="Nikki Kode" className={styles.portrait} />
            <div className={styles.portraitFooter}>// builds it, then tests it on real people</div>
          </div>
        </div>

        {/* ── WHAT I DO ── */}
        <div className={styles.whatIDo}>
          <div className={styles.sectionComment}>// WHAT I DO</div>
          <div className={styles.whatIDoGrid}>
            {WHAT_I_DO.map((w) => (
              <div key={w.n} className={styles.disciplineCard}>
                <div className={styles.disciplineTop}>
                  <span className={styles.disciplineNum}>{w.n}</span>
                  <span className={styles.disciplineDot} />
                </div>
                <div className={styles.disciplineTitle}>{w.k}</div>
                <div className={styles.disciplineDesc}>{w.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SELECTED WORK ── */}
        <div ref={workRef} className={styles.selectedWork} data-section="work">
          <div className={styles.workHeader}>
            <div>
              <h2 className={styles.workTitle}>Selected work</h2>
              <div className={styles.workSub}>Three case studies across engineering, design &amp; research.</div>
            </div>
            <span className={styles.viewAll} onClick={() => openDoc("projects/")}>view all →</span>
          </div>
          <div className={styles.workGrid}>
            {FEATURED.map((p) => (
              <div key={p.key} className={styles.projectCard} onClick={() => openDoc(p.key)}>
                <div className={styles.cardThumb} />
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.kindBadge}>{p.kind}</span>
                    <span className={styles.cardYear}>{p.year}</span>
                  </div>
                  <div className={styles.cardTitle}>{p.title}</div>
                  <div className={styles.cardBlurb}>{p.blurb}</div>
                  <div className={styles.cardReadMore}>Read case study →</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div className={styles.bottomStrip}>
          <div>
            <div className={styles.stripComment}>// CURRENTLY</div>
            <div className={styles.stripLine}>
              <span className={styles.stripBullet}>▹</span>
              open to SWE · UX research roles — graduating Aug 2026
            </div>
            <div className={styles.musicTeaser} onClick={() => openDoc("music/")}>
              <span className={styles.musicNote}>♪</span>
              I also compose — solo piano, strings &amp; electronic
              <span className={styles.musicLink}> → music/</span>
            </div>
          </div>
          <div className={styles.stripLinks}>
            <span className={styles.stripLink} onClick={() => openDoc("contact.md")}>contact.md →</span>
            <a className={styles.stripLinkExternal} href="https://github.com/nikki-kode" target="_blank" rel="noopener noreferrer">github ↗</a>
            <a className={styles.stripLinkExternal} href="https://linkedin.com/in/nikki-kode" target="_blank" rel="noopener noreferrer">linkedin ↗</a>
          </div>
        </div>

      </div>
    </div>
  );
}
