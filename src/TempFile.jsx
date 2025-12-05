import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";

export default function App() {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="brand">Blogs App</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/users">Users</Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </main>
    </div>
  );
}
