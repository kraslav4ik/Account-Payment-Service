import { Button } from "antd";
import { useState } from "react";
import { handleError } from "../Service/Ajax";

const ButtonWithRequest = (props) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(props.buttonText);

  return (
    <Button
      size={props.size}
      type={props.type}
      ghost={props.ghost}
      loading={loading}
      disabled={props.disabled}
      danger={props.danger}
      htmltype={props.htmltype}
      style={props.buttonStyle}
      onClick={() => {
        setLoading(true);
        props
          .requestFunction(props.requestInfo)
          .then(() => {
            if (props.successFunction) {
                props.successFunction();
            }
            setButtonText("Success!");
            return new Promise((r) =>
              setTimeout(() => r(window.location.reload()), 500)
            );
          })
          .catch((errorResponse) => {
            if (props.failureFunction) {
                props.failureFunction();
            }
            handleError(errorResponse);
          })
          .finally(() => setLoading(false));
      }}
    >
      {buttonText}
    </Button>
  );
};

export default ButtonWithRequest;
