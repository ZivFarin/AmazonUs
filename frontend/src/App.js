import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import LogoutButton from "./components/Sing in and up/LogoutButton";
import CustomerMainPage from "./Pages/CustomerMainPage";
import GetInTouchPage from "./Pages/GetInTouchPage";
import AddItemURLPage from "./Pages/AddItemURLPage";
import Navbar from "./components/Customer/Navbar";
import SignupPage from "./Pages/SignupPage";
import LandingPagePage from "./Pages/LandingPagePage";
import AboutUsPage from "./Pages/AboutUsPage";
import RegionalAdminMainPage from "./Pages/RegionalAdminMainPage";

function App() {
  // Check if user is authenticated
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <div>
        {isLoggedIn ? <LogoutButton /> : null}
        {isLoggedIn ? <Navbar /> : null}

        <main>
          <Switch>
            <Route path="/" exact component={LandingPagePage} />
            <Route path="/Login" exact component={LoginPage} />
            <Route
              path="/customerMain"
              exact
              render={() => (isLoggedIn ? <CustomerMainPage /> : null)}
            />
            <Route
              path="/addItem"
              exact
              render={() => (isLoggedIn ? <AddItemURLPage /> : null)}
            />

            <Route path="/getInTouch" exact component={GetInTouchPage} />
            <Route path="/Signup" exact component={SignupPage} />
            <Route path="/AboutUs" exact component={AboutUsPage} />
            <Route path="/GeneralAdminMain" exact component={RegionalAdminMainPage} />
            <Route path="/*" exact component={LandingPagePage} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
