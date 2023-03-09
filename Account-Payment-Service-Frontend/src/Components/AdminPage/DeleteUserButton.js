import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Popover, Row } from "antd";
import { useState } from "react";
import EventHandler from "../../EventHandler";
import { handleError } from "../../Service/Ajax";
import { deleteUser } from "../../Service/apiCalls";
import ButtonWithRequest from "../ButtonWithRequest";

const DeleteUserButton = (props) => (
  <Popover
    content={<DeleteUserPopover currentUser={props.currentUser} />}
    trigger="click"
  >
    <Button
      size="medium"
      type="primary"
      shape="circle"
      icon={<DeleteOutlined />}
      danger
      ghost
    />
  </Popover>
);

const DeleteUserPopover = (props) => {
  const [deleted, setDeleted] = useState(false);
  const setTrue = () => setDeleted(true);
  return (
    <Row gutter={12} align={"middle"}>
      {deleted ? (
        <div>User has been deleted, page will be reloaded</div>
      ) : (
        <>
          <Col>Do you want to delete this user?</Col>
          <Col>
            <ButtonWithRequest
              type="primary"
              size="medium"
              buttonText="Yes"
              ghost={true}
              danger={false}
              htmltype="button"
              requestFunction={deleteUser}
              successFunction={setTrue}
              requestInfo={props.currentUser.email}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default DeleteUserButton;
