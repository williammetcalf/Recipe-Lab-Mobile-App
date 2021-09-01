import Color from "color";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Subheading, useTheme } from "react-native-paper";

export interface EmptyStateProps {}

const EmptyState: FC<EmptyStateProps> = (props) => {
  const { children } = props;
  const { colors } = useTheme();
  const color = Color(colors.background).lighten(2).toString();

  return (
    <View style={styles.container}>
      <Subheading style={{ color, fontSize: 32, lineHeight: 32 }}>
        {children}
      </Subheading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginTop: "30%",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default EmptyState;
