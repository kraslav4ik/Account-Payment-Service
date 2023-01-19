import { Input } from "antd";
import { useEffect, useState } from "react";
import { getAdminTable } from "../Service/apiCalls";
import EventHandler from "../EventHandler";
import UserTable from "./UserTable";

const { Search } = Input;

const AdminPage = () => {
  const [filterText, setFilterText] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userRecordsToSet = getAdminTable();
    if (userRecordsToSet) {
      setUsers(userRecordsToSet);
    } else {
      EventHandler.dispatch("logout");
    }
  }, []);
  return (
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
      <Search
        style={{ maxWidth: "50%", margin: "auto" }}
        placeholder="Input user email..."
        onSearch={() => null}
        onChange={(val) => setFilterText(val)}
        enterButton
      />
      <UserTable users={users} />
    </div>
  );
};

export default AdminPage;
