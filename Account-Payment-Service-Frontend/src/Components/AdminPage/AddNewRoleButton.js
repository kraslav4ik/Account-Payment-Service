import { Button, List, Popover, Spin } from "antd";
import { useState } from "react";
import {
  allRoles,
  rolesMap,
  rolesRequestRepresenatation,
} from "../../constants";
import EventHandler from "../../EventHandler";
import { grantRole } from "../../Service/apiCalls";

const difference = (setA, setB) => {
  let differenceSet = new Set(setA);
  for (let i of setB) {
    differenceSet.delete(i);
  }
  return differenceSet;
};

const AddNewRoleButton = (props) => {
  return (
    <Popover
      trigger="click"
      placement="topRight"
      content={<AddRolePopover currentUser={props.currentUser} />}
    >
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
    </Popover>
  );
};

const AddRolePopover = (props) => {
  const [spinning, setSpinning] = useState(false);
  const [success, setSuccess] = useState(false);
  const userRoles = new Set(props.currentUser.roles);
  const rolesToAdd = difference(allRoles, userRoles);
  const rolesButtons = [];
  rolesToAdd.forEach((role) =>
    rolesButtons.push(
      <List.Item key={role}>
        <Button
          style={{ width: "100%" }}
          type="primary"
          ghost
          onClick={() => {
            setSpinning(true);
            grantRole(
              props.currentUser.email,
              rolesRequestRepresenatation[role]
            )
              .then(() => {
                setSuccess(true);
                return new Promise((r) =>
                  setTimeout(() => r(window.location.reload()), 500)
                );
              })
              .catch(() => EventHandler.dispatch("error"))
              .finally(() => setSpinning(false));
          }}
        >
          {rolesMap[role]}
        </Button>
      </List.Item>
    )
  );
  return (
    <Spin spinning={spinning} tip={success ? "Success.." : ""}>
      <List>{rolesButtons}</List>
    </Spin>
  );
};

export default AddNewRoleButton;
