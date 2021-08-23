import React, { FC } from "react";
import { Button } from "react-native-paper";
import { useGlobalLoading } from "../../../components/GlobalLoading";
import firebase from "firebase";

export interface AnonAuthButtonProps {}

const AnonAuthButton: FC<AnonAuthButtonProps> = (props) => {
  const {} = props;
  const [loading, setLoading] = useGlobalLoading();

  return (
    <Button
      color="white"
      mode="contained"
      onPress={async () => {
        try {
          setLoading(true);
          await firebase.auth().signInAnonymously();
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }}
      labelStyle={{
        fontSize: 18,
        paddingVertical: 10,
      }}
      style={{ width: "100%" }}
      disabled={loading}
    >
      Skip Logging In
    </Button>
  );
};

export default AnonAuthButton;
