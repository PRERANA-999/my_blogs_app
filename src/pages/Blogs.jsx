import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getPosts(), api.getUsers()])
      .then(([posts, users]) => {
        setBlogs(posts);
        setUsers(users);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function getAuthor(userId) {
    return users.find((u) => u.id === userId);
  }

  if (!users.length) return blogs;  // make sure authors are loaded first

const filtered = blogs.filter((b) => {
  const text = search.toLowerCase();

  const titleMatch = b.title.toLowerCase().includes(text);

  const author = users.find((u) => u.id === b.userId);
  const authorMatch =
    author && author.name.toLowerCase().includes(text);

  return titleMatch || authorMatch;
});


  const sorted = filtered.slice().sort((a, b) => {
    if (sort === "title-asc") return a.title.localeCompare(b.title);
    if (sort === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <div>
      <h1>List of Blogs</h1>

      <div className="controls">
        <input
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
        </select>
      </div>

      {loading && <Spinner />}
      {error && <div className="error">{error}</div>}

      <div className="list">
        {sorted.map((b) => (
          <BlogCard key={b.id} blog={b} author={getAuthor(b.userId)} />
        ))}
      </div>
    </div>
  );
}
