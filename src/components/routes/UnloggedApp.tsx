import React from "react";
import UnloggedHeader from "../headers/UnloggedHeader";
import LoginForm from "./LoginForm";

interface Props {}

const UnloggedApp: React.FC<Props> = (props) => {
  return (
    <>
      <UnloggedHeader />
      <LoginForm />
    </>
  );
};

export default UnloggedApp;
