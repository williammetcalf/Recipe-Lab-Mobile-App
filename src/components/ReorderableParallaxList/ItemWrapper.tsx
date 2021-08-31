import React, { FC } from "react";
import { IconButton } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export interface ItemWrapperProps {
  reorderAnim: Animated.SharedValue<number>;
}

const ItemWrapper: FC<ItemWrapperProps> = (props) => {
  const { children, reorderAnim } = props;
  const slideAnim = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: interpolate(reorderAnim.value, [0, 1], [0, 50]) },
      ],
    };
  });
  const fadeAnim = useAnimatedStyle(() => {
    return {
      opacity: reorderAnim.value,
      transform: [{ scale: reorderAnim.value }],
    };
  });

  return (
    <>
      <Animated.View style={[fadeAnim, { position: "absolute" }]}>
        <IconButton icon="menu" />
      </Animated.View>
      <Animated.View style={slideAnim}>{children}</Animated.View>
    </>
  );
};

export default ItemWrapper;
