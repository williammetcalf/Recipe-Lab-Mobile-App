import * as SplashScreen from "expo-splash-screen";
import firebase from "firebase";
import { useEffect } from "react";

function useWaitForInitialAuthState() {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const unsub = firebase.auth().onAuthStateChanged(async (s) => {
          await SplashScreen.hideAsync();
          unsub();
        });
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);
}

export default useWaitForInitialAuthState;
