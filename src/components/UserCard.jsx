import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <div className="card small">
      <div className="user-row">
        <div>
          <strong>{user.name}</strong>
          <div className="muted">{user.email}</div>
        </div>
        <Link to={`/users/${user.id}`} className="link">View Details</Link>
      </div>
    </div>
  );
}
