import { Button, Row, Col, Space, Typography, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { removeJwtCookie } from "./Service/apiCalls";
import EventHandler from "./EventHandler";
import Switcher from "./Components/Switcher";
import { rolesPagesMap } from "./constants";
import { useEffect, useState } from "react";

const { Title } = Typography;

const CustomHeaderContent = (props) => {
  const currentUser = props.currentUser;
  const navigate = useNavigate();
  const location = useLocation();

  const getPossibleMenuOptions = () => 
    currentUser.roles.map((role) =>
    role in rolesPagesMap
      ? {
          key: rolesPagesMap[role]["link"],
          label: rolesPagesMap[role]["name"],
        }
      : null
  )
  
  const [currentMenuOption, setCurrentMenuOption] = useState(null);

  useEffect(() => setCurrentMenuOption(location.pathname));

  return (
    <Row>
      <Col span={8} className="logoandname">
        <Title level={3} style={{ color: "white" }}>
          MyPaymentServiceApp
        </Title>
      </Col>
      {currentUser && (
        <>
          <Col span={8}>
            <Menu
              theme="dark"
              mode="horizontal"
              onClick={(item) => {
                navigate(item.key);
                setCurrentMenuOption(item.key);
              }}
              items={getPossibleMenuOptions()}
              selectedKeys={currentMenuOption}
            />
          </Col>
          <Col span={5} offset={1} className="profileandswitcher">
            <Space size={"large"}>
              <Button ghost onClick={() => navigate("/profile")}>
                {currentUser.email}
              </Button>
              <Button
                ghost
                className={"logout-button"}
                onClick={() => {
                  removeJwtCookie();
                  EventHandler.dispatch("logout");
                }}
              >
                Logout
              </Button>
            </Space>
          </Col>
        </>
      )}
      <Col>
        <Switcher />
      </Col>
    </Row>
  );
};

export default CustomHeaderContent;
