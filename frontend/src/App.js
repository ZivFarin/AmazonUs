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
import BanUserPage from "./Pages/BanUserPage";
import CartInfoPage from "./Pages/CartInfoPage";
import GeneralAdminPage from "./Pages/GeneralAdminMainPage";
import CollectItemPage from "./Pages/CollectItemPage";
import Page404Page from "./Pages/Page404Page";

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
            <Route path="/RegionalAdminMain" exact component={RegionalAdminMainPage} />
            <Route path="/BanUser" exact component={BanUserPage} />
            <Route path="/CartInfo" exact component={CartInfoPage} />
            <Route path="/CollectItem" exact component={CollectItemPage}/>
            <Route path="/GeneralAdminMain" exact component={GeneralAdminPage}/>
            <Route path="/*" exact component={Page404Page}/>




          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
