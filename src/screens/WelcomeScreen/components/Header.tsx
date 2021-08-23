import React, { FC } from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import Logo from "../../../assets/logo.svg";

export interface HeaderProps {}

const Header: FC<HeaderProps> = (props) => {
  const {} = props;

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 75,
        paddingLeft: "10%",
        height: 150,
      }}
    >
      <Logo width={100} height={100} />
      <Title
        style={{
          fontSize: 40,
          lineHeight: 45,
          paddingLeft: 12,
        }}
      >
        Recipe Lab
      </Title>
    </View>
  );
};

export default Header;
