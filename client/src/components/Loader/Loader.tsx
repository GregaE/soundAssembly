import styles from "./Loader.module.scss";

export default function Loader(){

  return (
    <div className={styles.container}>
      <span className={styles.record} />
      <p>
        Fetching followed artists from Spotify
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </p>
    </div>
  );
}