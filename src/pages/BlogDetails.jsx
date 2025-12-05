import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import Spinner from "../components/Spinner";

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getPost(id),
      api.getPostComments(id)
    ]).then(async ([p, comments]) => {
      setPost(p);
      setComments(comments);
      const user = await api.getUser(p.userId);
      setAuthor(user);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="back"><Link to="/blogs">← Back</Link></div>

      <h2>{post.title}</h2>
      <div className="muted">By: {author?.name}</div>

      <p>{post.body}</p>

      <h3>Comments</h3>
      {comments.map(c => (
        <div key={c.id} className="comment">
          <strong>{c.name}</strong>
          <div className="muted">{c.email}</div>
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  );
}
