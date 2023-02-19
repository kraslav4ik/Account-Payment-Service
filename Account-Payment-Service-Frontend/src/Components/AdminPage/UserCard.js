import { Button, Card, Col, List, Row, Typography } from "antd";
import { rolesMap } from "../../constants";
import AddNewRoleButton from "./AddNewRoleButton";
import DeleteRoleButton from "./DeleteRoleButton";
import DeleteUserButton from "./DeleteUserButton";
import LockUnlockButton from "./LockUnlockButton";

const { Title } = Typography;

const UserCard = (props) => {
  const currentUser = props.currentUser;
  const rolesToPrint = [];
  currentUser.roles.forEach((r) =>
    rolesToPrint.push(
      <List.Item>
        <Card title={rolesMap[r]} headStyle={{ textAlign: "center" }}>
          {currentUser.roles.length > 1 ? (
            <DeleteRoleButton
              disabled={false}
              currentUser={currentUser}
              role={r}
            />
          ) : (
            <DeleteRoleButton
              disabled={true}
              currentUser={currentUser}
              role={r}
            />
          )}
        </Card>
      </List.Item>
    )
  );
  return (
    <Card
      title={
        <Row align={"middle"} justify="space-between">
          <Col>
            <Title level={4}>{`${currentUser.id}. ${currentUser.email}`}</Title>
          </Col>
          <Col>
            <DeleteUserButton currentUser={currentUser} />
          </Col>
        </Row>
      }
      style={{ width: "80%", margin: "auto" }}
    >
      <Row>
        <Col span={8}>
          <div style={{ fontSize: "large" }}>
            <p>
              <i>Name: </i> <b>{currentUser.name}</b>
              <br />
              <i>Surname: </i> <b>{currentUser.lastname}</b>
              <br />
              <i>
                Status: {currentUser.accountNonLocked ? "Active" : "Locked"}
              </i>
            </p>
            <Row>
              <Col span={7}>
                <LockUnlockButton
                  isLockButton={true}
                  disabled={!currentUser.accountNonLocked}
                  email={currentUser.email}
                />
              </Col>
              <Col span={7} offset={2}>
                <LockUnlockButton
                  isLockButton={false}
                  disabled={currentUser.accountNonLocked}
                  email={currentUser.email}
                  
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={16}>
          <List
            size="small"
            grid={{ gutter: 16, column: 3 }}
            bordered={true}
            dataSource={rolesToPrint}
            renderItem={(item) => item}
            // style={{display: "flex", justifyContent: "center"}}
            header={
              <h2
                style={{ width: "100%", margin: "auto", textAlign: "center" }}
              >
                Roles
              </h2>
            }
            footer={<AddNewRoleButton currentUser={currentUser} />}
          ></List>
        </Col>
      </Row>
    </Card>
  );
};

export default UserCard;
