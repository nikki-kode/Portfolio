const UX_RESEARCH = new Set(["capstone.md", "ixdf.md", "usability-study.md"]);

export function promptPath(key: string): string {
  if (key === "home") return "~/portfolio";
  if (key.endsWith("/")) return `~/portfolio/${key.slice(0, -1)}`;
  if (key.endsWith(".mp3")) return `~/portfolio/music/${key}`;
  if (key.startsWith("project-")) return `~/portfolio/projects/${key}`;
  if (UX_RESEARCH.has(key)) return `~/portfolio/ux-research/${key}`;
  return `~/portfolio/${key}`;
}
