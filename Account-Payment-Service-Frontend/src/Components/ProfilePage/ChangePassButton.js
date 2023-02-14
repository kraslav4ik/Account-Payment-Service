import { App, Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../Service/Ajax";
import { changePassword } from "../../Service/apiCalls";

const ChangePassButton = () => {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isChanged = window.localStorage.getItem("isChanged");
    if (isChanged !== null) {
      message.info({
        placement: "top",
        duration: 3,
        content: "Password has been changed successfully!",
      });
      window.localStorage.removeItem("isChanged");
    }
  }, []);

  return (
    <>
      <Modal
        title="Change password"
        footer={null}
        open={open}
        centered
        width="25vw"
        style={{ textAlign: "center" }}
        bodyStyle={{
          textAlign: "center",
          minHeight: "15vh",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
        onCancel={() => {
          navigate("/profile");
          setOpen(false);
        }}
      >
        <Form
          onFinish={(values) => {
            setLoading(true);
            changePassword(values.password)
              .then(() => {
                navigate("/profile");
                setOpen(false);
                window.localStorage.setItem("isChanged", "YES");
                window.location.reload();
              })
              .catch((errorResp) => handleError(errorResp))
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <Form.Item
            wrapperCol={{
              span: 16,
            }}
            label="New password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 12,
                message: "Min len of password is 12 symbols",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              Change
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="default"
        size="large"
        style={{ width: "100%" }}
        onClick={() => {
          navigate("/profile/changepass");
          setOpen(true);
        }}
      >
        Change password
      </Button>
    </>
  );
};

export default ChangePassButton;
