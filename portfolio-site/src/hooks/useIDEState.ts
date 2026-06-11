"use client";

import { useReducer, useCallback } from "react";
import { resolveFile } from "@/data/docs";

export type View = "preview" | "split" | "code";

export type TermLine = {
  isCmd: boolean;
  text: string;
  color?: string;
};

export type IDEState = {
  activeKey: string;
  tabs: string[];
  view: View;
  activeSection: string;
  open: Record<string, boolean>;
  termOpen: boolean;
  termInput: string;
  termLines: TermLine[];
  history: string[];
  histIdx: number;
};

type Action =
  | { type: "OPEN_DOC"; key: string }
  | { type: "CLOSE_TAB"; key: string }
  | { type: "SET_VIEW"; view: View }
  | { type: "SET_SECTION"; id: string }
  | { type: "TOGGLE_FOLDER"; name: string }
  | { type: "TOGGLE_TERM" }
  | { type: "SET_TERM_INPUT"; value: string }
  | { type: "RUN_COMMAND"; cmd: string; lines: TermLine[]; navTo: string | null }
  | { type: "CLEAR_TERM" }
  | { type: "HIST_UP" }
  | { type: "HIST_DOWN" };

const initial: IDEState = {
  activeKey: "about.md",
  tabs: ["about.md"],
  view: "preview",
  activeSection: "overview",
  open: { projects: true, "ux-research": false },
  termOpen: false,
  termInput: "",
  termLines: [
    {
      isCmd: false,
      text: "portfolio shell — type 'help' to list commands, or click a file in the tree.",
      color: "#7b828f",
    },
  ],
  history: [],
  histIdx: -1,
};

function reducer(state: IDEState, action: Action): IDEState {
  switch (action.type) {
    case "OPEN_DOC": {
      if (state.tabs.includes(action.key)) {
        return { ...state, activeKey: action.key, view: "preview", activeSection: "overview" };
      }
      return {
        ...state,
        activeKey: action.key,
        tabs: [...state.tabs, action.key],
        view: "preview",
        activeSection: "overview",
      };
    }
    case "CLOSE_TAB": {
      if (state.tabs.length === 1) return state; // keep at least one tab
      const idx = state.tabs.indexOf(action.key);
      if (idx === -1) return state;
      const next = state.tabs.filter((t) => t !== action.key);
      const nextActive =
        state.activeKey === action.key
          ? next[Math.min(idx, next.length - 1)]
          : state.activeKey;
      return { ...state, tabs: next, activeKey: nextActive! };
    }
    case "SET_VIEW":
      return { ...state, view: action.view };
    case "SET_SECTION":
      return { ...state, activeSection: action.id };
    case "TOGGLE_FOLDER":
      return { ...state, open: { ...state.open, [action.name]: !state.open[action.name] } };
    case "TOGGLE_TERM":
      return { ...state, termOpen: !state.termOpen };
    case "SET_TERM_INPUT":
      return { ...state, termInput: action.value };
    case "RUN_COMMAND": {
      const newLines =
        action.cmd === "clear"
          ? []
          : [...state.termLines, { isCmd: true, text: action.cmd }, ...action.lines];
      const newHistory = action.cmd ? [...state.history, action.cmd] : state.history;
      const nextState: IDEState = {
        ...state,
        termLines: newLines,
        history: newHistory,
        histIdx: -1,
        termInput: "",
      };
      if (action.navTo) {
        const key = action.navTo;
        if (nextState.tabs.includes(key)) {
          return { ...nextState, activeKey: key, view: "preview", activeSection: "overview" };
        }
        return { ...nextState, activeKey: key, tabs: [...nextState.tabs, key], view: "preview", activeSection: "overview" };
      }
      return nextState;
    }
    case "CLEAR_TERM":
      return { ...state, termLines: [] };
    case "HIST_UP": {
      if (!state.history.length) return state;
      const idx =
        state.histIdx < 0 ? state.history.length - 1 : Math.max(0, state.histIdx - 1);
      return { ...state, histIdx: idx, termInput: state.history[idx] };
    }
    case "HIST_DOWN": {
      if (state.histIdx < 0) return state;
      const idx = state.histIdx + 1;
      if (idx >= state.history.length) return { ...state, histIdx: -1, termInput: "" };
      return { ...state, histIdx: idx, termInput: state.history[idx] };
    }
    default:
      return state;
  }
}

function buildCommandOutput(cmd: string): { lines: TermLine[]; navTo: string | null } {
  const parts = cmd.trim().split(/\s+/);
  const verb = (parts[0] ?? "").toLowerCase();
  const arg = parts.slice(1).join(" ");
  const lines: TermLine[] = [];
  const push = (text: string, color = "#9aa1ad") => lines.push({ isCmd: false, text, color });
  let navTo: string | null = null;

  if (!cmd.trim()) {
    return { lines, navTo };
  }

  switch (verb) {
    case "help":
      push("Available commands —", "#7b828f");
      [
        ["about", "who I am & how I work"],
        ["projects", "list case studies"],
        ["open <name>", "open a file (try: open atlas)"],
        ["research", "ux research & writeups"],
        ["resume", "grab my CV"],
        ["contact", "email · github · linkedin"],
        ["ls", "list files here"],
        ["theme", "switch theme"],
        ["clear", "clear the screen"],
      ].forEach(([c, d]) =>
        push(`  ${c}${" ".repeat(Math.max(1, 16 - c.length))}${d}`, "#cdd2da")
      );
      break;
    case "ls":
      push("about.md   projects/   ux-research/   resume.pdf   contact.md", "#cdd2da");
      break;
    case "projects":
      push("project-alpha.md   project-bravo.md   project-charlie.md", "#cdd2da");
      push("open any with: open <name>", "#565d6b");
      break;
    case "whoami":
      push("Nikki Kode — software engineer · ux designer · ux researcher", "#cdd2da");
      break;
    case "about":
    case "contact":
      navTo = `${verb}.md`;
      push(`opening ${verb}.md …`, "#565d6b");
      break;
    case "research":
      push("ux-research/ — capstone.md, ixdf.md, usability-study.md (drafts)", "#cdd2da");
      break;
    case "resume":
      push("resume.pdf — wire this up to your real CV file ✦", "#cdd2da");
      break;
    case "theme":
      push("theme: dark (the only flavor for now) ✦", "#cdd2da");
      break;
    case "open":
    case "cat":
    case "vim":
    case "cd": {
      if (verb === "cd" && (!arg || arg === ".." || arg === "~")) {
        push("~", "#565d6b");
        break;
      }
      const key = resolveFile(arg);
      if (key) {
        navTo = key;
        push(`opening ${key} …`, "#565d6b");
      } else {
        push(`no such file: ${arg || "?"} — try 'ls'`, "#e0655b");
      }
      break;
    }
    default:
      push(`zsh: command not found: ${verb} — type 'help'`, "#e0655b");
  }

  return { lines, navTo };
}

export function useIDEState() {
  const [state, dispatch] = useReducer(reducer, initial);

  const openDoc = useCallback((key: string) => dispatch({ type: "OPEN_DOC", key }), []);
  const closeTab = useCallback((key: string) => dispatch({ type: "CLOSE_TAB", key }), []);
  const setView = useCallback((view: View) => dispatch({ type: "SET_VIEW", view }), []);
  const setSection = useCallback((id: string) => dispatch({ type: "SET_SECTION", id }), []);
  const toggleFolder = useCallback(
    (name: string) => dispatch({ type: "TOGGLE_FOLDER", name }),
    []
  );
  const toggleTerm = useCallback(() => dispatch({ type: "TOGGLE_TERM" }), []);
  const setTermInput = useCallback(
    (value: string) => dispatch({ type: "SET_TERM_INPUT", value }),
    []
  );
  const clearTerm = useCallback(() => dispatch({ type: "CLEAR_TERM" }), []);
  const histUp = useCallback(() => dispatch({ type: "HIST_UP" }), []);
  const histDown = useCallback(() => dispatch({ type: "HIST_DOWN" }), []);

  const runCommand = useCallback((raw: string) => {
    const { lines, navTo } = buildCommandOutput(raw);
    dispatch({ type: "RUN_COMMAND", cmd: raw.trim(), lines, navTo });
  }, []);

  return {
    state,
    openDoc,
    closeTab,
    setView,
    setSection,
    toggleFolder,
    toggleTerm,
    setTermInput,
    clearTerm,
    histUp,
    histDown,
    runCommand,
  };
}
