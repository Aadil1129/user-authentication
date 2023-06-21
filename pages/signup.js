import React, { useEffect, useState } from "react";
import Image from "next/image";
import GoogleLogo from "../public/images/google.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { auth } from "../firebaseconfig";
import { setuser } from "../store/slice/userdetail";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    if (!emailValue) {
      setEmailError("Field can not be empty");
      return;
    }
    if (!EMAIL_REGEX.test(emailValue)) {
      setEmailError("Invalid Email");
      return;
    }
    if (!values.password) {
      setPasswordError("Feild can not be empty");
      return;
    }
    if (values.password.length < 6) {
      setPasswordError("Password length must be larger than 6 ");
      return;
    }
    createUserWithEmailAndPassword(auth, emailValue, values.password)
      .then(() => {
        router.push("/movieApi");
      })
      .catch((err) => {
        alert(err.message);
      });

    // console.log(emailValue, values.password, "values");
  };
  useEffect(() => {
    auth.onAuthStateChanged((value) => {
      dispatch(setuser(value));
    });
  }, []);
  const GoogleHandler = () => {
    signInWithPopup(auth, provider).then(() => {
      router.push("/movieApi");
    }).catch = (err) => {
      alert(err.message);
    };
  };
  const GoToLogin = () => {
    router.push("/login");
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="login-main-heading">SignUp here</div>

      <div className="login-form-div-container">
        <div className="signup-google-button" onClick={GoogleHandler}>
          <Image src={GoogleLogo} height="40" width="40" />
          <div className="login-google-text">SignIn With Google</div>
        </div>
        <form className="" onSubmit={(e) => HandleSubmit(e)}>
          <div className="login-name-div">
            <input
              className="login-input"
              value={emailValue}
              placeholder="Enter Your Email"
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <div style={{ textAlign: "center", color: "red", margin: "10px auto" }}>
              {emailError}
            </div>
          </div>
          <div className="login-password-div">
            <input
              id="login-password"
              placeholder="Enter Your Password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
            />
            <IconButton onClick={handleClickShowPassword}>
              {values.showPassword ? (
                <Visibility
                  style={{
                    color: "rgba(91, 91, 91)",
                    fontSize: "1.325rem",
                  }}
                />
              ) : (
                <VisibilityOff
                  style={{
                    color: "rgba(91, 91, 91)",
                    fontSize: "1.325rem",
                  }}
                />
              )}
            </IconButton>
          </div>
          <div style={{ textAlign: "center", color: "red", margin: "10px auto" }}>
            {passwordError}
          </div>
          <div id="login-button">
            <Button
              style={{ width: "40%", borderRadius: "4rem" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              SignUp
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "1rem auto",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <div>Already have an account?</div>
            <div onClick={GoToLogin} id="signup-login-button">
              Login
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
