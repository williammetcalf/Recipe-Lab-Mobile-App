import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Title } from "react-native-paper";

export interface ParallaxHeaderProps {
  recipeName?: string;
}

const ParallaxHeader: FC<ParallaxHeaderProps> = (props) => {
  const { recipeName } = props;

  if (!recipeName) return null;

  return (
    <BlurView intensity={60} style={styles.blurView}>
      <View style={styles.container}>
        <Title style={styles.title}>{recipeName}</Title>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurView: { position: "absolute", bottom: 0, width: "100%" },
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  title: { color: "white", fontSize: 32, lineHeight: 32 },
});

export default ParallaxHeader;
