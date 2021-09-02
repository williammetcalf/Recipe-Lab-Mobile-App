import { TouchableHighlight } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withDelay,
} from "react-native-reanimated";

export interface RecipeScreenHeaderProps {
  isEditMode: boolean;
  onEditModeChange: (isEditMode: boolean) => void;
}

const RecipeScreenHeader: FC<RecipeScreenHeaderProps> = (props) => {
  const { isEditMode, onEditModeChange } = props;
  const animation = useSharedValue(0);
  useEffect(() => {
    animation.value = withDelay(
      300,
      withTiming(1, {
        duration: 100,
        easing: Easing.in(Easing.linear),
      })
    );
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animation.value }],
      opacity: animation.value,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={animatedStyle}>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0.8)"
          onPress={() => onEditModeChange(!isEditMode)}
          style={{
            borderRadius: 50,
            overflow: "hidden",
          }}
        >
          <BlurView intensity={100}>
            <Avatar.Icon
              icon={isEditMode ? "close" : "shuffle-variant"}
              color="white"
              style={{ backgroundColor: "transparent" }}
              size={50}
            />
          </BlurView>
        </TouchableHighlight>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: 0,
    right: 10,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default RecipeScreenHeader;
