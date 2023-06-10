/**Imports */
import styles from "./GetInTouch.module.css";
/**This is the get in touch, here we render all information pretty self explanatory*/
function GetInTouch() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Use these to contact us:</h2>
      <p className={styles.text}>
        E-mail us to: AmazonUsILService@gmail.com
        <br />
        Phone us at: +972505000000
      </p>
      <p className={styles.text}>
        Always at your service,
        <br />
        AmazonUs team
      </p>
    </div>
  );
}

export default GetInTouch;
