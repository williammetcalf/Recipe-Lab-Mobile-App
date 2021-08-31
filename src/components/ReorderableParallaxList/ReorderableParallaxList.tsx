import React, { ComponentType, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  ImageURISource,
  ListRenderItem,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";

export interface ReorderableParallaxListProps<T> {
  data: Animated.WithAnimatedValue<T>[];
  keyExtractor: (item: T) => string;
  renderItem: ListRenderItem<T>;
  HeaderComponent?: ComponentType<{}>;
  headerImageSource?: ImageURISource;
  headerMinHeight: number;
  headerMaxHeight: number;
  reordering?: boolean;
}

function ReorderableParallaxList<T>(props: ReorderableParallaxListProps<T>) {
  const { data, keyExtractor, renderItem, HeaderComponent } = props;
  const { headerImageSource, headerMinHeight, headerMaxHeight } = props;
  const { reordering } = props;
  const parallaxAnim = useRef(new Animated.Value(0)).current;
  const reorderAnim = useRef(new Animated.Value(0)).current;
  const HEADER_FLOOR = useMemo(
    () => headerMaxHeight - headerMinHeight,
    [headerMaxHeight, headerMinHeight]
  );

  useEffect(() => {
    if (reordering) {
      Animated.timing(reorderAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.in(Easing.linear),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(reorderAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.linear),
        useNativeDriver: true,
      }).start();
    }
  }, [reordering]);

  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: headerMaxHeight,
          opacity: parallaxAnim.interpolate({
            inputRange: [0, headerMaxHeight, headerMaxHeight + 1],
            outputRange: [1, 0.4, 0.4],
          }),
          transform: [
            {
              translateY: parallaxAnim.interpolate({
                inputRange: [-1, 0, headerMaxHeight, headerMaxHeight + 1],
                outputRange: [0, 0, -HEADER_FLOOR, -HEADER_FLOOR],
              }),
            },
          ],
        }}
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
      <Animated.FlatList
        data={data}
        keyExtractor={keyExtractor}
        style={{ height: "100%", paddingTop: headerMaxHeight }}
        scrollEventThrottle={10}
        ListFooterComponent={() => <View style={{ height: headerMaxHeight }} />}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: parallaxAnim },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        renderItem={(item) => {
          return (
            <>
              <Animated.View
                style={{ opacity: reorderAnim, position: "absolute" }}
              >
                <IconButton icon="menu" />
              </Animated.View>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: reorderAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 50],
                      }),
                    },
                  ],
                }}
              >
                {renderItem(item)}
              </Animated.View>
            </>
          );
        }}
      />
    </>
  );
}

export default ReorderableParallaxList;
