"use client";

import { useRef, useEffect } from "react";
import type { TermLine } from "@/hooks/useIDEState";
import styles from "./Terminal.module.css";

type Props = {
  lines: TermLine[];
  input: string;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onCollapse: () => void;
};

export default function Terminal({ lines, input, onInputChange, onKeyDown, onClear, onCollapse }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>TERMINAL</span>
        <div className={styles.controls}>
          <span className={styles.ctrl} onClick={onClear}>clear</span>
          <span className={`${styles.ctrl} ${styles.collapseBtn}`} onClick={onCollapse}>⌄</span>
        </div>
      </div>

      <div
        ref={bodyRef}
        className={styles.body}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className={styles.line}>
            {line.isCmd && (
              <>
                <span className={styles.prompt}>~/portfolio</span>{" "}
                <span className={styles.promptSep}>%</span>{" "}
              </>
            )}
            <span style={{ color: line.color, whiteSpace: "pre-wrap" }}>{line.text}</span>
          </div>
        ))}

        <div className={styles.inputRow}>
          <span className={styles.prompt}>~/portfolio</span>&nbsp;
          <span className={styles.promptSep}>%</span>&nbsp;
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type 'help'"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
