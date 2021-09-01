import React, { useEffect } from "react";
import { ListRenderItem, StyleProp, View, ViewStyle } from "react-native";
import { DraxList, DraxProvider, DraxView } from "react-native-drax";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import ItemWrapper from "./ItemWrapper";
import ParallaxHeader, { ParallaxHeaderProps } from "./ParallaxHeader";

export interface ReorderableParallaxListProps<T>
  extends Omit<ParallaxHeaderProps, "scrollOffset"> {
  data: T[];
  onReorder: (newData: T[]) => void;
  keyExtractor: (item: T) => string;
  renderItem: ListRenderItem<T>;
  reordering?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

function ReorderableParallaxList<T>(props: ReorderableParallaxListProps<T>) {
  const { data, keyExtractor, renderItem, HeaderComponent } = props;
  const { headerImageSource, headerMinHeight, headerMaxHeight } = props;
  const { reordering, onReorder, contentStyle } = props;

  const reorderAnim = useSharedValue(0);
  const scrollOffset = useSharedValue(0);

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
      <DraxProvider>
        <DraxList
          scrollEventThrottle={10}
          onScroll={(e) => {
            scrollOffset.value = e.nativeEvent.contentOffset.y;
          }}
          reorderable={reordering}
          itemsDraggable={reordering}
          data={data}
          onItemReorder={({ fromIndex, toIndex }) => {
            const newData = data.slice();
            newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
            onReorder(newData);
          }}
          flatListStyle={[
            { height: "100%", paddingTop: headerMaxHeight + 12 },
            contentStyle,
          ]}
          ListFooterComponent={() => (
            <View style={{ height: headerMaxHeight + 12 }} />
          )}
          keyExtractor={keyExtractor}
          renderItemContent={(item) => {
            return (
              <ItemWrapper reorderAnim={reorderAnim}>
                {renderItem(item)}
              </ItemWrapper>
            );
          }}
        />
      </DraxProvider>
    </>
  );
}

export default ReorderableParallaxList;
