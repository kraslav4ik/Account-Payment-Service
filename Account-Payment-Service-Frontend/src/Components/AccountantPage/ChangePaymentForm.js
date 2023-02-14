import { Button, Form, Input } from "antd";

const ChangePaymentForm = () => {
  return (
    <Form layout="inline">
      <Form.Item>
        <Input.Group compact>
          <Form.Item
            name={["amount", "dollars"]}
            rules={[
              {
                required: true,
                message: "dollar amount is required",
              },
            ]}
          >
            <Input suffix="$" />
          </Form.Item>
          <Form.Item
            name={["amount", "cents"]}
            noStyle
            rules={[
              {
                required: true,
                message: "cents are required",
              },
            ]}
          >
            <Input
              style={{
                width: "30%",
              }}
              suffix="¢"
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePaymentForm;
