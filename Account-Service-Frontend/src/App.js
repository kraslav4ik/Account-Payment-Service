import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import "./ServiceLayout.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Loginpage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import { getCurrentUserByQuerry } from "./Service/apiCalls";
import CustomHeaderContent from "./CustomHeaderContent";
import EventHandler from "./EventHandler";
import AdminPage from "./AdminPage/AdminPage";
import AccountantPage from "./AccountantPage/AccountantPaje";

const { Header, Content, Footer } = Layout;

const App = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const currentUserToSet = getCurrentUserByQuerry();
    console.log(currentUserToSet);
    if (currentUserToSet) {
      setCurrentUser(currentUserToSet);
    }

    EventHandler.on("logout", () => {
      logOut();
    });

    return EventHandler.remove("logout");
  }, []);

  const logOut = () => {
    setCurrentUser(undefined);
    return navigate("/login");
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
          alignItems: "center",
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/" element={<Navigate to="/profile" />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/accountant" element={<AccountantPage />} />
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

export default App;
