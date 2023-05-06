import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import LogoutButton from "./components/LogoutButton";
import CustomerMainPage from "./Pages/CustomerMainPage";
import GetInTouchPage from "./Pages/GetInTouchPage";
import AddItemURLPage from "./Pages/AddItemURLPage";
import Navbar from "./components/Navbar";


function App() {
  // Check if user is authenticated
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        {isLoggedIn ? <LogoutButton /> : null} 
        <main>
          <Switch>
            <Route path="/Login" exact component={LoginPage} />
            <Route path="/customerMain" exact render={() => isLoggedIn ? <CustomerMainPage/> : null} />
            <Route path="/addItem" exact render={() => isLoggedIn ? <AddItemURLPage/> : null} />
            <Route path="/getInTouch" exact component={GetInTouchPage} />
            <Route path="/" exact component={LoginPage} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
