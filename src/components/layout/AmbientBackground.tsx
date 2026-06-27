import styles from "./AmbientBackground.module.css";

export function AmbientBackground() {
  return (
    <div className={styles.ambient} aria-hidden>
      <div className={styles.noise} />
      <div className={`${styles.arc} ${styles.arcLeft}`} />
      <div className={`${styles.arc} ${styles.arcRight}`} />
      <div className={styles.vignette} />
    </div>
  );
}
