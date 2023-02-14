import React, { useEffect, useState } from "react";
import { App, Layout, theme } from "antd";
import "./ServiceLayout.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Components/Loginpage/LoginPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import { getCurrentUserByQuerry } from "./Service/apiCalls";
import CustomHeaderContent from "./CustomHeaderContent";
import EventHandler from "./EventHandler";
import AdminPage from "./Components/AdminPage/AdminPage";
import AccountantPage from "./Components/AccountantPage/AccountantPaje";
import { useLocation } from "react-router-dom";
import { handleError } from "./Service/Ajax";
import AuditorPage from "./Components/AuditorPage/AuditorPage";

const { Header, Content, Footer } = Layout;

const removeHandlers = () => {
  EventHandler.remove("logout");
  EventHandler.remove("error");
};

const Application = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    EventHandler.on("logout", () => {
      logOut();
    });
    EventHandler.on("error", (message) => {
      errorNotification(message);
    });
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      getCurrentUserByQuerry()
        .then((user) => setCurrentUser(user))
        .catch((response) => handleError(response));
    }
    return removeHandlers();
  }, []);

  const logOut = () => {
    setCurrentUser(null);
    return navigate("/login");
  };

  const errorNotification = (message) => {
    notification.warning({
      placement: "topLeft",
      duration: 5,
      message: "Error",
      description: message,
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <CustomHeaderContent currentUser={currentUser} />
      </Header>
      <Content
        className="site-layout"
        style={{
          minHeight: "85vh",
          padding: 24,
          background: colorBgContainer,
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile/*"
            element={<ProfilePage currentUser={currentUser} />}
          />
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/accountant" element={<AccountantPage />} />
          <Route path="/auditor" element={<AuditorPage />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        MyPaymentServiceApplication. Made by{" "}
        <a
          href="https://github.com/kraslav4ik"
          rel="noreferrer"
          target="_blank"
        >
          @kraslavchik
        </a>
      </Footer>
    </Layout>
  );
};

export default Application;
