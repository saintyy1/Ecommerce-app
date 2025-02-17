import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthAction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  useEffect(() => {
    const mode = queryParams.get("mode");
    const oobCode = queryParams.get("oobCode");

    if (!mode || !oobCode) {
      return navigate("/error", { state: { message: "Invalid link" } });
    }

    // Redirect to the correct page based on mode
    if (mode === "resetPassword") {
      navigate(`/reset-password?oobCode=${oobCode}`);
    } else if (mode === "verifyEmail") {
      navigate(`/verify-email?oobCode=${oobCode}`);
    } else {
      navigate("/error", { state: { message: "Invalid action" } });
    }
  }, [navigate, location]);

  return <p>Redirecting...</p>;
};

export default AuthAction;
