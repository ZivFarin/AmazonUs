import styles from "./GetInTouch.module.css";

function YouAreBanned() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>unfortunately you got ban</h2>
      <p className={styles.text}>
        E-mail us to: AUSupport@gmail.com
        <br />
        or Phone us at: +972505000000
      </p>
      <p className={styles.text}>
        <br />
        AmazonUs team
      </p>
    </div>
  );
}

export default YouAreBanned;
