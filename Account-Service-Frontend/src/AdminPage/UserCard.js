import { DeleteOutlined, MinusOutlined } from "@ant-design/icons";
import { Button, Card, Col, List, Popover, Row, Typography } from "antd";
import DeleteUserButton from "./DeleteUserButton";

const { Title } = Typography;
const rolesMap = {
  ROLE_ADMIN: "Administrator",
  ROLE_ACCOUNTANT: "Accountant",
  ROLE_USER: "User",
};

const DeleteButton = (props) => (
  <Button
    type="primary"
    danger
    style={{ width: "100%", margin: "auto" }}
    disabled={props.disabled}
  >
    Delete Role
  </Button>
);

const UserCard = (props) => {
  const currentUser = props.currentUser;
  const rolesToPrint = [];
  currentUser.roles.forEach((r) =>
    rolesToPrint.push(
      <List.Item>
        <Card title={rolesMap[r]} headStyle={{ textAlign: "center" }}>
          {currentUser.roles.length > 1 ? (
            <DeleteButton disabled={false} />
          ) : (
            <DeleteButton disabled={true} />
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
            <DeleteUserButton currentUser={currentUser}/>
          </Col>
        </Row>
      }
      style={{ width: "80%", margin: "auto" }}
    >
      <Row>
        <Col span={8}>
          <div style={{ fontSize: "large" }}>
            <p>
              <i>Name: </i> <b>{currentUser.nameOfUser}</b>
              <br />
              <i>Surname: </i> <b>{currentUser.surname}</b>
              <br />
              <i>
                Status: {currentUser.accountNonLocked ? "Active" : "Locked"}
              </i>
            </p>
            <Row>
              <Col span={4}>
                <Button type="default" disabled={!currentUser.accountNonLocked}>
                  Lock
                </Button>
              </Col>
              <Col span={4} offset={2}>
                <Button type="default" disabled={currentUser.accountNonLocked}>
                  Unlock
                </Button>
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
            footer={
              <Button
                type="primary"
                style={{
                  width: "100%",
                  margin: "auto",
                  justifyContent: "center",
                }}
              >
                Add new role
              </Button>
            }
          ></List>
        </Col>
      </Row>
    </Card>
  );
};

export default UserCard;
