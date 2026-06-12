"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./GateScreen.module.css";

const STORAGE_KEY = "nkdev_unlocked";
const PASSWORD = "ineedajob";

type Props = { children: React.ReactNode };

export default function GateScreen({ children }: Props) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [entering, setEntering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUnlocked(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  useEffect(() => {
    if (unlocked === false) inputRef.current?.focus();
  }, [unlocked]);

  function attempt() {
    if (input === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "1");
      setEntering(true);
      setTimeout(() => setUnlocked(true), 400);
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 1200);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") attempt();
  }

  if (unlocked === null) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className={styles.root} data-entering={entering}>
      <div className={styles.card}>
        <div className={styles.domain}>nikkikode.dev</div>
        <div className={styles.status}>— development in progress</div>

        <div className={styles.inputRow} data-error={error}>
          <span className={styles.prompt}>password</span>
          <input
            ref={inputRef}
            className={styles.input}
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="············"
            autoComplete="off"
            spellCheck={false}
          />
          <button className={styles.enter} onClick={attempt}>→</button>
        </div>

        {error && <div className={styles.errorMsg}>incorrect password</div>}
      </div>
    </div>
  );
}
