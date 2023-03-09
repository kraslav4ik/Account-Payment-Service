import { Button, Card, Col, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { monthFormat } from "../../constants";
import { deletePayment } from "../../Service/apiCalls";
import ButtonWithRequest from "../ButtonWithRequest";
import ChangePaymentForm from "./ChangePaymentForm";

const PaymentCard = (props) => {
  const currentPayment = props.currentPayment;
  const [inChangeState, setInChangeState] = useState(false);
  return (
    <Card style={{ width: "70%", margin: "auto" }}>
      <Row align="middle">
        <Col span={18} style={{ fontSize: "large" }}>
          <i>Email:</i> <b>{currentPayment.email}</b>
          <br />
          <i>Period:</i> <b>{currentPayment.period}</b>
          <br />
          <Row gutter={8}>
            <Col style={{ fontSize: "large" }}>
              <i>Amount:</i>
            </Col>
            <Col style={{ fontSize: "large" }}>
              {inChangeState ? (
                <ChangePaymentForm
                  email={currentPayment.email}
                  period={currentPayment.period}
                />
              ) : (
                <b>{currentPayment.salary}</b>
              )}
            </Col>
          </Row>
        </Col>
        <Col>
          {inChangeState ? (
            <Button size="large" onClick={() => setInChangeState(false)}>
              Cancel
            </Button>
          ) : (
            <Button size="large" onClick={() => setInChangeState(true)}>
              Change
            </Button>
          )}
        </Col>
        <Col offset={1}>
          <ButtonWithRequest
            size="large"
            buttonText="Delete"
            danger={true}
            htmltype="button"
            requestFunction={deletePayment}
            requestInfo={{
              employee: currentPayment.email,
              period: dayjs(currentPayment.period).format(monthFormat),
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default PaymentCard;
