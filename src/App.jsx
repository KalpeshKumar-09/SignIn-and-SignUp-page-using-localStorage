import Dashboard from "./auth/Dashboard";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import Otp from "./auth/Otp";
import Register from "./auth/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicROutes from "./routes/PublicROutes";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PublicROutes />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<Otp />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
