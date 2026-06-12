export type ProjectDoc = {
  type: "project";
  title: string;
  tagline: string;
  kind: string;
  year: string;
  tags: string[];
  role: string;
  timeline: string;
  tools: string;
  platform: string;
  link: string;
  overview: string[];
  problem: string[];
  research: string[];
  design: string[];
  quote: { text: string; who: string };
  outcome: { stat: string; label: string }[];
  gallery: string[];
};

export type AboutDoc = {
  type: "about";
  paras: string[];
  whatIDo: { k: string; d: string }[];
  toolbox: string[];
  now: string[];
};

export type ContactDoc = {
  type: "contact";
  avail: string;
  location: string;
  rows: { label: string; value: string; copyVal?: string; action: string; icon: string; tag?: string }[];
};

export type StubDoc = { type: "stub" };
export type ProjectsIndexDoc = { type: "projects-index" };
export type MusicIndexDoc = { type: "music-index" };
export type TrackDoc = {
  type: "track";
  title: string;
  year: string;
  musKey: string;
  duration: string;
  genre: string;
  instruments: string[];
  desc: string[];
  links: string[];
};

export type Doc = ProjectDoc | AboutDoc | ContactDoc | StubDoc | ProjectsIndexDoc | MusicIndexDoc | TrackDoc;

export const SECTIONS = ["overview", "problem", "research", "design", "outcome", "gallery"] as const;
export type SectionId = (typeof SECTIONS)[number];

export const MUSIC_KEYS = ["nocturne-in-blue.mp3", "tidewater.mp3", "signal-lost.mp3"] as const;

export const docs: Record<string, Doc> = {
  "projects/": { type: "projects-index" },
  "music/": { type: "music-index" },

  "nocturne-in-blue.mp3": {
    type: "track",
    title: "Nocturne in Blue (example)",
    year: "2024",
    musKey: "D♭ minor",
    duration: "4:12",
    genre: "Solo piano",
    instruments: ["Piano"],
    desc: [
      "A late-night solo-piano piece built on a descending left-hand figure that never quite resolves — the harmonic equivalent of not being able to sleep.",
      "Written in a single sitting and barely edited since; I wanted to keep the unsteadiness of the first take.",
    ],
    links: ["SoundCloud", "Score (PDF)"],
  },

  "tidewater.mp3": {
    type: "track",
    title: "Tidewater (example)",
    year: "2023",
    musKey: "A major",
    duration: "6:38",
    genre: "String quartet",
    instruments: ["Violin I", "Violin II", "Viola", "Cello"],
    desc: [
      "A string quartet in three connected sections that ebb and flow like a tide — phrases pass between the instruments and return slightly changed each time.",
      "The middle section borrows a folk melody my grandmother used to hum.",
    ],
    links: ["SoundCloud", "Score (PDF)"],
  },

  "signal-lost.mp3": {
    type: "track",
    title: "Signal Lost (example)",
    year: "2023",
    musKey: "—",
    duration: "3:55",
    genre: "Electronic",
    instruments: ["Synths", "Drum machine", "Field recordings"],
    desc: [
      "An electronic piece assembled from analog-synth takes and field recordings of a train station, slowly degrading into static.",
      "A study in letting a clean signal fall apart on purpose.",
    ],
    links: ["SoundCloud", "Bandcamp"],
  },

  "project-alpha.md": {
    type: "project",
    title: "Aurora (example page)",
    kind: "Design system",
    year: "2024",
    tags: ["Engineering", "Design"],
    platform: "Web app",
    tagline:
      "A design system & component library that unified six fintech products onto one accessible, themeable foundation.",
    role: "Lead engineer + design",
    timeline: "2024 · 5 months",
    tools: "Figma · React · TypeScript · Storybook",
    link: "aurora.example.com",
    overview: [
      "Aurora is the shared design system behind a suite of six fintech products. Before it existed, every team shipped its own buttons, forms, and tables — inconsistent, hard to maintain, and rarely accessible.",
      "I led the effort end to end: auditing the existing UI, defining tokens, building the component library in React, and rolling it out team by team.",
    ],
    problem: [
      "A UI audit turned up 14 distinct button styles, 9 input components, and no shared color or spacing scale. Accessibility was an afterthought — contrast failures and missing focus states everywhere.",
      "Shipping one cross-product feature meant rebuilding the same patterns three or four times. Velocity was bleeding into duplicated work.",
    ],
    research: [
      "I ran a component inventory across all six products and interviewed eight engineers and three designers about where the current UI slowed them down.",
      "The recurring theme: people didn't distrust a design system — they distrusted one that would lag behind their needs and force workarounds.",
    ],
    quote: {
      text: "I'll adopt it the day it stops being faster to copy-paste from the last feature.",
      who: "senior engineer, payments team",
    },
    design: [
      "I defined a three-tier token model — primitive, semantic, and component — so theming a whole product meant swapping the semantic layer. Dark mode fell out almost for free.",
      "Every component shipped with accessible defaults, keyboard support, and a Storybook page documenting props, do's and don'ts, and live examples.",
    ],
    outcome: [
      { stat: "6 → 1", label: "design systems consolidated" },
      { stat: "40%", label: "less UI code per feature" },
      { stat: "AA", label: "contrast across all components" },
    ],
    gallery: ["Token architecture", "Component library", "Dark mode"],
  },

  // project-bravo.md and project-charlie.md intentionally absent — resolves to stub

  "project-bravo-UNUSED.md": {
    type: "project",
    title: "Ledger",
    kind: "Internal tool",
    year: "2023",
    tags: ["Engineering"],
    platform: "Internal web tool",
    tagline:
      "A reconciliation tool that turned a 3-hour manual month-end close into a 20-minute guided flow.",
    role: "Product engineer",
    timeline: "2023 · 4 months",
    tools: "React · D3 · Node · Postgres",
    link: "—",
    overview: [
      "Ledger is the internal tool the finance team uses to reconcile transactions at month-end. The old process was a maze of spreadsheets and copy-paste that ate most of a day and was easy to get wrong.",
      "I designed and built the reconciliation flow, the diff view, and the audit trail.",
    ],
    problem: [
      "Reconciliation meant exporting CSVs from three systems, eyeballing mismatches in Excel, and noting resolutions by hand — with no record of who changed what.",
      "One missed mismatch could take hours to trace. The team wanted speed, but even more they wanted confidence.",
    ],
    research: [
      "I shadowed two analysts through a full month-end close, timing each step and noting every place they switched tools or second-guessed a number.",
      "The biggest time sink wasn't fixing mismatches — it was finding them.",
    ],
    quote: {
      text: "Show me what doesn't match and why, and I'll do the rest.",
      who: "finance analyst",
    },
    design: [
      "The core is a side-by-side diff that surfaces only the rows that disagree, ranked by dollar impact. Every resolution writes an immutable audit entry.",
      "A guided flow walks the analyst from import to sign-off, so the tool carries the process instead of living in someone's head.",
    ],
    outcome: [
      { stat: "3h → 20m", label: "time to close the books" },
      { stat: "100%", label: "resolutions audited" },
      { stat: "0", label: "spreadsheets in the loop" },
    ],
    gallery: ["Diff view", "Guided close", "Audit trail"],
  },

  "project-charlie-UNUSED.md": {
    type: "project",
    title: "Atlas",
    kind: "Mobile · research",
    year: "2023",
    tags: ["Research", "Design"],
    platform: "iOS",
    tagline:
      "A wayfinding app for a hospital network — research-led, tested with real patients and visitors.",
    role: "UX researcher + designer",
    timeline: "2023 · 3 months",
    tools: "Figma · Maze · SwiftUI",
    link: "—",
    overview: [
      "Atlas helps patients and visitors navigate a sprawling three-building hospital campus. Getting lost meant missed appointments and stressed people arriving late.",
      "I owned the research and the interaction design, partnering with one engineer to ship the iOS pilot.",
    ],
    problem: [
      "Signage assumed you already knew the building names. First-time visitors — often anxious, sometimes in pain — had no mental model of the campus to hang directions on.",
      "Consumer map apps stopped at the front door; indoor turn-by-turn didn't exist here.",
    ],
    research: [
      "I ran 12 contextual interviews in waiting rooms and shadowed 6 visitors trying to reach a department from the entrance.",
      "Then I tested two prototype directions with 18 participants in unmoderated studies, measuring task success and time-to-find.",
    ],
    quote: {
      text: "I don't want a map. I want you to tell me where to turn.",
      who: "visitor, cardiology wing",
    },
    design: [
      "The winning direction dropped the map-first model for a step-by-step prompt: one landmark-based instruction at a time, with a glance-able progress bar.",
      "Color and iconography matched the physical signage so the digital and built environments reinforced each other.",
    ],
    outcome: [
      { stat: "+34%", label: "task success vs. baseline" },
      { stat: "−41%", label: "time to find a department" },
      { stat: "18", label: "usability-test participants" },
    ],
    gallery: ["Landmark prompts", "Usability testing", "Signage system"],
  },

  "about.md": {
    type: "about",
    paras: [
      "Placeholder paragraph one.",
      "Placeholder paragraph two.",
    ],
    whatIDo: [
      { k: "Discipline one", d: "Placeholder description for what you do in this area." },
      { k: "Discipline two", d: "Placeholder description for what you do in this area." },
      { k: "Discipline three", d: "Placeholder description for what you do in this area." },
    ],
    toolbox: ["Tool one", "Tool two", "Tool three", "Tool four", "Tool five"],
    now: [
      "item one here",
      "item two here",
      "item three here",
    ],
  },

  "contact.md": {
    type: "contact",
    avail: "Open to work · usually replies within a day",
    location: "Pittsburgh, PA · UTC−5",
    rows: [
      { label: "email",    value: "nikki.kode@gmail.com",      copyVal: "nikki.kode@gmail.com", action: "copy", icon: "✉", tag: "Fastest!" },
      { label: "github",   value: "github.com/nikki-kode",     action: "↗",   icon: "gh" },
      { label: "linkedin", value: "linkedin.com/in/nikki-kode", action: "↗",  icon: "in" },
      { label: "resume",   value: "resume.pdf",                 action: "↓",   icon: "↓" },
    ],
  },
};

export const fileMeta: Record<string, "stub"> = {
  "capstone.md": "stub",
  "ixdf.md": "stub",
  "usability-study.md": "stub",
};

export function getDoc(key: string): Doc {
  return docs[key] ?? { type: "stub" };
}

export function resolveFile(arg: string): string | null {
  if (!arg) return null;
  const a = arg.toLowerCase().replace(/\.md$/, "").replace(/\//g, "");
  const map: Record<string, string> = {
    projects: "projects/",
    alpha: "project-alpha.md",
    "project-alpha": "project-alpha.md",
    bravo: "project-bravo.md",
    "project-bravo": "project-bravo.md",
    charlie: "project-charlie.md",
    "project-charlie": "project-charlie.md",
    capstone: "capstone.md",
    ixdf: "ixdf.md",
    about: "about.md",
    me: "about.md",
    contact: "contact.md",
    music: "music/",
    nocturne: "nocturne-in-blue.mp3",
    "nocturne-in-blue": "nocturne-in-blue.mp3",
    tidewater: "tidewater.mp3",
    signal: "signal-lost.mp3",
    "signal-lost": "signal-lost.mp3",
  };
  if (map[a]) return map[a];
  const keys = [...Object.keys(docs), ...Object.keys(fileMeta)];
  return keys.find((k) => k.toLowerCase().includes(a)) ?? null;
}
