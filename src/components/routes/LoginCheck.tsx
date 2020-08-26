import React from "react";
import { useAuthContext } from "@koleda/common-context";
import LoggedApp from "./LoggedApp";
import UnloggedApp from "./UnloggedApp";

const LoginCheck = () => {
  const { me } = useAuthContext();
  return me ? <LoggedApp me={me} /> : <UnloggedApp />;
};

export default LoginCheck;
