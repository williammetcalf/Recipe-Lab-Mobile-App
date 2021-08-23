import React, { FC, useRef, useState } from "react";
import { useGlobalLoading } from "../../../../components/GlobalLoading";
import TextInput from "../../../../components/TextInput";
import { TextInput as NativeTextInput } from "react-native";
import { Text } from "react-native-paper";
import FormButtons from "./FormButtons";
import { useCallback } from "react";
import firebase from "firebase";

export interface ExistingAccountFormProps {
  onModeChange: (mode: "existing" | "new") => void;
}

const ExistingAccountForm: FC<ExistingAccountFormProps> = (props) => {
  const { onModeChange } = props;
  const [loading, setLoading] = useGlobalLoading();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef<NativeTextInput>(null);

  const signIn = useCallback(() => {
    const doSignIn = async () => {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    };

    return doSignIn();
  }, [setLoading, email, password]);

  return (
    <>
      <TextInput
        icon="account"
        keyboardType="email-address"
        autoCompleteType="email"
        placeholder="Email Address"
        returnKeyType="next"
        editable={!loading}
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextInput
        icon="key"
        autoCompleteType="password"
        placeholder="Password"
        secureTextEntry
        editable={!loading}
        value={password}
        onChangeText={setPassword}
        ref={passwordRef}
      />
      <Text
        style={{
          marginLeft: 32,
          marginBottom: 12,
          textDecorationLine: "underline",
        }}
        onPress={() => {
          // firebase.auth().sendPasswordResetEmail("williamdmetcalf@gmail.com");
          alert("Not Yet Implemented");
        }}
      >
        Forgot your password?
      </Text>
      <FormButtons
        primaryLabel="Sign In"
        primaryAction={signIn}
        secondaryLabel="New Account"
        secondaryAction={() => onModeChange("new")}
      />
    </>
  );
};

export default ExistingAccountForm;
