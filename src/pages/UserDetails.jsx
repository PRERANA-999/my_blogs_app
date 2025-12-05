import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import Spinner from "../components/Spinner";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all([api.getUser(id), api.getUserPosts(id)])
      .then(([u, p]) => {
        setUser(u);
        setPosts(p);
      });
  }, [id]);

  if (!user) return <Spinner />;

  return (
    <div>
      <Link to="/users">← Back</Link>

      <h2>{user.name}</h2>
      <p className="muted">{user.email}</p>

      <h3>Blogs by this user</h3>

      {posts.map(post => (
        <div key={post.id} className="card small">
          <h4>{post.title}</h4>
          <Link to={`/blogs/${post.id}`} className="link">Open</Link>
        </div>
      ))}
    </div>
  );
}
