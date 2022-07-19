import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import "../styles/pages/login.css";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth-context";
import { useState, useRef } from "react";
import axios from "axios";

export const Login = () => {
  const { auth, setAuth } = useAuth();
  const [passwordType, setPasswordType] = useState("password");
  const [testData, setTestData] = useState({ email: "", password: "" });
  const editLoginForm = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const handleLoginForm = (e) => {
    e.preventDefault();
    const form = editLoginForm.current;
    sendLoginRequest({
      email: form["emailId"].value,
      password: form["passwordField"].value,
    });
    editLoginForm.current.reset();
  };

  const sendLoginRequest = async (loginData) => {
    try {
      const response = await axios.post("/api/auth/login", loginData);
      localStorage.setItem("userData", JSON.stringify(response.data.foundUser));
      localStorage.setItem("token", response.data.encodedToken);
      setAuth({
        ...auth,
        token: response.data.encodedToken,
        isLoggedIn: true,
      });

      setTestData({ email: "", password: "" });
      toast.success("Login Success");
      navigate(from, { replace: true });
    } catch (error) {
      console.log("Login Error", error);
      toast.error("Login Failed");
    }
  };
  return (
    <>
      <Navbar />

      <form
        ref={editLoginForm}
        className="login-container flex-column-center pd-y-md"
        onSubmit={(e) => handleLoginForm(e)}
      >
        <div className="login-card">
          {/* Heading */}
          <h2 className="text-center mg-xsm">Login</h2>
          {/* Email-id */}
          <div className="email-id-item mg-xsm flex-column fw-bold">
            <label htmlFor="email-id" className="mg-bottom-xsm">
              Email address
            </label>
            <input
              type="email"
              id="email-id"
              name="emailId"
              className="mg-bottom-xsm"
              defaultValue={testData.email}
              placeholder="xyz@gmail.com"
              required
            />
          </div>
          {/* Password */}
          <div className="password-item mg-xsm flex-column fw-bold">
            <label htmlFor="password" className="mg-bottom-xsm">
              Password
            </label>
            <input
              type={passwordType}
              id="password"
              name="passwordField"
              defaultValue={testData.password}
              className="mg-bottom-xsm"
              minLength="8"
              required
            />
            <i
              className="material-icons login-pwd-show-icon"
              onClick={() =>
                setPasswordType((passwordType) =>
                  passwordType === "password" ? "text" : "password"
                )
              }
            >
              {passwordType === "password" ? "visibility_off" : "visibility"}
            </i>
            <Link to="/login" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          {/*  Remember Me  */}
          <div className="remember-item mg-xsm fw-bold align-center">
            <input type="checkbox" className="mg-xsm" id="remember" />
            <label htmlFor="terms">Remember Me</label>
          </div>
          {/* Buttons */}
          <button
            type="submit"
            className="btn btn-solid fw-bold primary-bg-color"
          >
            LOGIN
          </button>
          <button
            type="submit"
            className="btn-outline btn fw-bold indigo-color"
            onClick={() =>
              setTestData({
                email: "kedar@gmail.com",
                password: "kedarInGoa@123",
              })
            }
          >
            Login with Test Credentials
          </button>
          <Link to="/signup" className="btn btn-outline-icon fw-bold">
            Create New Account<i className="material-icons">chevron_right</i>
          </Link>
        </div>
      </form>
    </>
  );
};
