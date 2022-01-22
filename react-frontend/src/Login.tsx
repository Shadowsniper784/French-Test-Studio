import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { FrenchWords } from "./Handler";
interface LoginProps {
  frenchHandler: FrenchWords;
}
export default function Login({ frenchHandler }: LoginProps) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [status, setStatus] = useState("");
  const login = () => {
    frenchHandler.login(loginUsername, loginPassword).then((res: AxiosResponse) => {
      if (res.data.success) {
        setStatus("success");
        setLoginUsername("");
        setLoginPassword("");
      } else {
        setStatus("error");
      }
    })
    .catch(err => {
      setStatus("Error: ", err.message);
    })
  }

  return (
    <div className="text-right ml-auto mr-0 group">
      {frenchHandler.user ? (
        <p id="username">{frenchHandler.user.username}</p>
      ) : (
        <>
          <p>Login</p>
          <div
            className="right-0
          absolute
          flex
          transition-all 
          duration-100 
          scale-0 
          origin-left;
          max-w-[20%] bg-zinc-400 dark:bg-gray-800 flex-col 
          rounded-lg
          items-left justify-center none group-hover:scale-100"
          >
            <input
              className="rounded-t-lg text-text-secondary dark:text-dark-text-secondary
              bg-bg-secondary
              dark:bg-dark-bg-secondary"
              type="text"
              placeholder="Username"
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="text-text-secondary dark:text-dark-text-secondary
              bg-bg-secondary
              dark:bg-dark-bg-secondary"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              className="
              
              left-0
              rounded-b-lg
              bg-bg-secondary 
              dark:bg-dark-bg-secondary 
              hover:bg-bg-hover
              dark:hover:bg-dark-bg-hover"
              onClick={() => login()}
            >
              Login
            </button>

            {status ? <p className="text-left">{status}</p> : <></>}
          </div>
        </>
      )}
    </div>
  );
}
