import React from "react";
import { Me_me } from "../../generated/Me";
import LoggedHeader from "../headers/LoggedHeader";
import Main from "./Main";

interface Props {
  me: Me_me;
}

const LoggedApp: React.FC<Props> = (props) => {
  return (
    <>
      <LoggedHeader />
      <Main />
    </>
  );
};

export default LoggedApp;
