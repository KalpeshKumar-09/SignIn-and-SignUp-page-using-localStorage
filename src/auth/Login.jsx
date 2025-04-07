import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storeUsers = JSON.parse(localStorage.getItem("users")) || [];
    const matchUsers = storeUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!email || !password) {
      setErrors({ message: "Both fields are required" });
    } else if (!matchUsers) {
      setErrors({ message: "Invalid email or password" });
    } else {
      setErrors({});
      localStorage.setItem("loggedInUser", JSON.stringify(matchUsers));
      navigate("/otp", { replace: true });
    }
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          Not registered? <Link to="/register">Register</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
