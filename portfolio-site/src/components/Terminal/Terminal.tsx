"use client";

import { useRef, useEffect, useState } from "react";
import type { TermLine } from "@/hooks/useIDEState";
import styles from "./Terminal.module.css";

type Props = {
  lines: TermLine[];
  input: string;
  promptPath: string;
  onInputChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onCollapse: () => void;
};

export default function Terminal({ lines, input, promptPath, onInputChange, onKeyDown, onClear, onCollapse }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPos, setCursorPos] = useState(0);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function syncCursor() {
    setCursorPos(inputRef.current?.selectionStart ?? 0);
  }

  const safePos = Math.min(cursorPos, input.length);

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
                <span className={styles.prompt}>{line.path ?? "~/portfolio"}</span>{" "}
                <span className={styles.promptSep}>%</span>{" "}
              </>
            )}
            <span style={{ color: line.color, whiteSpace: "pre-wrap" }}>{line.text}</span>
          </div>
        ))}

        <div className={styles.inputRow}>
          <span className={styles.prompt}>{promptPath}</span>&nbsp;
          <span className={styles.promptSep}>%</span>&nbsp;
          <div className={styles.inputWrap}>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => { onInputChange(e.target.value); setCursorPos(e.target.selectionStart ?? 0); }}
              onKeyDown={(e) => { onKeyDown(e); requestAnimationFrame(syncCursor); }}
              onKeyUp={syncCursor}
              onSelect={syncCursor}
              onClick={syncCursor}
              autoComplete="off"
              spellCheck={false}
            />
            <div className={styles.mirror} aria-hidden="true">
              {input.slice(0, safePos)}
              <span className={styles.termCursor} />
              {input.length === 0 && <span className={styles.placeholder}>type &apos;help&apos;</span>}
              {input.slice(safePos)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
