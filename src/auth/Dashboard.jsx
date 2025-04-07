import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/", { replace: true });
  };
  return (
    <div>
      <div>
        <h2>Welcome to Dashboard</h2>
        <p>You are successfully logged in!</p>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
