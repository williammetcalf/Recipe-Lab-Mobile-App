import React, { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import firebase from "firebase";
import { useState } from "react";

export interface AuthButtonsProps {
  onSignIn: () => void;
}

const AuthButtons: FC<AuthButtonsProps> = (props) => {
  const { onSignIn } = props;
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
        mode="contained"
        color="white"
        onPress={onSignIn}
        style={{ marginBottom: 10 }}
        disabled={loading}
      >
        Log In
      </Button>
      <Button color="white" onPress={() => {}} disabled={loading}>
        Create Account
      </Button>
      <View style={{ flex: 1 }}></View>
      <Button
        mode="contained"
        onPress={async () => {
          try {
            setLoading(true);
            await firebase.auth().signInAnonymously();
          } catch (err) {
            console.error(err);
            setLoading(false);
          }
        }}
        labelStyle={{
          fontSize: 18,
          paddingVertical: 10,
        }}
        style={{ width: "90%" }}
        disabled={loading}
      >
        Begin
      </Button>
    </>
  );
};

export default AuthButtons;
