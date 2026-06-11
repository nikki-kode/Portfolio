import styles from "./StubView.module.css";

type Props = { filename: string };

export default function StubView({ filename }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.fileIcon}>
        <span className={styles.foldedCorner} />
        <span className={styles.fileLabel}>MD</span>
      </div>
      <div className={styles.filename}>{filename}</div>
      <div className={styles.badge}>draft · coming soon</div>
      <p className={styles.hint}>This section is mapped out but not written yet.</p>
    </div>
  );
}
