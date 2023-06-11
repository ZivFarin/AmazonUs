/**this page is for the landing page-the first page that a user will see */
import "./NewLanding.scss";
import { Link } from "react-router-dom/cjs/react-router-dom";

function newLanding() {
  return (
    <div className="card-wrapper">
      <div className="content">
        <div className="welcome">Welcome to</div>
        <br />
        <h1>AmazonUS</h1>
      </div>
      <div className="shade"></div>
      <div className="card__bg__image">
        <img
          alt=""
          src="http://media.futurebutterflies.net/houston-besomeone.jpg"
        />
      </div>
      <div className="about">
        <p>
          Welcome to AmzonUS! Our new and exotic website will help all Amazons
          users to buy only what you need.
          <br />
          So what do you need to do?
          <br />
          Just Signup, add your Amazons item URL and relax, We will do the rest
          &#128521;
        </p>
      </div>
      <div className="redirect">
        <Link to="/Login">Login</Link>
        <Link to="/signup">Create account</Link>
      </div>
    </div>
  );
}

export default newLanding;
