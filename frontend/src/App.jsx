import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

 return (
  <div className="layout">
    {/* LEFT SIDE - USER LIST */}
    <div className="left-panel">
      <h1>User List</h1>
      <p className="subtitle">Testing-9-deploy</p>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* RIGHT SIDE - CENTERED FORM */}
    <div className="right-panel">
      <div className="form-card">
        <form onSubmit={addUser} className="form">
          <h2>Add User</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  </div>
);
}

export default App;