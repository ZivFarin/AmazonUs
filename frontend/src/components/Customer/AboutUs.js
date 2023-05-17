import styles from './AboutUs.module.css';

function AboutUs() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>So...who are we?</h2>
      <div className={styles.flexContainer}>
        <p className={styles.paragraph}>
          Has it ever happened to you that you wanted to order one item from
          Amazon and, in addition, you ordered many other items that you didn't
          need just to qualify for free shipping? Well, this era is over. Allow me
          to introduce you to AmazonUs.
        </p>
        <p className={styles.paragraph}>
          When you add a new item, we create a cart that will include your item(s)
          along with items from other users. This ensures that the total price
          qualifies for free shipping, allowing you to avoid fines. Simply keep an
          eye on your email, as we will provide updates throughout the process.
        </p>
        <p className={styles.paragraph}>
          Login &rarr; add the items URL &rarr; <br />
          wait for us to find a match &rarr; <br />
          pay (only on your item) &rarr; <br />
          wait for the item to arrive &rarr; <br />
          tell your friend about us
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
