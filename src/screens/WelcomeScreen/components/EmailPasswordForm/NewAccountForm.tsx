import firebase from "firebase";
import React, { FC, useCallback, useRef, useState } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { useGlobalLoading } from "../../../../components/GlobalLoading";
import TextInput from "../../../../components/TextInput";
import FormButtons from "./FormButtons";

export interface NewAccountFormProps {
  onModeChange: (mode: "existing" | "new") => void;
}

const NewAccountForm: FC<NewAccountFormProps> = (props) => {
  const { onModeChange } = props;
  const [loading, setLoading] = useGlobalLoading();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const passwordRef = useRef<NativeTextInput>(null);
  const passwordRepeatRef = useRef<NativeTextInput>(null);

  const createAccount = useCallback(() => {
    const doCreate = async () => {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    return doCreate();
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
        onSubmitEditing={() => passwordRepeatRef.current?.focus()}
        ref={passwordRef}
      />
      <TextInput
        icon="key"
        autoCompleteType="password"
        placeholder="Password (confirm)"
        secureTextEntry
        editable={!loading}
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
        ref={passwordRepeatRef}
        error={!!passwordRepeat && password !== passwordRepeat}
      />
      <FormButtons
        primaryLabel="Create Account"
        primaryAction={createAccount}
        primaryDisabled={!password || password !== passwordRepeat}
        secondaryLabel="Sign In"
        secondaryAction={() => onModeChange("existing")}
        invertButtons
      />
    </>
  );
};

export default NewAccountForm;
