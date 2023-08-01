import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import AllTransactions from "./components/AllTransactions";
import Profile from "./components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContext from "./components/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeTransactions, setActiveTransactions] = useState("all");
  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          activeTab,
          setActiveTab,
          activeTransactions,
          setActiveTransactions,
        }}
      >
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<DashBoard />} />
            <Route exact path="/transactions" element={<AllTransactions />} />
            <Route exact path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
