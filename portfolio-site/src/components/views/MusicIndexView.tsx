"use client";

import { docs, MUSIC_KEYS } from "@/data/docs";
import type { TrackDoc } from "@/data/docs";
import { waveform } from "@/lib/waveform";
import styles from "./MusicIndexView.module.css";

type Props = {
  playing: string | null;
  togglePlaying: (key: string) => void;
  openDoc: (key: string) => void;
};

export default function MusicIndexView({ playing, togglePlaying, openDoc }: Props) {
  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <h1 className={styles.heading}>Compositions</h1>
          <span className={styles.sub}>selected pieces</span>
        </div>
        <p className={styles.intro}>
          I compose alongside my design and engineering work — solo piano, chamber, and electronic. A few pieces below; more to come.
        </p>

        <div className={styles.trackList}>
          {MUSIC_KEYS.map((key) => {
            const doc = docs[key] as TrackDoc;
            const isPlaying = playing === key;
            const bars = waveform(doc.musKey, 44);

            return (
              <div key={key} className={styles.trackRow} onClick={() => openDoc(key)}>
                <button
                  className={styles.playBtn}
                  data-playing={isPlaying}
                  onClick={(e) => { e.stopPropagation(); togglePlaying(key); }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <div className={styles.titleBlock}>
                  <div className={styles.trackTitle} data-playing={isPlaying}>{doc.title}</div>
                  <div className={styles.trackMeta}>{doc.genre} · {doc.musKey} · {doc.duration}</div>
                </div>

                <div className={styles.waveform}>
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className={styles.bar}
                      data-playing={isPlaying}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
