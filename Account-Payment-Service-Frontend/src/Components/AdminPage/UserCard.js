import { Button, Card, Col, List, Row, Typography } from "antd";
import { rolesMap, rolesRequestRepresenatation } from "../../constants";
import { deleteRole } from "../../Service/apiCalls";
import ButtonWithRequest from "../ButtonWithRequest";
import AddNewRoleButton from "./AddNewRoleButton";
import DeleteUserButton from "./DeleteUserButton";
import LockUnlockButton from "./LockUnlockButton";

const { Title } = Typography;

const UserCard = (props) => {
  const currentUser = props.currentUser;
  const canRemoveRole = currentUser.roles.length > 1;
  const rolesToPrint = [];
  currentUser.roles.forEach((r) =>
    rolesToPrint.push(
      <List.Item>
        <Card title={rolesMap[r]} headStyle={{ textAlign: "center" }} bodyStyle={{display: "flex", justifyContent: "center"}}>
          <ButtonWithRequest
            disabled={!canRemoveRole}
            buttonText="Delete Role"
            type="primary"
            danger={true}
            requestFunction={deleteRole}
            requestInfo={[currentUser.email, rolesRequestRepresenatation[r]]}
          />
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
