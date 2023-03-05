import { Button, Form, Input } from "antd";

const ChangePaymentForm = () => {
  return (
    <Form
      layout="inline"
      style={{ justifyContent: "start", flexWrap: "nowrap" }}
    >
      <Form.Item style={{ marginRight: "0" }}>
        <Input.Group compact style={{ width: "100%", whiteSpace: "nowrap"}}>
          <Form.Item
            style={{ marginRight: "0", width: "50%"}}
            name={["amount", "dollars"]}
            rules={[
              {
                required: true,
                message: "dollar amount is required",
              },
            ]}
          >
            <Input suffix="$" style={{}}/>
          </Form.Item>
          <Form.Item
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePaymentForm;
