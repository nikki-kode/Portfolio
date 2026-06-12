export function fileColor(key: string): string {
  if (key.endsWith(".mp3") || key === "music/") return "#cba6f7";
  if (key === "resume.pdf") return "#e0655b";
  return "var(--accent)";
}
