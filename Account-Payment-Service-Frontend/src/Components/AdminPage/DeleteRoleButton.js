import { Button } from "antd";
import { useState } from "react";
import { rolesRequestRepresenatation } from "../../constants";
import EventHandler from "../../EventHandler";
import { deleteRole } from "../../Service/apiCalls";

const DeleteRoleButton = (props) => {
  
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Delete Role");
  return (
    <Button
      loading={loading}
      type="primary"
      danger
      style={{ width: "100%", margin: "auto" }}
      disabled={props.disabled}
      onClick={() => {
        setLoading(true);
        deleteRole(props.currentUser.email, rolesRequestRepresenatation[props.role])
          .then(() => {
            setButtonText("Success!");
            return new Promise((r) => setTimeout(() => r(window.location.reload()), 500))
          })
          .catch(() => EventHandler.dispatch("error"))
          .finally(() => setLoading(false));
      }}
    >
      {buttonText}
    </Button>
  );
};

export default DeleteRoleButton;
