import { Input, List, Typography } from "antd";
import { useEffect, useState } from "react";
import { getAdminTable } from "../../Service/apiCalls";
import { handleError } from "../../Service/Ajax";
import { useSearchParams } from "react-router-dom";
import UserCard from "./UserCard";

const { Title } = Typography;

const AdminPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [users, setUsers] = useState(null);
  const filterText = searchParams.get("email");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const rows = [];
    if (users && users.length !== 0) {
      users.forEach((u) => {
        if (!filterText || u.email.includes(filterText)) {
          rows.push(
            <List.Item key={`User ${u.id}`}>
              <UserCard currentUser={u} />
            </List.Item>
          );
        }
      });
      if (rows.length === 0) {
        setFilteredUsers(
          <Title
            level={2}
            style={{ width: "100%", margin: "auto", textAlign: "center" }}
          >
            No users found
          </Title>
        );
        return;
      }
      setFilteredUsers(
        <List style={{ width: "80%", margin: "auto" }}>{rows}</List>
      );
    }
  }, [filterText, users]);

  useEffect(() => {
    getAdminTable()
      .then((resp) => setUsers(resp))
      .catch((resp) => handleError(resp));
  }, []);
  return (
    users && (
      <div
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Input
          style={{ maxWidth: "50%", margin: "auto" }}
          placeholder="Input user email..."
          defaultValue={searchParams.get("email")}
          onChange={(t) => {
            if (t.target.value.length) {
              setSearchParams({ email: t.target.value });
            } else {
              setSearchParams({});
            }
          }}
        />
        {filteredUsers}
      </div>
    )
  );
};

export default AdminPage;
