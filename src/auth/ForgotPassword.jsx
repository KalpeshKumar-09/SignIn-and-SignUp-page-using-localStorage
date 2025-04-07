import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(25);
  const navigate = useNavigate();

  const handleVerifyEmail = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    const matchEmail = user.find((u) => u.email === email);
    if (matchEmail) {
      setStep(2);
    } else {
      alert("Email not found!");
    }
  };

  const handleOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(newOtp);
    setTimer(25);
  };

  useEffect(() => {
    handleOtp();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleOtp();
          return 25;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (otp === generatedOtp.toString()) {
      setStep(3);
    } else {
      alert("Invalid OTP!");
    }
  };

  const handlePassword = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    const updatedPassword = user.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedPassword));
    alert("Password changed successfully!");
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div>
        <h1>Forgot Password</h1>
        {step === 1 && (
          <div>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleVerifyEmail} type="submit">
              verify email
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerify} type="submit">
              Verify
            </button>
            {generatedOtp && (
              <div>
                <p>Your OTP is {generatedOtp}</p>
                <p>OTP expires in: {timer} seconds</p>
              </div>
            )}
          </div>
        )}
        {step === 3 && (
          <div>
            <input
              type="password"
              placeholder="Enter new Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePassword} type="submit">
              Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
