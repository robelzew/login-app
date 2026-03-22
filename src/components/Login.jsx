import { useState } from "react";

function Login({ setUser }) {
  const [type, setType] = useState("username");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) => u[type] === value && u.password === password
    );

    if (found) {
      console.log("User logged in:", found);
      setUser(found);
    } else {
      console.log("Login failed attempt");
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="username">Username</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>

      <input
        placeholder={`Enter your ${type}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="button"
        className="small-btn"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide Password" : "Show Password"}
      </button>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;