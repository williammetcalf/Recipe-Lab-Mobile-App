import React, { FC } from "react";
import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

export interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = (props) => {
  const {} = props;
  const { colors } = useTheme();
  const { surface } = colors;

  return (
    <View style={{ height: "100%", backgroundColor: surface }}>
      <Card style={{ margin: 5 }}>
        <Card.Content>
          <Text>Home Page</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default HomeScreen;
