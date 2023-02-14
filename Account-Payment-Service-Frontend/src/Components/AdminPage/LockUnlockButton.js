import { Button } from "antd";
import { useState } from "react";
import { handleError } from "../../Service/Ajax";
import { lockUser, registerUser, unlockUser } from "../../Service/apiCalls";

const LockUnlockButton = (props) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(
    props.isLockButton ? "Lock" : "Unlock"
  );

  return (
    <Button
      type="default"
      loading={loading}
      style={{width: "100%"}}
      onClick={() => {
        setLoading(true);
        const resultPromise = props.isLockButton
          ? lockUser(props.email)
          : unlockUser(props.email);
        resultPromise
          .then(() => {
            setButtonText("Success!");
            return new Promise((r) =>
                  setTimeout(() => r(window.location.reload()), 500)
                );
          })
          .catch((resp) => handleError(resp))
          .finally(() => {
            setLoading(false);
          });
      }}
      disabled={props.disabled}
    >
      {buttonText}
    </Button>
  );
};

export default LockUnlockButton;
