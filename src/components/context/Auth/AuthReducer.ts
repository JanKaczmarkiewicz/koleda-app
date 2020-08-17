import { Me_me } from "../../generated/Me";

export enum ActionType {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  ME_SUCCESS,
  ME_FAILED,
  LOGOUT,
}

type Action =
  | { type: ActionType.LOGIN_SUCCESS; payload: string }
  | { type: ActionType.LOGIN_FAILED }
  | { type: ActionType.LOGOUT }
  | { type: ActionType.ME_SUCCESS; payload: Me_me }
  | { type: ActionType.ME_FAILED };

export type State = { isAuthenticated: boolean; me: Me_me | null };

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return { ...state, isAuthenticated: true, me: null };

    case ActionType.ME_SUCCESS:
      return { ...state, isAuthenticated: true, me: action.payload };

    case ActionType.LOGOUT:
    case ActionType.LOGIN_FAILED:
    case ActionType.ME_FAILED:
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, me: null };

    default:
      throw new Error("Unsupported action!");
  }
};
