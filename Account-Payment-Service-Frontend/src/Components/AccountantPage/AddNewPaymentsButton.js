import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AddNewPaymentsButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      type="primary"
      shape="round"
      size="large"
      style={{ fontWeight: "bold" }}
      onClick={() => navigate("/accountant/new")}
    >
      Add new payments
    </Button>
  );
};

export default AddNewPaymentsButton;
