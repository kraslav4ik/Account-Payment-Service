import { Button, Card, Col, Row } from "antd";
import { useState } from "react";
import ChangePaymentForm from "./ChangePaymentForm";

const PaymentCard = (props) => {
  const currentPayment = props.currentPayment;
  const [inChangeState, setInChangeState] = useState(false);
  return (
    <Card style={{ width: "60%", margin: "auto" }}>
      <Row align="middle">
        <Col span={17}>
          <div style={{ fontSize: "large" }}>
            <i>Email: </i> <b>{currentPayment.email}</b>
            <br />
            <i>Period: </i> <b>{currentPayment.period}</b>
            <br />
            <i>Amount: </i>{" "}
            {inChangeState ? (
              <ChangePaymentForm />
            ) : (
              <b>{currentPayment.salary}</b>
            )}
          </div>
        </Col>
        <Col span={5} offset={2} >
          {inChangeState ? (
            <Button size="large" onClick={() => setInChangeState(false)}>Cancel</Button>
          ) : (
            <Button size="large" onClick={() => setInChangeState(true)}>Change</Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default PaymentCard;
