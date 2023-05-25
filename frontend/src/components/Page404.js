import React from "react";
import styles from "./Page404.module.css";

function Page404() {
  return (
    <section className={styles.page_404}>
      <div className={styles.four_zero_four_bg}>
        <div className={styles.container}>
          <div className={styles.contant_box_404}>
            <h1>404</h1>
            <h3>Look like you're lost</h3>
            <p>The page you are looking for is not available!</p>
            <a href="/Login" className={styles.link_404}>Go to Home</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page404;
