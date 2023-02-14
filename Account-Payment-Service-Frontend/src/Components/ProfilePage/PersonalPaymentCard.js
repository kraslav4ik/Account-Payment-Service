import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;
const PersonalPaymentCard = (props) => {
  return props.payment.period ? (
    <Card style={{ width: "100%", margin: "auto" }}>
      <Row justify="space-between">
        <Col>
          <Title level={4}>{props.payment.period} :</Title>
        </Col>
        <Col>
          <Title level={4}>{props.payment.salary}</Title>
        </Col>
      </Row>
    </Card>
  ) : (
    <Title
      level={2}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }}
    >
      No payments for chosen period
    </Title>
  );
};

export default PersonalPaymentCard;
