import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [page, setPage] = useState("signup");
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      <div className="card">

        {user ? (
          <>
            <h2>Welcome, {user.fullName} 👋</h2>
            <p className="sub-text">You are successfully logged in.</p>

            <button
              onClick={() => {
                console.log("User logged out");
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
                  <button
                    className="switch-btn"
                    onClick={() => setPage("login")}
                  >
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
                  <button
                    className="switch-btn"
                    onClick={() => setPage("signup")}
                  >
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