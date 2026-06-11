"use client";

import { useRef, useCallback } from "react";
import clsx from "clsx";
import type { ProjectDoc } from "@/data/docs";
import type { View } from "@/hooks/useIDEState";
import styles from "./ProjectView.module.css";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem",  label: "The problem" },
  { id: "research", label: "Research" },
  { id: "design",   label: "Design & build" },
  { id: "outcome",  label: "Outcome" },
  { id: "gallery",  label: "Gallery" },
] as const;

type Props = {
  doc: ProjectDoc;
  view: View;
  activeSection: string;
  setSection: (id: string) => void;
  onBack: () => void;
};

function ImageSlot({ height, label }: { height: number; label?: string }) {
  return (
    <div className={styles.imageSlot} style={{ height }}>
      {label ?? "image"}
    </div>
  );
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.accentBar} />
      <h2 className={styles.sectionTitle}>{label}</h2>
    </div>
  );
}

export default function ProjectView({ doc, view, activeSection, setSection, onBack }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const showRail = view === "preview";

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const top = el.scrollTop + 90;
    let current = SECTIONS[0].id as string;
    for (const { id } of SECTIONS) {
      const section = el.querySelector(`[data-section="${id}"]`) as HTMLElement | null;
      if (section && section.offsetTop <= top) current = id;
    }
    if (current !== activeSection) setSection(current);
  }, [activeSection, setSection]);

  const scrollToSection = useCallback((id: string) => {
    const el = scrollRef.current;
    if (!el) return;
    const section = el.querySelector(`[data-section="${id}"]`) as HTMLElement | null;
    if (section) el.scrollTo({ top: section.offsetTop - 12, behavior: "smooth" });
    setSection(id);
  }, [setSection]);

  return (
    <div className={styles.pane}>
      <div ref={scrollRef} className={styles.scroll} onScroll={handleScroll}>
        <div className={styles.inner}>
          <span className={styles.backLink} onClick={onBack}>‹ projects/</span>

          <h1 className={styles.title}>{doc.title}</h1>
          <p className={styles.tagline}>{doc.tagline}</p>

          <div className={styles.hero}>
            <ImageSlot height={300} label="hero image" />
          </div>

          {/* Overview */}
          <div className={styles.section} data-section="overview">
            <SectionHeading label="Overview" />
            {doc.overview.map((p, i) => <p key={i} className={styles.para}>{p}</p>)}
          </div>

          {/* Problem */}
          <div className={styles.section} data-section="problem">
            <SectionHeading label="The problem" />
            {doc.problem.map((p, i) => <p key={i} className={styles.para}>{p}</p>)}
            <div className={styles.beforeAfter}>
              <div>
                <ImageSlot height={190} label="before" />
                <div className={styles.imageCaption}>before</div>
              </div>
              <div>
                <ImageSlot height={190} label="after" />
                <div className={styles.imageCaption}>after</div>
              </div>
            </div>
          </div>

          {/* Research */}
          <div className={styles.section} data-section="research">
            <SectionHeading label="Research" />
            {doc.research.map((p, i) => <p key={i} className={styles.para}>{p}</p>)}
            <div className={styles.pullQuote}>
              <div className={styles.quoteText}>&ldquo;{doc.quote.text}&rdquo;</div>
              <div className={styles.quoteAttrib}>— {doc.quote.who}</div>
            </div>
          </div>

          {/* Design & build */}
          <div className={styles.section} data-section="design">
            <SectionHeading label="Design & build" />
            {doc.design.map((p, i) => <p key={i} className={styles.para}>{p}</p>)}
            <div className={styles.designImage}>
              <ImageSlot height={300} label="key screen or diagram" />
            </div>
          </div>

          {/* Outcome */}
          <div className={styles.section} data-section="outcome">
            <SectionHeading label="Outcome" />
            <div className={styles.statsGrid}>
              {doc.outcome.map((o, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={styles.statValue}>{o.stat}</div>
                  <div className={styles.statLabel}>{o.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className={styles.section} data-section="gallery">
            <SectionHeading label="Gallery" />
            <div className={styles.gallery}>
              {doc.gallery.map((caption, i) => (
                <div key={i}>
                  <ImageSlot height={150} label={caption} />
                  <div className={styles.imageCaption}>{caption}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showRail && (
        <div className={styles.rail}>
          <div className={styles.railLabel}>ON THIS PAGE</div>
          <div className={styles.toc}>
            {SECTIONS.map(({ id, label }) => (
              <span
                key={id}
                className={clsx(styles.tocItem, activeSection === id && styles.tocItemActive)}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </span>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.railLabel}>DETAILS</div>
          <div className={styles.detailsGrid}>
            {[
              { key: "ROLE",     value: doc.role },
              { key: "TIMELINE", value: doc.timeline },
              { key: "PLATFORM", value: doc.platform },
              { key: "TOOLS",    value: doc.tools },
            ].map(({ key, value }) => (
              <div key={key} className={styles.detailField}>
                <div className={styles.detailKey}>{key}</div>
                <div className={styles.detailValue}>{value}</div>
              </div>
            ))}
            {doc.link && doc.link !== "—" && (
              <span
                className={styles.liveLink}
                onClick={() => window.open(`https://${doc.link}`, "_blank", "noopener,noreferrer")}
              >
                {doc.link} ↗
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
