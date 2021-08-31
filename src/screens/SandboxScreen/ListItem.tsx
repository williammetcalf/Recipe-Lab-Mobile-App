import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { ListRenderItemInfo, Text } from "react-native";
import { Card } from "react-native-paper";

export interface ListItemProps {
  item: ListRenderItemInfo<{
    v: number;
  }>;
}

const ListItem: FC<ListItemProps> = (props) => {
  const { item } = props;

  return (
    <BlurView intensity={90} style={{ marginVertical: 8 }}>
      <Card style={{ backgroundColor: "transparent" }}>
        <Card.Content>
          <Text
            style={{
              fontSize: Math.min(50, item.index + 1),
              lineHeight: Math.min(50, item.index + 1),
            }}
          >
            {item.item.v}
          </Text>
        </Card.Content>
      </Card>
    </BlurView>
  );
};

export default React.memo(ListItem);
