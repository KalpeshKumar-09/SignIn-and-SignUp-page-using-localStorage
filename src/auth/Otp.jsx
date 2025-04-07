import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [generateOtp, setGenerateOtp] = useState("");
  const [timer, setTimer] = useState(25);
  const navigate = useNavigate();

  const generateNewOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000);
    setGenerateOtp(newOtp);
    // alert(`Your OTP is: ${newOtp}`);
    setTimer(25);
  };

  useEffect(() => {
    generateNewOtp();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          generateNewOtp();
          return 25;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (otp === generateOtp.toString()) {
      alert("OTP Verified Successfully!");
      navigate("/dashboard", { replace: true });
    } else {
      alert("Invalid OTP!");
      navigate("/", { replace: true });
    }
  };

  return (
    <div>
      <div>
        <h2>OTP Verification</h2>
        <form onSubmit={handleVerify} method="post">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
        {generateOtp && (
          <div>
            <p>Your OTP is {generateOtp}</p>
            <p>OTP expires in: {timer} seconds</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Otp;
