import React from "react";

const UsersList = ({users}) => {
  return (
    <div className="users-list">
      <h3>Users List</h3>
      <ul className="users">
        {users.map((user) => {
          <li>
            <div className={`user ${user.online ? "active" : ""}`}>
              <span className="sender">{user.username}</span>
            </div>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default UsersList;
