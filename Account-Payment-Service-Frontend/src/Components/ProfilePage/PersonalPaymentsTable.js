import { Card, Col, DatePicker, List, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { handleError } from "../../Service/Ajax";
import { getSinglePayment, getUserPayments } from "../../Service/apiCalls";
import PersonalPaymentCard from "./PersonalPaymentCard";
import dayjs from "dayjs";
import { monthFormat } from "../../constants";

const { Title } = Typography;

const PersonalPaymentsTable = (props) => {
  const currentUser = props.currentUser;
  const [paymentRecords, setPaymentRecords] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const isAdmin = () => {
    console.log(currentUser.roles)
    console.log(currentUser.roles.includes("ROLE_ADMINISTRATOR"))
    if (currentUser.roles.includes("ROLE_ADMINISTRATOR") === true) {
      return true;
    }
    return false;
  };
  const getPaymentsCards = () => {
    console.log("in function")
    if (isAdmin === true) {
      console.log("in admin")
      return;
    }
    const payments = [];
    getUserPayments()
      .then((infoFromRequest) => {
        console.log(infoFromRequest)
        infoFromRequest.forEach((p) =>
          payments.push(
            <List.Item key={p.period}>
              <PersonalPaymentCard payment={p} />
            </List.Item>
          )
        );
        if (!payments.length) {
          console.log("no payments")
          setPaymentRecords(
            <Title
              level={2}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              You have no payments
            </Title>
          );
          return;
        }
        setPaymentRecords(
          <>
            <Title level={2} style={{ textAlign: "center" }}>
              All payments:
            </Title>
            <List>{payments}</List>
          </>
        );
      })
      .catch((failedResponse) => handleError(failedResponse));
  };
  const getPaymentByMonth = (period) => {
    if (isAdmin === true) {
      return;
    }
    getSinglePayment(period)
      .then((p) => setPaymentRecords(<PersonalPaymentCard payment={p} />))
      .catch((failedResponse) => handleError(failedResponse));
  };

  useEffect(() => {
    const period = searchParams.get("period");
    if (period) {
      getPaymentByMonth(period);
    } else {
      getPaymentsCards();
    }
  }, []);

  return isAdmin() ? (
    <Title level={2} style={{ textAlign: "center" }}>
      You have an administrative role. You don't have any payments
    </Title>
  ) : (
    <Card
      title={
        <Row align="middle" justify="start">
          <Col>
            <Title level={4} style={{ margin: "auto" }}>
              Choose month to search:
            </Title>
          </Col>
          <Col offset={1}>
            <DatePicker
              defaultValue={
                searchParams.get("period")
                  ? dayjs(searchParams.get("period"), monthFormat)
                  : null
              }
              format={monthFormat}
              picker="month"
              onChange={(date, dateString) => {
                setSearchParams(dateString ? { period: dateString } : {});
                window.location.reload();
              }}
            />
          </Col>
        </Row>
      }
      style={{ minHeight: "95%" }}
    >
      {paymentRecords}
    </Card>
  );
};

export default PersonalPaymentsTable;
