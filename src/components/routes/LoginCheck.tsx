import React from "react";
import { context } from "@koleda/common";
import LoggedApp from "./LoggedApp";
import UnloggedApp from "./UnloggedApp";

const { useAuthContext } = context;

const LoginCheck = () => {
  const { me } = useAuthContext();
  return me ? <LoggedApp me={me} /> : <UnloggedApp />;
};

export default LoginCheck;
