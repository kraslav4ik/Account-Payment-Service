import { Button, Card, Col, Row } from "antd";
import { useState } from "react";
import ChangePaymentButton from "./ChangePaymentButton";
import ChangePaymentForm from "./ChangePaymentForm";

const PaymentCard = (props) => {
  const currentPayment = props.currentPayment;
  const [inChangeState, setInChangeState] = useState(false);
  return (
    <Card style={{ width: "80%", margin: "auto" }}>
      <Row>
        <Col>
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
        <Col>
          {inChangeState ? (
            <Button onClick={() => setInChangeState(false)}>Cancel</Button>
          ) : (
            <Button onClick={() => setInChangeState(true)}>Change</Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default PaymentCard;
