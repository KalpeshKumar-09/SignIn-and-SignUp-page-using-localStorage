import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      error.name = "Enter username";
    }

    if (!email.trim()) {
      error.email = "Enter email";
    } else if (!emailRegex.test(email)) {
      error.email = "Invalid email";
    }

    if (!password.trim()) {
      error.password = "Enter password";
    } else if (password.length < 8) {
      error.password = "Password should be greater than 8";
    } else if (password.length > 12) {
      error.password = "Password should be less than 12";
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const existUser = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existUser.find((user) => user.email === email);

      if (userExists) {
        setErrors({ email: "Email already registered" });
      } else {
        existUser.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(existUser));
        console.log("Form submitted successfully!");
        navigate("/", { replace: true });

        // Clear Form
        setName("");
        setEmail("");
        setPassword("");
        setErrors({});
      }
    }
  };

  return (
    <div>
      <div>
        <h1>Register</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
