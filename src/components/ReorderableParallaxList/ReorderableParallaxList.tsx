import React, { useEffect, useRef } from "react";
import { ListRenderItem, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ItemWrapper from "./ItemWrapper";
import ParallaxHeader, { ParallaxHeaderProps } from "./ParallaxHeader";

export interface ReorderableParallaxListProps<T>
  extends Omit<ParallaxHeaderProps, "scrollOffset"> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: ListRenderItem<T>;
  reordering?: boolean;
}

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

function ReorderableParallaxList<T>(props: ReorderableParallaxListProps<T>) {
  const { data, keyExtractor, renderItem, HeaderComponent } = props;
  const { headerImageSource, headerMinHeight, headerMaxHeight } = props;
  const { reordering } = props;

  const reorderAnim = useSharedValue(0);
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollOffset.value = e.contentOffset.y;
    },
  });

  useEffect(() => {
    if (reordering) {
      reorderAnim.value = withTiming(1, {
        duration: 150,
        easing: Easing.in(Easing.linear),
      });
    } else {
      reorderAnim.value = withTiming(0, {
        duration: 150,
        easing: Easing.in(Easing.linear),
      });
    }
  }, [reordering]);

  return (
    <>
      <ParallaxHeader
        headerMaxHeight={headerMaxHeight}
        headerMinHeight={headerMinHeight}
        scrollOffset={scrollOffset}
        HeaderComponent={HeaderComponent}
        headerImageSource={headerImageSource}
      />
      <ReanimatedFlatList
        data={data}
        keyExtractor={keyExtractor}
        style={{ height: "100%", paddingTop: headerMaxHeight }}
        scrollEventThrottle={10}
        ListFooterComponent={() => <View style={{ height: headerMaxHeight }} />}
        onScroll={scrollHandler}
        renderItem={(item) => {
          return (
            <ItemWrapper reorderAnim={reorderAnim}>
              {renderItem(item)}
            </ItemWrapper>
          );
        }}
      />
    </>
  );
}

export default ReorderableParallaxList;
