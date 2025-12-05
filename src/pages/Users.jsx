import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import UserCard from "../components/UserCard";
import Spinner from "../components/Spinner";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    api.getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // 🔍 Filter by search
  let filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔽 Sort Logic
  if (sort === "asc") {
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === "desc") {
    filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div>
      <h1>Users List</h1>

      {/* Search + Sort */}
      <div className="controls">
        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="asc">Name: A → Z</option>
          <option value="desc">Name: Z → A</option>
        </select>
      </div>

      {/* Loading indicator */}
      {loading && <Spinner />}

      {/* Users list */}
      <div className="list">
        {filtered.length > 0 ? (
          filtered.map((u) => <UserCard key={u.id} user={u} />)
        ) : (
          <p className="muted">No users found.</p>
        )}
      </div>
    </div>
  );
}
