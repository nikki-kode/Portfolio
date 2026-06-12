# Handoff: Terminal / IDE Portfolio — Full Site

## Overview
A personal portfolio website for someone applying to **software-engineering, UX-design, and UX-research** roles. The entire site is styled as a **code editor / terminal**: a left file-tree (`about.md`, `projects/`, `ux-research/`, `music/`, `resume.pdf`, `contact.md`), editor tabs, a `Source / Split / Preview` toggle, a docked **typeable terminal**, and a status bar.

The IDE shell is persistent chrome; the editor body swaps between **nine distinct page/document views** depending on the open file. This handoff documents **all of them**:

| # | View | Opened by | type |
|---|---|---|---|
| 2 | **Project case study** | `project-aurora.md`, `project-ledger.md` | `project` |
| 3 | **Source / Split / Code views** | the view toggle on any doc | — |
| 4 | **Research writeup** | `project-atlas.md` (+ `ux-research/` files) | `research` |
| 5 | **Projects index** | `projects/` folder | `index` |
| 6 | **Music index** ("Compositions") | `music/` folder | `music` |
| 7 | **Track detail** | `nocturne-in-blue.md`, `tidewater.md`, `signal-lost.md` | `track` |
| 8 | **about.md** | `about.md` | `about` |
| 9 | **contact.md** | `contact.md` | `contact` |
| 10 | **Draft / stub** | any not-yet-written file | `stub` |

The case study (#2) is the most polished view and was designed first; the others share its IDE shell, type scale, and token set. A **logo / brand variant** of the whole site also ships — see *Logo variant* below.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior. They are **not production code to copy directly**.

They are authored as "Design Components" (`.dc.html`) — an internal prototyping format that uses an inline-styles + template runtime (`support.js`). **Do not port the `.dc.html` format or `support.js` into the real codebase.** Instead, **recreate these designs in the target environment** using its established patterns and libraries.

> **Recommended target stack (no codebase exists yet):** React + TypeScript + Vite, plain CSS Modules or Tailwind. The design is component-friendly and the data is already modeled as plain objects (see **State Management / Data Model**). A static site (Next.js / Astro) works equally well since content is markdown-shaped.

To open the prototype: open `Project Page.dc.html` in a browser (it loads the sibling `support.js` and `image-slot.js`). The wireframe files show the exploration that led here.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are specified below and should be recreated faithfully. Exact hex/px values are given in **Design Tokens**.

---

## Screens / Views

### 1. The IDE Shell (persistent chrome around every page)
Full-viewport (`100vh`), dark, monospace. Horizontal flex of three regions; the third is a vertical flex.

```
┌────┬──────────────┬───────────────────────────────────────────┐
│ AB │  FILE TREE   │  TAB BAR  ························· toggle  │
│ 48 │   236px      ├───────────────────────────────────────────┤
│ px │              │  BODY (source pane | preview pane + rail)  │
│    │              ├───────────────────────────────────────────┤
│    │              │  TERMINAL PANEL (toggleable, 198px)        │
│    │              ├───────────────────────────────────────────┤
│    │              │  STATUS BAR (28px)                         │
└────┴──────────────┴───────────────────────────────────────────┘
```

**Activity bar** — width `48px`, bg `#121419`, right border `1px #0d0f13`. Four icon tiles (`30×30`, radius `7px`). Active tile: bg `#23262d`, `2px` left border `#f5a97f`, icon `#f5a97f`; inactive icon `#565d6b`. Last tile pinned to bottom (`margin-top:auto`). Icons used as glyphs: ⌘ ⊞ ⌥ ⚙ (replace with real icons — e.g. Lucide — in production).

**File tree** — width `236px`, bg `#181b21`, right border `1px #0d0f13`. Header label `EXPLORER — YOURNAME.DEV`, `10px`, letter-spacing `.14em`, color `#565d6b`, padding `15px 16px 10px`. Scrollable row list of files and folders: `about.md`, `projects/` (→ `project-aurora.md`, `project-ledger.md`, `project-atlas.md`), `ux-research/` (draft leaves), `music/` (→ `nocturne-in-blue.md`, `tidewater.md`, `signal-lost.md` — each tinted purple `#cba6f7`), `resume.pdf`, `contact.md`. Footer pinned bottom: `7px` green dot `#5ba85f` + "open to work", `11px`, `#565d6b`, top border `1px #0d0f13`.
- **File row**: flex, gap `8px`, padding `5px 7px` (+ `depth*16px` left indent), radius `6px`, font `12.5px`. A `12px` caret spacer, an `8×10px` rounded-`2px` file-type "dot", then the filename (ellipsis-truncated). Default text `#8b93a1`, dot `#555b66`. `resume.pdf` dot is `#e0655b`. **Active file**: text `#e8ebf0`, bg `#262b33`, `box-shadow: inset 2px 0 0 #f5a97f`, dot `#f5a97f`.
- **Folder row**: caret `▸` (closed) / `▾` (open) at `10px` `#565d6b`; label `#aab1bd`. Click toggles expand/collapse.
- **Folder "PAGE →" pill** (only on `projects/` and `music/`, which have an associated overview page): a right-aligned uppercase pill — `8.5px/700`, `.08em`, radius `20px`, padding `1px 6px 1px 8px`, `marginLeft:auto`. Default: transparent, `1px` border + text in the folder's accent (`#f5a97f` for projects, `#cba6f7` for music). Clicking it opens that folder's overview page **without toggling the tree** (it stops propagation). When that overview page is the active doc, the pill goes **solid** (filled accent, `#1a1d23` text) and the whole folder row takes the active treatment (text `#e8ebf0`, bg `#262b33`, `inset 2px 0 0 <accent>`). This makes it discoverable that the folder is itself a navigable index, not just a disclosure triangle.

**Tab bar** — height `40px`, bg `#121419`, bottom border `1px #0d0f13`, space-between.
- Active tab (left): padding `0 16px`, bg `#1e2128`, text `#e8ebf0` `12.5px`, **top border `2px #f5a97f`**, right border `1px #0d0f13`. Contains `8×10` accent dot, filename, and a `×` close glyph (`#565d6b`, `14px`).
- View toggle (right): a segmented control — container bg `#23262d`, border `1px #343a44`, radius `8px`, padding `3px`, gap `3px`. Buttons: `4px 11px`, radius `6px`, `11.5px`. **Active button**: bg `#f5a97f`, text `#1a1d23`, weight `600`. Inactive: transparent, text `#7b828f`. Labels: `</> Source`, `Split`, `Preview`.

**Terminal panel** (see Interactions) — height `198px`, bg `#15171c`, top border `1px #0d0f13`. Header row `30px`: `TERMINAL` label (`10.5px`, letter-spacing `.1em`, `#cdd2da`, with `inset 0 -1px 0 #f5a97f` underline), plus right-aligned `clear` and `⌄` (collapse) controls in `#7b828f`. Body: scrollable, padding `11px 15px`, font `13px`, line-height `1.65`.

**Status bar** — height `28px`, bg `#15171c`, top border `1px #0d0f13`, font `11px`, color `#7b828f`, gap `16px`, padding `0 14px`. Left→right: `⎇ main` (branch icon `#f5a97f`, text `#cdd2da`), active filename, `markdown`, then right-aligned: `▸_ terminal` toggle (`#9aa1ad`, clickable), `UTF-8`, and `type 'help'` (`#565d6b`).

### 2. Project Case Study (Preview view — the locked design)
Body = horizontal flex: **content scroll column** (`flex:1`, `overflow-y:auto`, `position:relative`, id `pp-scroll`) + **outline rail** (`248px`).

**Content column** — inner wrapper `max-width:720px`, centered (`margin:0 auto`), padding `34px 40px 90px`, bg `#1e2128`.
- **Back link**: `‹ projects/`, `#f5a97f`, `12px`, margin-bottom `16px` (navigates to projects index).
- **H1 title**: `34px`, weight `700`, letter-spacing `-.02em`, color `#f4f6f9`, monospace.
- **Tagline**: `14.5px`, line-height `1.6`, `#9aa1ad`, max-width `580px`, margin `12px 0 22px`.
- **Hero image**: full-width slot, height `300px`, wrapper radius `12px`, border `1px #343a44`, bg `#23262d`, margin-bottom `34px`. (User-fillable — see Assets.)
- **Sections** (each `margin-bottom:38px`, `scroll-margin-top:20px`, `data-section="<id>"`):
  - **Section heading**: a `6×16px` radius-`2px` accent bar `#f5a97f` + a `17px`/`700` `#f4f6f9` label, gap `10px`, margin-bottom `14px`.
  - **Body paragraphs**: `14px`, line-height `1.75`, color `#b4bcc8`, max-width `600px`, margin-bottom `14px`.
  - Section order + ids: `overview` "Overview", `problem` "The problem", `research` "Research", `design` "Design & build", `outcome` "Outcome", `gallery` "Gallery".
  - **Problem** adds a 2-col grid (gap `14px`) of before/after image slots (`190px` tall) each with an `11.5px` `#5b6270` caption.
  - **Research** adds a **pull-quote**: `border-left:3px solid #f5a97f`, padding `6px 0 6px 18px`, max-width `560px`; quote text `16px` italic `#d6dbe3` line-height `1.55`; attribution `12px` `#6b7280` prefixed `— `.
  - **Design & build** adds one wide image slot (`300px` tall).
  - **Outcome**: 3-col grid (gap `12px`) of stat cards — border `1px #2a2f38`, radius `11px`, padding `16px`, bg `#23262d`; stat `23px`/`700` `#f5a97f` (-.01em); label `12px` `#9aa1ad` line-height `1.4` margin-top `8px`.
  - **Gallery**: 3-col grid of `150px` image slots, each with an `11.5px` `#5b6270` caption.

**Outline rail** — width `248px`, bg `#191c22`, left border `1px #0d0f13`, padding `26px 18px`, scrollable.
- **"ON THIS PAGE"** label: `10px`, letter-spacing `.13em`, `#565d6b`, margin-bottom `14px`.
- **TOC items** (one per section): `12.5px`, padding `6px 0 6px 11px`, `margin-left:-11px`, clickable. Inactive `#7b828f`; **active** `#f5a97f`, weight `600`, `box-shadow: inset 2px 0 0 #f5a97f`. Updated by scroll-spy + click (smooth-scroll).
- Divider: `1px #2a2f38`, margins `20px 0`.
- **"DETAILS"** card: label same style as above. Four stacked fields (gap `16px`): `ROLE`, `TIMELINE`, `PLATFORM`, `TOOLS` — each a `10px` letter-spaced `.06em` `#5b6270` label + a `12.5px` `#cdd2da` value (line-height `1.4`). Last item: a `12.5px` `#f5a97f` "Live site ↗" link.

### 3. Source view & Split view
- **Source pane**: bg `#1b1e24`, scrollable, inner padding `22px 26px`, max-width `760px`. Renders the case study **as raw markdown** — line by line, `13px` monospace, line-height `1.5`, `white-space:pre-wrap`. Per-line syntax tint: frontmatter `---` delimiters `#565d6b`; frontmatter `key:` lines `#9aa1ad`; `#`/`##` headings `#f5a97f`; `>` quote/tagline lines `#5ba85f`; body text `#aab1bd`.
- **Split view**: source pane (`50%`, right border `1px #0d0f13`) + preview pane (`50%`). The outline rail is **hidden** in split (and source) view — only shown in Preview.
- **Code view**: source pane only, full width.

### 4. Research writeup (`type: 'research'` — e.g. `project-atlas.md`)
Same outline-rail layout as the case study, but a research-report content model. Content column `max-width:720px`. H1 `32px`, subtitle `14.5px` `#9aa1ad` (max-width `600px`). Breadcrumb `~/ux-research`, `12px` `#565d6b`. Sections (each `data-section`, `margin-bottom:38px`):
- **`background`** "Background", **`method`** "Method" — body paragraphs (`14px/1.75` `#b4bcc8`, max-width `600px`).
- **`findings`** "Key findings" — a stack (gap `12px`) of numbered finding cards: border `1px #2a2f38`, radius `12px`, bg `#23262d`, padding `16px 18px`; a tabular-nums `#f5a97f` `14px/700` number + a `14px/600` `#f4f6f9` title and `13px` `#9aa1ad` body.
- **`verbatims`** "VERBATIMS" (`10px` `.12em` `#565d6b` label) — pull-quotes: `border-left:3px solid #f5a97f`, padding `4px 0 4px 18px`; `15px` italic `#d6dbe3` quote + `12px` `#6b7280` `— ` attribution.
- **`recommendations`** "Recommendations" — `→`-bulleted (`#5ba85f`) `14px` `#cdd2da` rows.
- **`impact`** "Impact" — the same 3-col stat-card grid as the case study's Outcome.
The outline rail's TOC + DETAILS card behave identically (sections: Background, Method, Key findings, Verbatims, Recommendations, Impact).

### 5. Projects index (`projects/` folder → `type: 'index'`)
Opened by clicking the `projects/` folder (not just expanding it). Content column `max-width:760px`, padding `34px 40px 90px`. **Outline rail is hidden** for this view.
- Breadcrumb `~/projects` (`12px` `#565d6b`); H1 "Projects" `30px/700` with an inline `13px` `#565d6b` `“N case studies”` count; intro paragraph `14px` `#9aa1ad` (max-width `540px`).
- **Filter tabs**: a wrapping flex row (gap `8px`) of discipline pills (All / Engineering / Design / Research). Active pill: bg `#f5a97f`, text `#1a1d23`; inactive: bg `#23262d`, border `1px #343a44`, text `#9aa1ad`. Clicking filters the grid by `tags`.
- **Project cards**: a 2-col grid (gap `16px`). Each card (border `1px #2a2f38`, radius `13px`, bg `#23262d`, clickable) = a `152px` cover **thumbnail image slot** (id `<file-slug>-thumb`) over a `16px 17px 18px` body: a `kind` badge (the amber pill, `10.5px`) + `year` (`11.5px` `#565d6b`), an `18px/700` title, a `12.5px` `#9aa1ad` blurb, and a `12px` `#f5a97f` “Read case study →”. Click opens that case study.

### 6. Music index — “Compositions” (`music/` folder → `type: 'music'`)
This is the **music page**. Opened by clicking the `music/` folder. Content column `max-width:720px`. **Outline rail hidden.** This view introduces the **purple accent `#cba6f7`** (used for all music/track UI in place of the amber `#f5a97f`).
- Breadcrumb `~/music`; H1 "Compositions" `30px/700` + inline `13px` `#565d6b` “selected pieces”; intro paragraph `14px` `#9aa1ad` (max-width `560px`).
- **Track rows**: a vertical stack (gap `12px`). Each row (border `1px #2a2f38`, radius `13px`, bg `#23262d`, padding `14px 16px`, clickable → opens track detail) contains:
  - a `38px` circular **play/pause button** (`▶` / `❚❚`); when that track is playing, border + glyph go purple `#cba6f7` on `rgba(203,166,247,.15)`, else `#3a3344` on `#1e2128`. Clicking the button toggles playback **without** navigating.
  - a `148px` title block: title (`#e8ebf0`, purple when playing) + a `11.5px` `#7b828f` meta line `“genre · key · duration”`.
  - a flexible **waveform**: ~44 thin bars (`2px` min-width, radius `2px`), heights from a deterministic per-key pseudo-random function; bars tint purple `#cba6f7` when playing, else `#3a3344`.

### 7. Track detail (`type: 'track'` — e.g. `nocturne-in-blue.md`)
Opened from a music row or the tree leaves under `music/`. Content column `max-width:640px`. **Outline rail hidden.** Fully purple-accented.
- Back link `‹ music/` (`12px` `#cba6f7`).
- **Header**: a `52px` circular play/pause button + H1 title (`28px/700`) and a `12.5px` `#cba6f7` `“genre · year”` line.
- **Big waveform**: ~80 bars, `64px` tall, gap `3px`; below it a `0:00` / duration row (`11px` `#565d6b`).
- **Meta grid**: 3 cols (KEY / DURATION / YEAR), framed top+bottom by `1px #2a2f38`; `9.5px` `.1em` `#5b6270` labels + `12.5px` `#cdd2da` values.
- **Description** paragraphs (`14px/1.75` `#b4bcc8`).
- **INSTRUMENTATION** (`10px` `.12em` `#565d6b` label): wrapping chips — `5px 11px`, radius `7px`, bg `#23262d`, border `1px #343a44`, `12px` `#cdd2da`.
- **Links**: wrapping pill buttons — border `1px #4a3b5c`, bg `rgba(203,166,247,.1)`, `#cba6f7` `12.5px`, trailing `↗` (e.g. "Listen on …", "Score (PDF)").
Sample tracks: **Nocturne in Blue** (solo piano, D♭ minor, 4:12), **Tidewater** (string quartet, A major, 6:38), **Signal Lost** (electronic, 3:55). Waveforms are generated, not real audio — wire the play buttons to a real `<audio>` element / streaming embed in production.

### 8. about.md (lighter doc — refine in next pass)
Centered `max-width:600px`, padding `48px 40px 90px`. Header: a circular `78px` avatar image slot + name (`27px`/`700` `#f4f6f9`) and role line (`13px` `#f5a97f`). Body paragraphs `14.5px` line-height `1.8` `#b4bcc8`. A "CURRENTLY" card (border `1px #2a2f38`, radius `12px`, bg `#23262d`, padding `18px 20px`) with `▹`-bulleted (`#5ba85f`) `13.5px` `#cdd2da` rows.

### 9. contact.md (lighter doc — refine in next pass)
Centered `max-width:560px`. H1 "Get in touch" + intro `#9aa1ad`. Rows: flex cards (border `1px #2a2f38`, radius `11px`, bg `#23262d`, padding `15px 18px`, margin-bottom `11px`) — a `64px` `#f5a97f` `12px` label, a `14px` `#e8ebf0` value, and a trailing action glyph (`copy` / `↗` / `↓`) in `#565d6b`.

### Logo / brand variant (`Project Page (Logo).dc.html`)
An alternative of the case-study page with **three logo drop-slots** added in the spots where a personal-brand mark belongs in an IDE chrome. Everything else is identical to the base page. Each slot is a square `image-slot` (drag-drop / click-to-browse, persisted) and, while empty, renders as a clean **dashed orange drop-box** (the `image-slot` empty-state glyph is suppressed because the slots are too small for it — see note below).

1. **Activity-bar identity mark** — replaces the top `⌘` tile. `30×30`, radius `7px`, bg `#23262d`, `2px` left border `#f5a97f`. This is the app-icon position (à la a VS Code workspace icon). Use a **square / transparent-PNG** mark.
2. **Sidebar brand lockup** — a header row above the `EXPLORER` label: a `30×30` radius-`6px` mark slot + a text wordmark (`yourname` `#e8ebf0` / `.dev` `#f5a97f`, `13px`/`700`) with a `9px` `.13em` `#565d6b` `PORTFOLIO` kicker. Row padding `14px 14px 13px`, bottom border `1px #0d0f13`. (The original `EXPLORER — YOURNAME.DEV` label is split: the workspace name moves into this lockup and the label becomes just `EXPLORER`.)
3. **Contact sign-off mark** — at the bottom of `contact.md`, a business-card row (top border `1px #2a2f38`, margin-top `40px`): a `46×46` radius-`10px` mark slot + `Your Name` (`15px`/`700` `#e8ebf0`) and a `11.5px` `#565d6b` tagline.

**Implementation notes for production:**
- These are the same `image-slot` placeholders as the content images — in the real codebase, replace with a single `<Logo>` component (an `<img>`/inline-SVG) reused in all three spots, not three separate assets. A square mark covers slots 1–2; slot 3 can reuse the same mark.
- Slot ids: `logo-mark` (activity bar), `logo-sidebar` (sidebar), `logo-signoff` (contact).
- The empty-state suppression is a prototype-only hack (a `::part(empty){ color: transparent }` rule + a visible `::part(ring)` in `rgba(245,169,127,.5–.65)`); production just renders the logo directly, so none of this carries over.
- Pick **one** source of truth for the wordmark — either the text lockup shown here (easy to theme) or a wordmark image — don't ship both.

### 10. Draft / stub state (unwritten `ux-research/` leaf files)
Centered empty-state: a small `54×64` "file" glyph (border `1px #343a44`, bg `#23262d`, folded corner, `MD` label in `#f5a97f`), the filename (`15px` `#cdd2da`), a pill badge "draft · coming in the next pass" (bg `#2a2520`, border `1px #4a3b2c`, text `#f5a97f`, radius `20px`, `11px`), and a `12.5px` `#6b7280` hint. Intentional — not an error state.

---

## Interactions & Behavior
- **File tree**: clicking a folder's **caret/label** toggles its expand state (and, for `projects/`/`music/`, also opens that folder's overview page on first expand); clicking the folder's **"PAGE →" pill** opens the overview page directly without changing the expand state. Clicking a file opens it (sets active file, switches to Preview, scrolls content to top, resets active section to first). `resume.pdf` should ultimately trigger a PDF download.
- **View toggle**: `Source` / `Split` / `Preview` switches the body layout (see views above). Default = Preview.
- **Outline-rail scroll-spy**: on content scroll, the active section = the last `[data-section]` whose `offsetTop <= scrollTop + 90`. The matching TOC item highlights. Clicking a TOC item smooth-scrolls the content container to that section's `offsetTop - 12` and sets it active.
- **Terminal** (toggle via status-bar `▸_ terminal` or the panel's `⌄`): a single-line input with a `~/portfolio %` prompt (prompt path `#5ba85f`, `%` `#f5a97f`). On **Enter**, the typed command echoes as a prompt line and output is appended. **↑/↓** walk command history. Commands:
  - `help` — lists commands.
  - `ls` — lists root files; `projects` — lists the three project files.
  - `open <name>` (aliases `cat`, `vim`, `cd`) — fuzzy-resolves a name (e.g. `open atlas`) and opens that file.
  - `about`, `contact` — open those docs; `research` — lists research drafts; `resume` — hook to CV; `whoami` — identity line; `theme` — placeholder (dark only); `clear` — empties the panel.
  - Unknown input → `zsh: command not found: <x> — type 'help'` in `#e0655b`.
  - Output line colors: normal `#9aa1ad`/`#cdd2da`, hints `#565d6b`, errors `#e0655b`.
- **Image slots**: drag-and-drop (or click-to-browse) image placeholders the user fills; see Assets. Hover shows Replace/Remove; double-click (cover fit) enters a reframe/crop mode.
- **Hover/active states**: tree rows, TOC items, tab toggle, terminal controls, and contact rows are all pointer-cursor interactive; give them subtle hover bg/ì color shifts consistent with the active-state colors above (not separately specified in the mock — use `#23262d`/`#262b33` washes).

## State Management
Single-screen app state (all client-side):
- `activeKey: string` — open file (e.g. `'project-aurora.md'`).
- `view: 'preview' | 'split' | 'code'` — default `'preview'`.
- `activeSection: string` — current TOC section id; driven by scroll-spy and TOC clicks.
- `open: Record<folderName, boolean>` — file-tree folder expansion (`projects`, `ux-research`, `music`).
- `playing: string | null` — key of the currently-playing track (music index / track detail).
- `termOpen: boolean`, `termInput: string`, `termLines: {isCmd, text, color?}[]`, `history: string[]`, `histIdx: number`.

### Data Model (already structured — lift directly)
A `docs` map keyed by filename. Each **project**:
```ts
{
  type: 'project',
  title, tagline, role, timeline, tools, platform, link,   // strings
  overview: string[], problem: string[], research: string[], design: string[],
  quote: { text: string, who: string },
  outcome: { stat: string, label: string }[],   // 3 items
  gallery: string[],                              // 3 captions
}
```
`about` = `{ type:'about', paras: string[], now: string[] }`. `contact` = `{ type:'contact', rows: {label,value,action}[] }`. A **research** doc = `{ type:'research', title, subtitle, background: string[], method: string[], findings: {num,title,text}[], verbatims: {text,who}[], recommendations: string[], impact: {stat,label}[] }`. A **track** doc = `{ type:'track', title, year, musKey, duration, genre, instruments: string[], desc: string[], links: string[] }`. The `projects/` and `music/` **folder keys** resolve to synthetic `{type:'index'}` / `{type:'music'}` documents (the index/Compositions pages); their card/row lists are derived by `projectList()` / `musicList()`. Unwritten files fall through to a `stub`. Sample content: three projects — **Aurora** (design system / eng), **Ledger** (product eng), **Atlas** (UX research, rendered as a `research` writeup) — and three tracks (above), one tuned to each target audience. All copy is realistic **placeholder** — replace with real content.

**Playback state**: `playing: string | null` holds the key of the currently-playing track (drives the purple play-button + waveform highlight on both the music index and track detail). Only one track plays at a time.

## Design Tokens

**Colors**
| Role | Hex |
|---|---|
| Accent (primary) | `#f5a97f` |
| Editor background | `#1e2128` |
| Activity/tab bar bg | `#121419` |
| Terminal / status bg | `#15171c` |
| File-tree bg | `#181b21` |
| Outline-rail bg | `#191c22` |
| Source-pane bg | `#1b1e24` |
| Panel / card bg | `#23262d` |
| Active tree-row bg | `#262b33` |
| Darkest border | `#0d0f13` |
| Subtle border | `#343a44` |
| Card border | `#2a2f38` |
| Heading text | `#f4f6f9` / `#e8ebf0` |
| Body text | `#b4bcc8` / `#aab1bd` |
| Muted text | `#9aa1ad` |
| Dim text | `#7b828f` |
| Dimmest / labels | `#565d6b` / `#5b6270` |
| Success / prompt green | `#5ba85f` |
| Music / track accent (purple) | `#cba6f7` |
| Error / red | `#e0655b` |
| Gutter | `#454b55` |

**Typography** — Font: `ui-monospace, SFMono-Regular, Menlo, monospace` throughout. (The handwritten labels in the *wireframe* files use `Caveat` — not used in the hi-fi page.) Scale: H1 `34px/700/-.02em`; section heading `17px/700`; tagline `14.5px`; body `14px/1.75`; pull-quote `16px italic`; outcome stat `23px/700`; meta value `12.5px`; TOC / tree / tab `12.5px`; terminal `13px/1.65`; status / footer `11px`; section labels `10px` letter-spacing `.06–.14em`.

**Spacing / layout** — Activity bar `48px`; file tree `236px`; outline rail `248px`; tab bar `40px`; terminal panel `198px`; status bar `28px`. Content column `max-width:720px`, padding `34px 40px 90px`; section gap `38px`. Source pane `max-width:760px`.

**Radius** — tiles/rows `6–7px`; cards/images `10–12px`; stat cards `11px`; pills/badges `20px`; file-type dots `2px`.

**Effects** — active-tab top border `2px #f5a97f`; active tree-row / TOC `box-shadow: inset 2px 0 0 #f5a97f`; section accent bar `6×16px` radius `2px`; smooth-scroll on TOC nav.

## Assets
- **`image-slot.js`** — the user-fillable image placeholder web component used for the hero, before/after, design, gallery, and avatar slots. It persists dropped images to a JSON sidecar. **In the real codebase, replace this with normal `<img>` tags / your asset pipeline / a CMS** — it exists only so the prototype is fillable. Each slot has a stable `id` derived from `"<file-slug>-<role>"` (e.g. `project-aurora-hero`, `project-atlas-g0`).
- **No raster images ship with this design** — every image is an empty slot for the user's real screenshots.
- **Fonts**: monospace is system (`ui-monospace`). No web font is required for the hi-fi page. (`Caveat` via Google Fonts appears only in the wireframe references.)
- **Icons**: currently Unicode glyphs (⌘ ⊞ ⌥ ⚙ ⎇ ▸ ▾ ‹ ↗ ↓ ×). Swap for a real icon set (Lucide/Phosphor) in production.

## Files
In this bundle:
- **`Project Page.dc.html`** — the high-fidelity case-study page (the primary reference). Logic (data model, terminal, scroll-spy, view toggle, tree) is in the `<script>` "Component" class near the bottom; markup/styles are inline above it.
- **`Project Page (Logo).dc.html`** — the **logo / brand variant** (identical to the above plus the three logo drop-slots described in *Logo / brand variant* above). Use whichever variant matches whether the portfolio has a personal-brand mark.
- **`image-slot.js`** — image-slot web component (reference only; do not ship).
- **`support.js`** — the prototyping runtime that renders `.dc.html`. **Reference/preview only — do not port.**
- **`Project Page Wireframes.dc.html`** — the 3 low-fi layout explorations for this page (Split / Reading mode / Outline rail). Shows why outline-rail was chosen.
- **`Portfolio Wireframes.dc.html`** — the 6 site-shell direction explorations (the chosen direction is "IDE + Preview").

To preview: open `Project Page.dc.html` in a browser. To build: recreate it per this README in your chosen framework.
