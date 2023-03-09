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
  const [paymentsRecords, setPaymentsRecords] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const rows = [];
    const period = searchParams.get("period");
    const filteredEmail = searchParams.get("email");
    if (paymentsRecords) {
      paymentsRecords.forEach((p) => {
        if (
          (!period || dayjs(p.period).isSame(dayjs(period, monthFormat))) &&
          (!filteredEmail || p.email.includes(filteredEmail))
        ) {
          rows.push(
            <List.Item key={`${p.email}, ${p.period}`}>
              <PaymentCard currentPayment={p} />
            </List.Item>
          );
        }
      });
      if (!rows.length) {
        setFilteredRecords(
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
      setFilteredRecords(
        <List style={{ width: "100%", margin: "auto" }}>{rows}</List>
      );
    }
  }, [searchParams, paymentsRecords]);
  useEffect(() => {
    getAllPayments()
      .then((infoFromRequest) => setPaymentsRecords(infoFromRequest))
      .catch((failedResponse) => handleError(failedResponse));
  }, []);

  return (
    paymentsRecords !== null && (
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Row justify="center" align="middle" style={{ width: "100%" }}>
          <Col span={12}>
            <Input.Group compact style={{ width: "100%" }}>
              <Input
                placeholder="Input email"
                style={{ width: "50%" }}
                defaultValue={searchParams.get("email")}
                onChange={(t) => {
                  t.target.value.length
                    ? searchParams.set("email", t.target.value)
                    : searchParams.delete("email");
                  setSearchParams(searchParams);
                }}
              ></Input>
              <DatePicker
                defaultValue={
                  searchParams.get("period")
                    ? dayjs(searchParams.get("period"), monthFormat)
                    : null
                }
                format={monthFormat}
                picker="month"
                style={{ width: "50%" }}
                onChange={(date, dateString) => {
                  dateString
                    ? searchParams.set("period", dateString)
                    : searchParams.delete("period");
                  setSearchParams(searchParams);
                }}
              ></DatePicker>
            </Input.Group>
          </Col>
          <Col span={5} offset={1}>
            <AddNewPaymentsButton />
          </Col>
        </Row>
        {filteredRecords}
      </div>
    )
  );
};

export default AccountantPage;
