import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import firebase from "firebase";
import React, { FC, useState } from "react";
import { Appbar, Menu, useTheme } from "react-native-paper";
export interface NavBarProps extends NativeStackHeaderProps {}

const NavBar: FC<NavBarProps> = (props) => {
  const { navigation, route } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors } = useTheme();
  const { text } = colors;

  return (
    <Appbar.Header>
      {navigation.canGoBack() && (
        <Appbar.BackAction onPress={navigation.goBack} />
      )}
      <Appbar.Content title={route.name} />

      <Menu
        visible={menuOpen}
        onDismiss={() => setMenuOpen(false)}
        anchor={
          <Appbar.Action
            icon="account"
            color={text}
            onPress={() => setMenuOpen(true)}
          />
        }
      >
        <Menu.Item
          onPress={() => {
            firebase.auth().signOut();
          }}
          title="Sign Out"
        />
      </Menu>
    </Appbar.Header>
  );
};

export default NavBar;
