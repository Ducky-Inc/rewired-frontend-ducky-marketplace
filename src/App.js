import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import { CONSTANTS } from "./constants";

import { NavBar } from "./Components/NavBar/NavBar";

import Home from "./Pages/Home/Home";
import Marketplace from "./Pages/Marketplace/Marketplace";
import OwnedAssets from "./Pages/OwnedAssets/OwnedAssets";
import NewAsset from "./Pages/Asset/NewAsset/NewAsset";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route exact path={CONSTANTS.ROUTES.HOME} element={<Home />} />
        <Route path={CONSTANTS.ROUTES.MARKETPLACE} element={<Marketplace />} />
        <Route path={CONSTANTS.ROUTES.OWNED_ASSETS} element={<OwnedAssets />} />
        <Route path={CONSTANTS.ROUTES.NEW_ASSET} element={<NewAsset />} />

        {/* <Route path={CONSTANTS.ROUTES.REDEEM_PERK} element={<RedeemPerk />} />


        <Route
          path={CONSTANTS.ROUTES.CREATOR_DASHBOARD}
          element={<CreatorDashboard />}
        />
        <Route path={CONSTANTS.ROUTES.ADD_PERK} element={<AddPerk />} /> */}

        {/* <Route path={CONSTANTS.ROUTES.ASSET} element={<Asset />} /> */}
      </Routes>
    </div>
  );
}

export default App;
