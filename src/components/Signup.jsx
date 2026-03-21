import { useState } from "react";

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const duplicate = users.find(
      (u) =>
        u.username === form.username ||
        u.email === form.email ||
        u.phone === form.phone
    );

    if (duplicate) {
      alert("User already exists!");
      return;
    }

    localStorage.setItem("users", JSON.stringify([...users, form]));
    alert("Signup successful!");

    setForm({
      fullName: "",
      username: "",
      email: "",
      phone: "",
      password: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />

      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        👁 {showPassword ? "Hide" : "Show"} Password
      </button>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;