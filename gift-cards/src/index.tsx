// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/login";
import BonusesPage from "./pages/bonuses/bonuses";
import UserListPage from "./pages/users/list";
import NewHeaderBonus from "./pages/bonuses/bonusHeader";
import NewHeaderDetails from "./pages/bonuses/bonusDetails";
// import TestPage from "./pages/test/test";
// import TestPage2 from "./pages/test/API";
import { Navigate } from 'react-router-dom';
import  CatalogPage  from "./pages/bonuses/bonusesCatalog";
import  CatalogBonuses  from "./pages/bonuses/appliedBonuses";
import AllReports from "./pages/reports/allreports";
import DevsDashboard from "./pages/devs/devsDashboard";
import InfoUsers from "./pages/help/info";
import CryptoJS from "crypto-js";

const container = document.getElementById("root");
const token = localStorage.getItem('token');

const userLevel3 = localStorage.getItem("userLevel") || ""
const userLevel2 = (userLevel3 ? CryptoJS.AES.decrypt(userLevel3, "Tyrannosaurus") : "")
const userLevel:string = userLevel2.toString(CryptoJS.enc.Utf8);

const user3 = localStorage.getItem("badgeSession") || ""
const user2 = (user3 ? CryptoJS.AES.decrypt(user3, "Tyrannosaurus") : "")
const createdUser = user2.toString(CryptoJS.enc.Utf8);
const created_user:string = (createdUser == '3199' || createdUser == '3814' ? "admin" : createdUser)

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
  // <StrictMode>
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignInPage />} index />
        <Route 
          path="/dashboard"
          element={token ? <DashboardPage /> : <Navigate to="/" />}
        />
        <Route
          path="/bonuses/all"
          element={token && userLevel == '3' || token && userLevel == '2' || token && userLevel == "5"  || token && userLevel == "6"? <BonusesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/bonuses/bonusHeader"
          element={token && userLevel == '2' || token && userLevel == '3' || token && userLevel == "5" || token && userLevel =="6"? <NewHeaderBonus /> : <Navigate to="/" />}
        />
        <Route
          path="/users/list"
          element={token && created_user == 'admin' ? <UserListPage /> : <Navigate to="/" />}
        />
        <Route
          path="/bonuses/bonusDetails"
          element={token && userLevel == '2' || token && userLevel == '3' || token && userLevel == '1' || token && userLevel == "5" ||  token && userLevel =="6"? <NewHeaderDetails /> : <Navigate to="/" />}
        />
        <Route
          path="/bonuses/appliedBonuses"
          element={token && userLevel == '2' || token && userLevel == '3' || token && userLevel == '1'  || token && userLevel == "5"  || token && userLevel =="6"? <CatalogBonuses /> : <Navigate to="/" />}
        />
        <Route
          path="/repots/allreports"
          element={token ? <AllReports  /> : <Navigate to="/" />}
        />
        <Route
          path="/bonuses/bonusCatalog"
          element={token && userLevel == '2' || token && userLevel == '3' || token && userLevel == "5" ||  token && userLevel =="6"? <CatalogPage /> : <Navigate to="/" />}
        />
        <Route
          path="/help/info"
          element={token ? <InfoUsers/> : <Navigate to="/" />}
        />
        {/* <Route path="test/test" element={<TestPage />} />
        <Route path="test/test2" element={<TestPage2 />} /> */}
        <Route
          path="/devs/devsDashboard"
          element={<DevsDashboard />}
        />
        </Routes>
      </BrowserRouter>
    </Flowbite>
  // </StrictMode>
);
