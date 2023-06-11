/**Imports*/
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import LogoutButton from "./components/Sign in and up/LogoutButton";
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

/**Path array in order to create an easier way for routing and cleaner code*/
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

/**The main component function*/
function App() {
  // Check if user is authenticated
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <BrowserRouter>
      <div>
        {/**Checking if the user is a customer then displaying navbar accordingly */}
        {isLoggedIn === "Customer" ? (
          <>
            <LogoutButton /> <Navbar />
          </>
        ) : null}
        {/**Checking if the user is a egional admin then displaying navbar accordingly */}
        {isLoggedIn === "Regional" ? (
          <>
            <LogoutButton /> <NavbarRegionalAdmin />
          </>
        ) : null}
        {/**Checking if the user is the general admin then displaying navbar accordingly */}
        {isLoggedIn === "General" ? (
          <>
            <LogoutButton /> <GANavBar />
          </>
        ) : null}
        {/**Checking if the user is a banned customer then displaying only the logout option accordingly */}
          {isLoggedIn === "BannedCustomer" ? (
          <>
            <LogoutButton />
          </>
        ) : null}
        <main>
          <Switch>
            {/**Routing pages that all users use*/}
            <Route path={pathArray[0]} exact component={LandingPagePage} />
            <Route path={pathArray[1]} exact component={LoginPage} />
            <Route path={pathArray[14]} exact component={Page404Page} />
            <Route path={pathArray[6]} exact component={SignupPage} />
             {/**Below we route pages that bannedusers use*/}
            {isLoggedIn === "BannedCustomer" && (
              <Route path={pathArray[2]} exact component={YouAreBannedPage} />
            )}
            {/**Below we route pages that customers use*/}
            {isLoggedIn === "Customer" && (
              <>
                <Route path={pathArray[3]} exact component={CustomerMainPage} />
                <Route path={pathArray[4]} exact component={AddItemURLPage} />
                <Route path={pathArray[5]} exact component={GetInTouchPage} />
                <Route path={pathArray[7]} exact component={AboutUsPage} />
              </>
            )}
            {/**Below we route pages that regional admins use*/}
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
            {/**Below we route pages that the general admin use*/}
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
            {/**Below we change the route to 404 in case that particular route doesnt exist*/}
            {!pathArray.includes(window.location.pathname) &&
              window.location.replace("/404")}
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
