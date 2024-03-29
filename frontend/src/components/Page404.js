/**this page is for handeling the situation when a user enter an url that is not recognize in our webpage */
import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Page404.module.css";

function Page404() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <section className={styles.page_404}>
      <div className={styles.four_zero_four_bg}>
        <div className={styles.container}>
          <div className={styles.contant_box_404}>
            <h1>404</h1>
            <h3>Look like you're lost</h3>
            <h3>The page you are looking for is not available!</h3>
            <button onClick={handleGoBack} className={styles.link_404}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page404;