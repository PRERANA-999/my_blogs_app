import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog, author }) {
  return (
    <div className="card">
      <h3>{blog.title}</h3>
      <p className="muted">{blog.body.slice(0, 160)}...</p>
      <div className="card-footer">
        <div className="author">By: {author ? author.name : "Unknown"}</div>
        <Link to={`/blogs/${blog.id}`} className="link">View</Link>
      </div>
    </div>
  );
}
