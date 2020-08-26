import React from "react";
import UnloggedHeader from "../headers/UnloggedHeader";
import Login from "./Login";

interface Props {}

const UnloggedApp: React.FC<Props> = (props) => {
  return (
    <>
      <UnloggedHeader />
      <Login />
    </>
  );
};

export default UnloggedApp;
