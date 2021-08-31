import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

function useHeaderStyles(
  scrollOffset: Animated.SharedValue<number>,
  headerMaxHeight: number,
  headerMaxOffset: number
) {
  return useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollOffset.value,
      [0, headerMaxHeight, headerMaxHeight + 1],
      [1, 0.4, 0.4]
    ),
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-1, 0, headerMaxHeight, headerMaxHeight + 1],
          [0, 0, -headerMaxOffset, -headerMaxOffset]
        ),
      },
    ],
  }));
}

export default useHeaderStyles;
