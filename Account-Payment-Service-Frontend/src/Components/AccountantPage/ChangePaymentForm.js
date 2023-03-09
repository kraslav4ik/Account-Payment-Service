import { Button, Form, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { monthFormat } from "../../constants";
import EventHandler from "../../EventHandler";
import { handleError } from "../../Service/Ajax";
import { updatePayment } from "../../Service/apiCalls";

const ChangePaymentForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Submit")
  return (
    <Form
      layout="inline"
      style={{ justifyContent: "start", flexWrap: "nowrap" }}
      onFinish={(values) => {
        setLoading(true);
        updatePayment({
          employee: props.email,
          period: dayjs(props.period).format(monthFormat),
          salary: `${values.amount.dollars}${values.amount.cents}`,
        })
          .then(() => {
            setButtonText("Success!");
            return new Promise((r) => setTimeout(() => r(window.location.reload()), 500))
          })
          .catch((errorResponse) => handleError(errorResponse))
          .finally(() => setLoading(false));
      }}
    >
      <Form.Item style={{ marginRight: "0", width: "70%" }}>
        <Input.Group compact style={{ width: "45%", whiteSpace: "nowrap" }}>
          <Form.Item
            style={{ marginRight: "0" }}
            name={["amount", "dollars"]}
            rules={[
              {
                required: true,
                message: "dollar amount is required",
              },
            ]}
          >
            <Input suffix="$" style={{}} />
          </Form.Item>
          <Form.Item
            initialValue={"00"}
            style={{ marginRight: "0" }}
            name={["amount", "cents"]}
            rules={[
              {
                required: true,
                message: "cents are required",
              },
            ]}
          >
            <Input suffix="¢" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item style={{ marginRight: "0" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePaymentForm;
