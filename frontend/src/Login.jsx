import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { message } from "antd";
const Login = ({ onLogin }) => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const handleLogin = async (googleData) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
        email: googleData.email,
        googleId: googleData.googleId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      localStorage.setItem("googleId", googleData.googleId);
      message.success("Loggged in successfully!");
      onLogin();
    } else {
      message.error("Error while logging in!");
    }
  };
  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "250px", height: "50%", marginTop: "15%" }}>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={"single_host_origin"}
            style={{ margin: "0 auto" }}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
