import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Sidebar from "./Components/sidebar/Sidebar";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./Firebase";
import { login, logout } from "./features/userSlice";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "./utils/ErrorFallBack";
import { LoadSpinner } from "./utils/LoadSpinner";
import styled from "styled-components";

function App() {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return (
      <LoadSpinnerWrapper>
        <LoadSpinner />
      </LoadSpinnerWrapper>
    );
  }

  return (
    <div className='App'>
      {user ? (
        <>
          <ErrorBoundary FallbackComponent={Fallback}>
            <Sidebar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;

const LoadSpinnerWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;
