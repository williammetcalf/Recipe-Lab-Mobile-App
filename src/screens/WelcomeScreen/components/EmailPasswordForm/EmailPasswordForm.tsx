import React, { FC, useRef, useState } from "react";
import {
  StyleProp,
  TextInput as NativeTextInput,
  View,
  ViewStyle,
} from "react-native";
import { Divider, Subheading } from "react-native-paper";
import { useGlobalLoading } from "../../../../components/GlobalLoading";
import ExistingAccountForm from "./ExistingAccountForm";
import NewAccountForm from "./NewAccountForm";

export interface EmailPasswordFormProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const EmailPasswordForm: FC<EmailPasswordFormProps> = (props) => {
  const { containerStyle } = props;
  const [loading, setLoading] = useGlobalLoading();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const passwordRef = useRef<NativeTextInput>(null);

  return (
    <View style={[{ width: "100%" }, containerStyle]}>
      <Subheading style={{ paddingLeft: 8 }}>
        {mode === "existing"
          ? "Sign in with existing account"
          : "Create a new account"}
      </Subheading>

      <Divider style={{ marginVertical: 8 }} />
      {mode === "existing" ? (
        <ExistingAccountForm onModeChange={setMode} />
      ) : (
        <NewAccountForm onModeChange={setMode} />
      )}
      <Divider style={{ marginVertical: 8 }} />
    </View>
  );
};

export default EmailPasswordForm;
