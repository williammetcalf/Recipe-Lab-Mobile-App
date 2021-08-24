import { createContext, useContext } from "react";
import firebase from "firebase";

export const CurrentUserContext = createContext<firebase.User>(null as never);

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
