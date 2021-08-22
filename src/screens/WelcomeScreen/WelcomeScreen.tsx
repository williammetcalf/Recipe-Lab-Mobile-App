import React, { FC } from "react";
import { SafeAreaView, Text } from "react-native";
import Logo from "../../assets/logo.svg";

export interface WelcomeScreenProps {}

const WelcomeScreen: FC<WelcomeScreenProps> = (props) => {
  const {} = props;

  return (
    <SafeAreaView>
      <Logo width={"100%"} />
      <Text>Welcome</Text>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
