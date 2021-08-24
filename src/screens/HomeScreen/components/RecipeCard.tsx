import { TouchableHighlight } from "@gorhom/bottom-sheet";
import Color from "color";
import React, { FC, useMemo } from "react";
import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

export interface RecipeCardProps {}

const RecipeCard: FC<RecipeCardProps> = (props) => {
  const { children } = props;
  const { colors } = useTheme();
  const { surface } = colors;

  const cardColor = useMemo(
    () => Color(surface).alpha(0.1).toString(),
    [surface]
  );

  return (
    <Card
      style={{
        marginTop: 8,
        backgroundColor: cardColor,
      }}
    >
      <TouchableHighlight onPress={() => {}} underlayColor={cardColor}>
        <Card.Content style={{ height: 60 }}>
          <View></View>
        </Card.Content>
      </TouchableHighlight>
    </Card>
  );
};

export default RecipeCard;
