import type { AboutDoc } from "@/data/docs";
import styles from "./AboutView.module.css";

type Props = { doc: AboutDoc };

export default function AboutView({ doc }: Props) {
  return (
    <div className={styles.scroll}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.avatar}>NK</div>
          <div className={styles.nameBlock}>
            <h1 className={styles.name}>Nikki Kode</h1>
            <span className={styles.role}>Software Engineer · UX Designer/Researcher · Musician</span>
          </div>
        </div>

        {doc.paras.map((p, i) => (
          <p key={i} className={styles.para}>{p}</p>
        ))}

        <div className={styles.currently}>
          <div className={styles.currentlyLabel}>CURRENTLY</div>
          {doc.now.map((item, i) => (
            <div key={i} className={styles.nowRow}>
              <span className={styles.bullet}>▹</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
