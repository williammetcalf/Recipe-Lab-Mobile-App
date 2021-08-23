import React, { FC, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import firebase from "firebase";
import { Button } from "react-native-paper";

export interface GoogleAuthButtonProps {}
WebBrowser.maybeCompleteAuthSession();

const GoogleAuthButton: FC<GoogleAuthButtonProps> = (props) => {
  const {} = props;
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "466072557074-qa9ve2fq8pbtb8ojb9lvd5ibctvnujlf.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  return (
    <Button disabled={!request} mode="contained" onPress={promptAsync}>
      Sign In With Google
    </Button>
  );
};

export default GoogleAuthButton;
