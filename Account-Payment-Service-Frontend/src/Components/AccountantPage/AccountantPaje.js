import { Col, DatePicker, Input, List, Row, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { monthFormat } from "../../constants";
import { handleError } from "../../Service/Ajax";
import { getAllPayments } from "../../Service/apiCalls";
import AddNewPaymentsButton from "./AddNewPaymentsButton";
import PaymentCard from "./PaymentCard";

const { Title } = Typography;

const AccountantPage = () => {
  const [payments, setPayments] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const getPaymentsCards = (period, filteredEmail) => {
    const paymentCards = [];
    getAllPayments()
      .then((infoFromRequest) => {
        infoFromRequest.forEach((p) => {
          if (
            (!period || p.period === period) &&
            (!filteredEmail || p.email.includes(filteredEmail))
          ) {
            paymentCards.push(
              <List.Item key={`${p.email}, ${p.period}`}>
                <PaymentCard currentPayment={p} />
              </List.Item>
            );
          }
        });
        if (!paymentCards.length) {
          setPayments(
            <Title
              level={2}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              No payments found
            </Title>
          );
          return;
        }
        setPayments(
          <List style={{ width: "100%", margin: "auto"}}>{paymentCards}</List>
        );
      })
      .catch((failedResponse) => handleError(failedResponse));
  };
  useEffect(() => {
    const period = searchParams.get("period");
    const filteredEmail = searchParams.get("email");
    getPaymentsCards(period, filteredEmail);
  }, []);

  return (
    payments !== null && (
      <div style={{
        width: "100%",
        position: "relative",
        
      }}>
        <Row justify="center" align="middle" style={{width: "100%", }}>
          <Col span={12}>
            <Input.Group compact style={{width: "100%"}}>
              <Input placeholder="Input email" style={{ width: "50%" }}></Input>
              <DatePicker
                defaultValue={
                  searchParams.get("period")
                    ? dayjs(searchParams.get("period"), monthFormat)
                    : null
                }
                format={monthFormat}
                picker="month"
                style={{ width: "50%" }}
              ></DatePicker>
            </Input.Group>
          </Col>
          <Col span={5} offset={1}>
            <AddNewPaymentsButton />
          </Col>
        </Row>
        {payments}
      </div>
    )
  );
};

export default AccountantPage;
