import { useState } from "react";

function Signup({ setPage }) {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    birthday: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔐 VALIDATION FUNCTION
  const validateForm = () => {
    if (form.fullName.length < 3) {
      alert("Full name must be at least 3 characters");
      return false;
    }

    if (form.username.length < 3) {
      alert("Username must be at least 3 characters");
      return false;
    }

    if (!form.email.includes("@")) {
      alert("Invalid email");
      return false;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    if (form.phone && form.phone.length < 9) {
      alert("Invalid phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // ✅ VALIDATION CHECK
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Signup successful!");
      setPage("login");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">

      <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="birthday" type="date" onChange={handleChange} />

      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide Password" : "Show Password"}
      </button>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;