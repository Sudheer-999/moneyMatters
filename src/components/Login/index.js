import "./index.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [userId, setUserId] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [fieldError, setFieldError] = useState("");

  const [isMailValid, setIsMailValid] = useState(true);

  const navigate = useNavigate();

  const onEmail = (event) => {
    setEmail(event.target.value);
    const isValid = isEmailValid(event.target.value);
    setIsMailValid(isValid);
  };

  const onPassword = (event) => {
    setPassword(event.target.value);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginSuccess = useCallback(() => {
    Cookies.set("loginId", userId, { expires: 7 });
    navigate("/");
  }, [navigate, userId]);

  useEffect(() => {
    if (userId !== "") {
      handleLoginSuccess();
    }
  }, [userId, handleLoginSuccess]);

  const onLogin = async (event) => {
    event.preventDefault();
    const credentials = { email, password };

    const url = "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";

    const headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    };

    const response = await axios.post(url, credentials, { headers });

    const responseData = await response.data;
    const { get_user_id } = responseData;

    if (get_user_id.length !== 0) {
      const id = get_user_id[0].id;
      setUserId(id);
    } else {
      setErrorMsg((errorMsg: "Incorrect Details"));
    }

    if (email === "" || password === "") {
      setFieldError("This field is required");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={onLogin}>
        <img
          src="https://res.cloudinary.com/djzsbpran/image/upload/v1690601481/Frame_507_rs1im3.png"
          alt="site-logo"
          className="login-logo"
        />
        <label>
          <span className="aster">* </span>Email
        </label>
        <input
          type="text"
          value={email}
          onChange={onEmail}
          className="email-input"
        />
        {email === "" && <p className="err">{fieldError}</p>}
        {isMailValid === false && (
          <p className="err">Enter valid email address</p>
        )}
        <label>
          <span className="aster">* </span>Password
        </label>
        <input
          type="password"
          value={password}
          onChange={onPassword}
          className="email-input"
        />
        {password === "" && <p className="err">{fieldError}</p>}
        <div className="button-container">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
