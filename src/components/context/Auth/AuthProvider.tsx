import React, { useReducer, useEffect } from "react";
import { AuthAPI, Provider } from "./AuthContext";
import { gql } from "apollo-boost";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Me } from "../../../generated/Me";
import { Login } from "../../../generated/Login";
import { authReducer, ActionType } from "./AuthReducer";

interface Props {
  children: React.ReactNode;
}

const ME = gql`
  query Me {
    me {
      username
      confirmed
      email
      id
      role
    }
  }
`;

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`;

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispath] = useReducer(authReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
    me: null,
  });

  useEffect(() => {
    state.isAuthenticated && !state.me && getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuthenticated, state.me]);

  const [getMe] = useLazyQuery<Me>(ME, {
    onCompleted({ me }) {
      dispath({ type: ActionType.ME_SUCCESS, payload: me });
    },
    onError() {
      dispath({ type: ActionType.ME_FAILED });
    },
  });

  const [login] = useMutation<Login>(LOGIN, {
    onCompleted({ login: token }) {
      dispath({ type: ActionType.LOGIN_SUCCESS, payload: token });
    },
    onError() {
      dispath({ type: ActionType.LOGIN_FAILED });
    },
  });

  const api: AuthAPI = {
    login: (data) => login({ variables: { input: data } }),
    logout: () => {
      dispath({ type: ActionType.LOGOUT });
    },
    ...state,
  };

  return <Provider value={api}>{children}</Provider>;
};

export default AuthProvider;
