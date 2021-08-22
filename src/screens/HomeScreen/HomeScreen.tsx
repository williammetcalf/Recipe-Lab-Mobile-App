import { useNavigation } from "@react-navigation/native";
import React, { FC, useMemo } from "react";
import { Card, Headline, Paragraph } from "react-native-paper";
import Screen from "../../components/Screen";

export interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = (props) => {
  const {} = props;
  const navigation = useNavigation();

  const items = useMemo(() => {
    return new Array(50).fill(0).map((_, i) => i);
  }, []);

  return (
    <Screen>
      <Headline>Your Recipies</Headline>

      {items.map((i) => (
        <Card
          key={i}
          style={{ marginHorizontal: 0, marginTop: 8 }}
          onPress={() => {
            navigation.navigate("Recipe" as never);
          }}
        >
          <Card.Content>
            <Paragraph>{i}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </Screen>
  );
};

export default HomeScreen;
