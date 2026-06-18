"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./BootOverlay.module.css";

const SESSION_KEY = "nkdev_booted";

const LINES = [
  { badge: "$",       badgeColor: "#f5a97f", text: " booting nikkikode.dev …",                                                          textColor: "#cdd2da" },
  { badge: "[ ok ]",  badgeColor: "#5ba85f", text: "  mounting /home",                                                                  textColor: "#9aa1ad" },
  { badge: "[ ok ]",  badgeColor: "#5ba85f", text: "  loading profile: swe · ux · music",        textColor: "#9aa1ad" },
  { badge: "[ ok ]",  badgeColor: "#5ba85f", text: "  fetching selected work … 3 case studies",                                         textColor: "#9aa1ad" },
  { badge: "[ ok ]",  badgeColor: "#5ba85f", text: "  status · open to work · grad Aug 2026",                                           textColor: "#9aa1ad" },
  { badge: "$",       badgeColor: "#f5a97f", text: " launching interface",                                                              textColor: "#f5a97f" },
] as const;

export default function BootOverlay() {
  const [visible, setVisible] = useState(() =>
    typeof window !== "undefined" ? !sessionStorage.getItem(SESSION_KEY) : false
  );
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!visible) return;

    // Reset in case of StrictMode double-invocation leaving stale state
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setShown(0);
    setFading(false);

    const n = LINES.length;
    for (let i = 1; i <= n; i++) {
      timers.current.push(setTimeout(() => setShown(i), 320 * i));
    }
    // Mark as shown when fading begins — not at effect start, so StrictMode
    // double-invocation doesn't set the key before the cleanup cancels timers.
    timers.current.push(setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setFading(true);
    }, 320 * n + 700));
    timers.current.push(setTimeout(() => setVisible(false), 320 * n + 1250));

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  function skip() {
    timers.current.forEach(clearTimeout);
    sessionStorage.setItem(SESSION_KEY, "1");
    setFading(true);
    setTimeout(() => setVisible(false), 380);
  }

  if (!visible) return null;

  return (
    <div className={styles.overlay} data-fading={fading} aria-hidden="true">
      <div className={styles.panel}>
        <div className={styles.titleBar}>
          <div className={styles.lights}>
            <span className={styles.lightRed} />
            <span className={styles.lightYellow} />
            <span className={styles.lightGreen} />
          </div>
          <span className={styles.title}>nikkikode.dev — boot</span>
          <button className={styles.skip} onClick={skip}>skip ▸</button>
        </div>

        <div className={styles.lines}>
          {LINES.slice(0, shown).map((line, i) => (
            <div key={i} className={styles.line}>
              <span className={styles.badge} style={{ color: line.badgeColor }}>{line.badge}</span>
              <span style={{ color: line.textColor }}>{line.text}</span>
              {i === shown - 1 && <span className={styles.cursor} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
