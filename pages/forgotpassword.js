import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const auth = getAuth();
  const router = useRouter();
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const ResetPasswordHandler = (e) => {
    e.preventDefault();
    setEmailError("");
    if (!emailValue) {
      setEmailError("Field can not be empty");
      return;
    }
    if (!EMAIL_REGEX.test(emailValue)) {
      setEmailError("Invalid Email");
      return;
    }
    sendPasswordResetEmail(auth, emailValue).then(() => {
      alert("Successfully Send to Your email");
    });
  };

  const GoToLogin = () => {
    router.push("/login");
  };

  return (
    <div>
      <div className="login-main-heading">Reset Password</div>
      <div className="login-form-div-container">
        <form onSubmit={ResetPasswordHandler}>
          <div className="login-name-div">
            <input
              className="login-input"
              value={emailValue}
              placeholder="Enter Your Email For Reset Password"
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <div style={{ textAlign: "center", color: "red", margin: "10px auto" }}>
              {emailError}
            </div>
          </div>
          <div id="login-button">
            <Button id="resetpassword-button" type="submit" variant="contained" color="primary">
              Send Request
            </Button>
          </div>
          <div style={{ margin: "1rem auto" }} onClick={GoToLogin} id="signup-login-button">
            Go To Login
          </div>
        </form>
      </div>
    </div>
  );
}
