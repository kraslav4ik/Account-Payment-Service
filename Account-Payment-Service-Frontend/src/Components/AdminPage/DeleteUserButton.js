import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Popover, Row } from "antd";
import { useState } from "react";
import EventHandler from "../../EventHandler";
import { deleteUser } from "../../Service/apiCalls";

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
  const setDeletedFromChild = (val) => setDeleted(val);
  return (
    <Row gutter={12} align={"middle"}>
      {deleted ? (
        <div>User has been deleted, page will be reloaded</div>
      ) : (
        <>
          <Col>Do you want to delete this user?</Col>
          <Col>
            <YesButton
              currentUser={props.currentUser}
              setDeletedFromChild={setDeletedFromChild}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

const YesButton = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      type="primary"
      loading={loading}
      ghost
      onClick={() => {
        setLoading(true);
        deleteUser(props.currentUser.email)
          .then(() => {
            props.setDeletedFromChild(true);
            return new Promise((r) =>
                  setTimeout(() => r(window.location.reload()), 5000)
                );
          })
          .catch(() => EventHandler.dispatch("error"))
          .finally(() => setLoading(false));
      }}
    >
      Yes
    </Button>
  );
};
export default DeleteUserButton;
