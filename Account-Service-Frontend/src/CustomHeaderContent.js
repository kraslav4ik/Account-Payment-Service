import { Button, Row, Col, Space, Typography, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { removeJwtCookie } from "./Service/apiCalls";
import EventHandler from "./EventHandler";
import Switcher from "./Switcher";

const { Title } = Typography;

const rolesMap = {
  ROLE_ADMIN: { name: "ADMIN CONTENT", link: "/admin" },
  ROLE_ACCOUNTANT: { name: "ACCOUNTANT CONTENT", link: "/accountant" },
};

const CustomHeaderContent = (props) => {
  const currentUser = props.currentUser;
  const navigate = useNavigate();

  return (
    <Row>
      <Col span={8} className="logoandname">
        <Title level={3} style={{ color: "white" }}>
          MyPaymentServiceApp
        </Title>
      </Col>
      <Col span={8}>
        {currentUser && (
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={(item) => navigate(item.key)}
            items={currentUser.roles.map((role) =>
              role in rolesMap
                ? {
                    key: rolesMap[role]["link"],
                    label: rolesMap[role]["name"],
                  }
                : null
            )}
          />
        )}
      </Col>
      {currentUser && (
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
      )}
      <Col>
        <Switcher />
      </Col>
    </Row>
  );
};

export default CustomHeaderContent;
