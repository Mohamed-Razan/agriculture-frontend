import { Switch, Route, BrowserRouter as Router, useLocation } from "react-router-dom";
import CreateAd from "./components/Advertisement/CreateAd";

import PastAd from "./components/Advertisement/PastAd"
import AdminHome from "./components/Admin/AdminHome";
import AdView from "./components/Advertisement/AdView";
import MyProfile from "./components/Profile/MyProfile";
import AllSellers from "./components/Profile/AllSellers";
import ViewProfile from "./components/Profile/ViewProfile"


function App() {

  return (
    <div style={{backgroundColor: "#E0FCC3", minHeight: "100vh"}}>
      <Router>
        <Switch>
          <Route exact path="/" component={AdminHome} />
          <Route exact path="/seller/create-ad" component={CreateAd} />
          <Route exact path="/seller/past-ad" component={PastAd} />
          <Route exact path="/seller/my-profile" component={MyProfile} />
          <Route exact path="/user/advertisement" component={AdView} />
          <Route exact path="/sellers" component={AllSellers} />
          <Route exact path="/view-profile/:id" component={ViewProfile} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
