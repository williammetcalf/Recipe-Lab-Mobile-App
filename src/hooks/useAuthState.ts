import { useEffect, useState } from "react";
import firebase from "firebase";

function useAuthState() {
  const [authenticated, setAuthenticated] = useState<null | firebase.User>(
    null
  );
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setAuthenticated);
  }, [setAuthenticated]);

  return authenticated;
}

export default useAuthState;
