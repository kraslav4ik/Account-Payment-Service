import { List, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { handleError } from "../../Service/Ajax";
import { getAllPayments } from "../../Service/apiCalls";
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
        setPayments(<List style={{width: "100%", margin: 'auto'}}>{paymentCards}</List>);
      })
      .catch((failedResponse) => handleError(failedResponse));
  };
  useEffect(() => {
    const period = searchParams.get("period");
    const filteredEmail = searchParams.get("email");
    getPaymentsCards(period, filteredEmail);
  }, []);

  return payments;
};

export default AccountantPage;
