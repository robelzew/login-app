import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

function Login({ setUser }) {
  const [type, setType] = useState("username");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ type, value, password })
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      setUser(data.user);

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">

      <select onChange={e => setType(e.target.value)}>
        <option value="username">Username</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>

      <input
        placeholder={`Enter your ${type}`}
        onChange={e => setValue(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

<div style={{ marginTop: "15px" }}>
  <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          credential: credentialResponse.credential
        })
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      setUser(data.user);

    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  }}
  onError={() => console.log("Google Login Failed")}
/>
</div>
    </form>
  );
}

export default Login;