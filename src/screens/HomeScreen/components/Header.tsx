import React, { FC } from "react";
import { IconButton, Surface, Title, useTheme } from "react-native-paper";
import Color from "color";
import { useMemo } from "react";

export interface HeaderProps {}

const Header: FC<HeaderProps> = (props) => {
  const {} = props;
  const { colors } = useTheme();
  const { background } = colors;
  const headerColor = useMemo(
    () => Color(background).alpha(0.2).toString(),
    [background]
  );

  return (
    <Surface
      style={{
        position: "absolute",
        zIndex: 100,
        top: 0,
        paddingTop: 60,
        paddingBottom: 10,
        paddingHorizontal: 12,
        left: 0,
        width: "100%",
        backgroundColor: headerColor,
        shadowOpacity: 0,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Title style={{ fontSize: 35, lineHeight: 35 }}>Recipes</Title>
      <IconButton icon="account" />
    </Surface>
  );
};

export default Header;
