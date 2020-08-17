import { createContext } from "../util";
import { State } from "./AuthReducer";

type LoginCredensials = { email: string; password: string };

export type AuthAPI = {
  login: (loginCredensials: LoginCredensials) => void;
  logout: () => void;
} & State;

const { useContext: useAuthContext, Provider } = createContext<AuthAPI>();

export { useAuthContext, Provider };
