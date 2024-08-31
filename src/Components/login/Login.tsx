import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((err) => {
      alert(err.messaage);
    });
  };

  return (
    <Container>
      <LoginLogo>
        <img src='./discordIcon.png' alt='' />
      </LoginLogo>

      <Button onClick={signIn}>Login</Button>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 30px;

  button {
    width: 200px;
    background-color: #738adb;
    color: #eff2f5;

    &:hover {
      background-color: black;
      color: #738adb;
    }
  }
`;

const LoginLogo = styled.div`
  img {
    object-fit: cover;
    height: 150px;
  }
`;
