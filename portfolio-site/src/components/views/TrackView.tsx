"use client";

import type { TrackDoc } from "@/data/docs";
import { waveform } from "@/lib/waveform";
import styles from "./TrackView.module.css";

type Props = {
  doc: TrackDoc;
  trackKey: string;
  playing: string | null;
  togglePlaying: (key: string) => void;
  onBack: () => void;
};

export default function TrackView({ doc, trackKey, playing, togglePlaying, onBack }: Props) {
  const isPlaying = playing === trackKey;
  const bigBars = waveform(doc.musKey, 80);

  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <span className={styles.backLink} onClick={onBack}>‹ music/</span>

        <div className={styles.header}>
          <button
            className={styles.playBtn}
            data-playing={isPlaying}
            onClick={() => togglePlaying(trackKey)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <div>
            <h1 className={styles.title}>{doc.title}</h1>
            <div className={styles.genreLine}>{doc.genre} · {doc.year}</div>
          </div>
        </div>

        {/* Big waveform */}
        <div className={styles.bigWaveform}>
          {bigBars.map((h, i) => (
            <div
              key={i}
              className={styles.bigBar}
              data-playing={isPlaying}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className={styles.waveTimeline}>
          <span>0:00</span>
          <span>{doc.duration}</span>
        </div>

        {/* Meta grid */}
        <div className={styles.metaGrid}>
          {[
            { label: "KEY", value: doc.musKey },
            { label: "DURATION", value: doc.duration },
            { label: "YEAR", value: doc.year },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className={styles.metaKey}>{label}</div>
              <div className={styles.metaValue}>{value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        {doc.desc.map((p, i) => (
          <p key={i} className={styles.para}>{p}</p>
        ))}

        {/* Instrumentation */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>INSTRUMENTATION</div>
          <div className={styles.chips}>
            {doc.instruments.map((inst) => (
              <span key={inst} className={styles.chip}>{inst}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className={styles.links}>
          {doc.links.map((link) => (
            <span key={link} className={styles.linkPill}>
              {link} <span>↗</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
