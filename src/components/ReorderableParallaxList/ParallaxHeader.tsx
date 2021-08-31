import React, { ComponentType, FC, useMemo } from "react";
import { ImageURISource, View } from "react-native";
import Animated from "react-native-reanimated";
import useHeaderStyles from "./useHeaderStyles";

export interface ParallaxHeaderProps {
  scrollOffset: Animated.SharedValue<number>;
  headerMaxHeight: number;
  headerMinHeight: number;
  HeaderComponent?: ComponentType<{}>;
  headerImageSource?: ImageURISource;
}

const ParallaxHeader: FC<ParallaxHeaderProps> = (props) => {
  const { scrollOffset, headerMaxHeight, headerMinHeight } = props;
  const { HeaderComponent, headerImageSource } = props;
  const headerMaxOffset = useMemo(
    () => headerMaxHeight - headerMinHeight,
    [headerMaxHeight, headerMinHeight]
  );

  const headerStyle = useHeaderStyles(
    scrollOffset,
    headerMaxHeight,
    headerMaxOffset
  );

  return (
    <Animated.View
      style={[
        headerStyle,
        {
          position: "absolute",
          top: 0,
          width: "100%",
          height: headerMaxHeight,
        },
      ]}
    >
      {headerImageSource && (
        <Animated.Image
          source={headerImageSource}
          style={{ width: "100%", height: headerMaxHeight }}
        />
      )}
      {HeaderComponent && (
        <View style={{ position: "absolute", height: "100%", width: "100%" }}>
          <HeaderComponent />
        </View>
      )}
    </Animated.View>
  );
};

export default ParallaxHeader;
