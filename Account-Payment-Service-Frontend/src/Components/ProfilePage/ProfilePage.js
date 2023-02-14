import { UserOutlined } from "@ant-design/icons";
import { App, Avatar, Card, Col, Row } from "antd";
import { rolesMap } from "../../constants";
import ChangePassButton from "./ChangePassButton";
import PersonalPaymentsTable from "./PersonalPaymentsTable";

const ProfilePage = (props) => {
  const currentUser = props.currentUser;
  let userRoles = "";
  if (currentUser) {
    currentUser.roles.forEach((role) => (userRoles += `${rolesMap[role]}, `));
    userRoles = userRoles.slice(0, -2);
  }

  return (
    <>
      {currentUser && (
        <Row justify="space-around" style={{ width: "100%" }}>
          <Col span={14}>
            <PersonalPaymentsTable currentUser={currentUser} />
          </Col>
          <Col span={5}>
            <Card
              style={{ aspectRatio: 1 / 1, position: "fixed", width: "20%" }}
            >
              <Row align="middle" justify="center" wrap="auto">
                <Col>
                  <Avatar shape="square" size={128} icon={<UserOutlined />} />
                </Col>
                <Col style={{ fontSize: "large" }}>
                  <p>
                    <i>Email:</i> <b>{props.currentUser.email}</b>
                    <br />
                    <i>Name:</i> <b>{props.currentUser.name}</b>
                    <br />
                    <i>LastName:</i> <b>{props.currentUser.lastname}</b>
                    <br />
                    <i>Roles:</i> <b>{userRoles}</b>
                  </p>
                </Col>
                <Col>
                  <ChangePassButton />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfilePage;
