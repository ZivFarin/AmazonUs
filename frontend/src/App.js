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

const pathArray = [
  "/",
  "/Login",
  "/YouAreBanned",
  "/CustomerMain",
  "/addItem",
  "/getInTouch",
  "/signup",
  "/AboutUs",
  "/RegionalAdminMain",
  "/BanUser",
  "/CartInfo",
  "/CollectItem",
  "/GeneralAdminMain",
  "/UnBanUserGA",
  "/404",
];
function App() {
  // Check if user is authenticated

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <BrowserRouter>
      <div>
        {isLoggedIn === "Customer" ? (
          <>
            <LogoutButton /> <Navbar />
          </>
        ) : null}
        {isLoggedIn === "Regional" ? (
          <>
            <LogoutButton /> <NavbarRegionalAdmin />
          </>
        ) : null}
        {isLoggedIn === "General" ? (
          <>
            <LogoutButton /> <GANavBar />
          </>
        ) : null}
          {isLoggedIn === "BannedCustomer" ? (
          <>
            <LogoutButton />
          </>
        ) : null}
        <main>
          <Switch>
            <Route path={pathArray[0]} exact component={LandingPagePage} />
            <Route path={pathArray[1]} exact component={LoginPage} />
            <Route path={pathArray[14]} exact component={Page404Page} />
            <Route path={pathArray[6]} exact component={SignupPage} />
            {isLoggedIn === "BannedCustomer" && (
              <Route path={pathArray[2]} exact component={YouAreBannedPage} />
            )}
            {isLoggedIn === "Customer" && (
              <>
                <Route path={pathArray[3]} exact component={CustomerMainPage} />
                <Route path={pathArray[4]} exact component={AddItemURLPage} />
                <Route path={pathArray[5]} exact component={GetInTouchPage} />
                <Route path={pathArray[7]} exact component={AboutUsPage} />
              </>
            )}
            {isLoggedIn === "Regional" && (
              <>
                <Route
                  path={pathArray[8]}
                  exact
                  component={RegionalAdminMainPage}
                />
                <Route path={pathArray[9]} exact component={BanUserPage} />
                <Route path={pathArray[10]} exact component={CartInfoPage} />
                <Route path={pathArray[11]} exact component={CollectItemPage} />
              </>
            )}
            {isLoggedIn === "General" && (
              <>
                <Route
                  path={pathArray[12]}
                  exact
                  component={GeneralAdminPage}
                />
                <Route path={pathArray[13]} exact component={UnBanUserGAPage} />
              </>
            )}
            {!pathArray.includes(window.location.pathname) &&
              window.location.replace("/404")}
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
