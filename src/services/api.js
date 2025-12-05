const BASE = "https://jsonplaceholder.typicode.com";

async function request(path) {
  const res = await fetch(BASE + path);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "API error");
  }
  return res.json();
}

export const api = {
  getPosts: () => request("/posts"),
  getPost: (id) => request(`/posts/${id}`),
  getPostComments: (id) => request(`/posts/${id}/comments`),
  getUsers: () => request("/users"),
  getUser: (id) => request(`/users/${id}`),
  getUserPosts: (id) => request(`/users/${id}/posts`),
  getUserComments: (id) => request(`/users/${id}/comments`),
};
