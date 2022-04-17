import "../styles/pages/home.css";
import "../styles/utils/variable.css";
import "../styles/pages/login.css";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <Navbar />

      <div className="login-container flex-column-center pd-y-md">
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
              className="mg-bottom-xsm"
              placeholder="xyz@gmail.com"
            />
          </div>
          {/* Password */}
          <div className="password-item mg-xsm flex-column fw-bold">
            <label htmlFor="password" className="mg-bottom-xsm">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mg-bottom-xsm"
              minLength="8"
            />
            <i className="material-icons login-pwd-show-icon">visibility</i>
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
          <a href="" className="btn btn-solid fw-bold primary-bg-color">
            LOGIN
          </a>
          <Link to="/home" className="btn btn-outline fw-bold primary-color">
            Login with Test Credentials (Go to Home Page)
          </Link>
          <Link
            to="/signup"
            className="btn btn-outline-icon fw-bold primary-color"
          >
            Create New Account<i className="material-icons">chevron_right</i>
          </Link>
        </div>
      </div>
    </>
  );
};
