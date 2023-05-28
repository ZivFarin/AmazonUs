import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import LogoutButton from "./components/Sing in and up/LogoutButton";
import CustomerMainPage from "./Pages/CustomerMainPage";
import GetInTouchPage from "./Pages/GetInTouchPage";
import AddItemURLPage from "./Pages/AddItemURLPage";
import Navbar from "./components/Customer/Navbar";
import NavbarRegionalAdmin from "./components/Regional admin/NavbarRegionalAdmin";
import GANavBar from "./components/Genreal Admin/GANavBar";
import SignupPage from "./Pages/SignupPage";
import LandingPagePage from "./Pages/LandingPagePage";
import AboutUsPage from "./Pages/AboutUsPage";
import RegionalAdminMainPage from "./Pages/RegionalAdminMainPage";
import BanUserPage from "./Pages/BanUserPage";
import CartInfoPage from "./Pages/CartInfoPage";
import GeneralAdminPage from "./Pages/GeneralAdminMainPage";
import CollectItemPage from "./Pages/CollectItemPage";
import Page404Page from "./Pages/Page404Page";
import UnBanUserGAPage from "./Pages/UnBanUserGAPage";
import YouAreBannedPage from "./Pages/YouAreBannedPage";

function App() {
  // Check if user is authenticated

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <BrowserRouter>
      <div>
        {isLoggedIn ? <LogoutButton /> : null}
        {isLoggedIn === "Customer" ? <Navbar /> : null}
        {isLoggedIn === "Regional" ? <NavbarRegionalAdmin /> : null}
        {isLoggedIn === "General" ? <GANavBar /> : null}
        <main>
          <Switch>
            <Route path="/" exact component={LandingPagePage} />
            <Route path="/Login" exact component={LoginPage} />
            {isLoggedIn === "BannedCustomer" && (
                <Route
                  path="/YouAreBanned"
                  exact
                  component={YouAreBannedPage}
                />
            )}
            {isLoggedIn === "Customer" && (
              <>
                <Route
                  path="/customerMain"
                  exact
                  component={CustomerMainPage}
                />
                <Route path="/addItem" exact component={AddItemURLPage} />
                <Route path="/getInTouch" exact component={GetInTouchPage} />
                <Route path="/Signup" exact component={SignupPage} />
                <Route path="/AboutUs" exact component={AboutUsPage} />
              </>
            )}
            {isLoggedIn === "Regional" && (
              <>
                <Route
                  path="/RegionalAdminMain"
                  exact
                  component={RegionalAdminMainPage}
                />
                <Route path="/BanUser" exact component={BanUserPage} />
                <Route path="/CartInfo" exact component={CartInfoPage} />
                <Route path="/CollectItem" exact component={CollectItemPage} />
              </>
            )}
            {isLoggedIn === "General" && (
              <>
                <Route
                  path="/GeneralAdminMain"
                  exact
                  component={GeneralAdminPage}
                />
                <Route path="/UnBanUserGA" exact component={UnBanUserGAPage} />
              </>
            )}
            {isLoggedIn !== null && <Route path="/*" exact component={Page404Page} />}
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
