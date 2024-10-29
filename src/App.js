import React from "react";
import "./App.css";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./layouts/Sidebar";
import Main from "./layouts/Main";
import UserLayout from "./userComponents/UserLayout";
import UserDashboard from "./userComponents/UserDashboard";
import AdminLogin from "./auth/AdminLogin";
import Login from "./auth/Login";
import Home from "./website/Home";
import UserRegister from "./auth/UserRegister";
import AllUsers from "./components/AllUsers";
import RewardPointCalculator from "./components/RewardPointCalculator";
import UserProfile from "./userComponents/UserProfile";
import UserReferRegister from "./auth/UserReferRegister";
import UserWallet from "./userComponents/UserWallet";
import AllReferUser from "./userComponents/AllReferUser";
import UsersWithReferenceTree from "./components/UsersWithReferenceTree";
import Contact from "./website/Contact";
import About from "./website/About";
import UsersWithdrawRequest from "./components/UsersWithdrawRequest";
import TopupRequests from "./components/TopupRequests";
import AdminWallet from "./components/AdminWallet";
import RefferalTree from "./userComponents/RefferalTree";
import PackagePurchaseRequest from "./components/PackagePurchaseRequest";
import GiftCashbackWallet from "./userComponents/GiftCashbackWallet";
import ComingSoon from "./userComponents/ComingSoon";
import AwardIncome from "./userComponents/AwardIncome";
import DirectsIncomeReports from "./userComponents/DirectsIncomeReports";
import TotalIncome from "./userComponents/TotalIncome";
import Reports from "./userComponents/Reports";
import MyDirects from "./userComponents/MyDirects";
import ChangePassword from "./userComponents/ChangePassword";
import MyIndirects from "./userComponents/MyIndirects";
import PetrolCardWallet from "./userComponents/PetrolCardWallet";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route path="/login" Component={Login} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route
          path="/user-register-with-refer/:id"
          Component={UserReferRegister}
        />
        <Route path="/admin-login" Component={AdminLogin} />

        <Route path="/admin" Component={Main}>
          <Route index Component={Dashboard} />
          <Route path="all-users" Component={AllUsers} />
          <Route path="admin-wallet" Component={AdminWallet} />

          <Route
            path="reward-point-calculator"
            Component={RewardPointCalculator}
          />
          <Route
            path="all-registered-users-with-reference"
            Component={UsersWithReferenceTree}
          />
          <Route
            path="users-withdraw-request"
            Component={UsersWithdrawRequest}
          />
          <Route path="users-topup-request" Component={TopupRequests} />
          <Route
            path="package-purchase-request"
            Component={PackagePurchaseRequest}
          />
        </Route>
        <Route path="/users" Component={UserLayout}>
          <Route index Component={UserDashboard} />
          <Route path="user-profile" Component={UserProfile} />
          <Route path="users-wallet" Component={UserWallet} />
          <Route path="all-refer-to-users" Component={RefferalTree} />
          <Route path="gift-cashback-wallet" Component={GiftCashbackWallet} />
          <Route path="petrol-card-wallet" Component={PetrolCardWallet} />
          <Route path="awards-and-rewards" Component={ComingSoon} />
          <Route path="my-directs" Component={MyDirects} />
          <Route path="my-indirects" Component={MyIndirects} />
          <Route path="award-income" Component={AwardIncome} />
          <Route
            path="directs-refferal-bonus"
            Component={DirectsIncomeReports}
          />
          <Route path="level-bonus" Component={TotalIncome} />
          <Route path="reports" Component={Reports} />
          <Route path="change-password" Component={ChangePassword} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
