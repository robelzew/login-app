import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [page, setPage] = useState("signup");
  const [user, setUser] = useState(null);

  // ✅ Auto login with token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: token,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setUser(data.user);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="app-container">
      <div className="card">

        {user ? (
          <>
            <h2>Welcome, {user.fullName} 👋</h2>

            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Phone: {user.phone || "Not provided"}</p>
            <p className="sub-text">You are logged in.</p>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                setPage("login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {page === "signup" ? (
              <>
                <h2>Create Account</h2>
                <Signup setPage={setPage} />

                <p className="switch-text">
                  Already have an account?
                  <button onClick={() => setPage("login")}>
                    Login
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2>Login</h2>
                <Login setUser={setUser} />

                <p className="switch-text">
                  Don’t have an account?
                  <button onClick={() => setPage("signup")}>
                    Sign Up
                  </button>
                </p>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default App;