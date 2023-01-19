import { List } from "antd";
import UserCard from "./UserCard";

const UserTable = (props) => {
  const users = props.users;
  const rows = [];
  if (users.length !== 0) {
    users.forEach((u) =>
      rows.push(
        <List.Item>
          <UserCard currentUser={u} />
        </List.Item>
      )
    );
  } else {
    rows.push(<h3>No users found</h3>);
  }

  return <List style={{width: "80%", margin: "auto"}}>{rows}</List>;
};

export default UserTable;
