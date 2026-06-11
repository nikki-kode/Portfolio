import { getDoc } from "@/data/docs";
import type { View } from "@/hooks/useIDEState";
import AboutView from "./AboutView";
import ContactView from "./ContactView";
import styles from "./ContentArea.module.css";

type Props = {
  activeKey: string;
  view: View;
  activeSection: string;
  setSection: (id: string) => void;
};

function buildSourceLines(doc: ReturnType<typeof getDoc>) {
  type Line = { text: string; color: string };
  const lines: Line[] = [];
  const c = {
    dim: "#565d6b", fm: "#9aa1ad", head: "#f5a97f",
    quote: "#5ba85f", text: "#aab1bd",
  };
  const add = (text: string, color: string) => lines.push({ text: text || " ", color });

  if (doc.type === "project") {
    add("---", c.dim);
    add(`title:    ${doc.title}`, c.fm);
    add(`role:     ${doc.role}`, c.fm);
    add(`timeline: ${doc.timeline}`, c.fm);
    add(`tools:    ${doc.tools}`, c.fm);
    add("---", c.dim);
    add("", c.text);
    add(`# ${doc.title}`, c.head);
    add(`> ${doc.tagline}`, c.quote);
    add("", c.text);
    ([
      ["Overview", doc.overview],
      ["The problem", doc.problem],
      ["Research", doc.research],
      ["Design & build", doc.design],
    ] as [string, string[]][]).forEach(([heading, paras]) => {
      add(`## ${heading}`, c.head);
      paras.forEach((p) => add(p, c.text));
      if (heading === "Research") add(`> "${doc.quote.text}"  — ${doc.quote.who}`, c.quote);
      add("", c.text);
    });
    add("## Outcome", c.head);
    doc.outcome.forEach((o) => add(`- ${o.stat} — ${o.label}`, c.text));
  } else if (doc.type === "about") {
    add("# About", c.head);
    add("", c.text);
    doc.paras.forEach((p) => { add(p, c.text); add("", c.text); });
  } else if (doc.type === "contact") {
    add("# Contact", c.head);
    add("", c.text);
    doc.rows.forEach((r) => add(`${r.label}: ${r.value}`, c.fm));
  } else {
    add("# Draft", c.head);
    add("", c.text);
    add("coming in the next pass…", c.dim);
  }
  return lines;
}

export default function ContentArea({ activeKey, view, activeSection, setSection }: Props) {
  const doc = getDoc(activeKey);
  const showSource = view === "code" || view === "split";
  const showPreview = view === "preview" || view === "split";

  const sourceLines = showSource ? buildSourceLines(doc) : [];

  const sourcePaneClass = view === "split" ? styles.sourcePaneHalf : styles.sourcePaneFull;
  const previewPaneClass = view === "split" ? styles.previewPaneHalf : styles.previewPaneFull;

  return (
    <div className={styles.area}>
      {showSource && (
        <div className={sourcePaneClass}>
          <div className={styles.sourceInner}>
            {sourceLines.map((ln, i) => (
              <div key={i} className={styles.sourceLine} style={{ color: ln.color }}>
                {ln.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {showPreview && (
        <div className={previewPaneClass}>
          {doc.type === "about" && <AboutView doc={doc} />}
          {doc.type === "contact" && <ContactView doc={doc} />}
          {doc.type !== "about" && doc.type !== "contact" && (
            <div style={{ padding: "40px", color: "var(--text-dimmest)", fontSize: "13px" }}>
              {/* project / stub views — coming next */}
              {activeKey}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
