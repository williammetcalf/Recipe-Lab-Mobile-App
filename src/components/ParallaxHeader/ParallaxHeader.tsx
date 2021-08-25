import { ImageSourcePropType, StyleSheet, Animated, View } from "react-native";
import React, { FC, ReactElement } from "react";
import { useEffect } from "react";
import { Text } from "react-native-paper";
import { useState } from "react";

export interface RenderOverlayParameters {
  scrollPositionY?: any;
  scrollDistance?: number;
  maxHeight?: number;
}

export interface ParallaxHeaderProps {
  maxHeight?: number;
  minHeight?: number;
  heroImage?: ImageSourcePropType;
  renderOverlay?: ({
    scrollPositionY,
    scrollDistance,
    maxHeight,
  }: RenderOverlayParameters) => ReactElement;
  renderHeader?: () => ReactElement;
}

const ParallaxHeader: FC<ParallaxHeaderProps> = (props) => {
  const {
    maxHeight,
    minHeight,
    children,
    heroImage,
    renderHeader,
    renderOverlay,
  } = props;
  const [someState, setState] = useState(0);
  const HEADER_MAX_HEIGHT = React.useMemo(
    () => (maxHeight ? maxHeight : 550),
    [maxHeight]
  );
  const HEADER_MIN_HEIGHT = React.useMemo(
    () => (minHeight ? minHeight : 170),
    [minHeight]
  );

  const scrollPositionY = React.useMemo(() => new Animated.Value(0), []);

  const HEADER_SCROLL_DISTANCE = React.useMemo(
    () => HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
    [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT]
  );

  const headerTranslate = scrollPositionY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollPositionY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.2],
    extrapolate: "clamp",
  });

  const imageTranslate = scrollPositionY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  useEffect(() => {
    scrollPositionY.addListener((v) => {
      setState(v.value);
    });
    return () => scrollPositionY && scrollPositionY.removeAllListeners();
  }, [scrollPositionY]);

  return (
    <>
      <Animated.ScrollView
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
        scrollEventThrottle={10}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollPositionY },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
      >
        <View
          style={{
            marginTop: HEADER_MAX_HEIGHT,
          }}
        >
          {children}
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={[
          styles.header,
          { height: HEADER_MAX_HEIGHT },
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        {!!heroImage && !renderHeader && (
          <>
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  opacity: imageOpacity,
                  height: HEADER_MAX_HEIGHT,
                  transform: [{ translateY: imageTranslate }],
                },
              ]}
              source={heroImage}
              testID="hero-image"
            />
            {/* <Overlay /> */}
          </>
        )}
        {renderHeader && (
          <Animated.View
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                height: HEADER_MAX_HEIGHT,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
          >
            {React.cloneElement(renderHeader(), {
              style: {
                ...StyleSheet.absoluteFillObject,
                height: HEADER_MAX_HEIGHT,
              },
            })}
          </Animated.View>
        )}
      </Animated.View>
      {renderOverlay && (
        <View>
          {React.cloneElement(
            renderOverlay({
              scrollPositionY,
              scrollDistance: HEADER_SCROLL_DISTANCE,
              maxHeight: HEADER_MAX_HEIGHT,
            }),
            {
              style: {
                ...StyleSheet.absoluteFillObject,
                height: HEADER_MAX_HEIGHT,
                ...renderOverlay({}).props.style,
              },
            }
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(45, 51, 59, 1)",
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    resizeMode: "cover",
  },
  bar: {
    backgroundColor: "transparent",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: "white",
    fontSize: 18,
  },
});

export default ParallaxHeader;
