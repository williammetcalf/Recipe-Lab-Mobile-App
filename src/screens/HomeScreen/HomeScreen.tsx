import { useNavigation } from "@react-navigation/native";
import React, { FC, useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Headline, Paragraph } from "react-native-paper";
import { useGlobalLoading } from "../../components/GlobalLoading";
import Screen from "../../components/Screen";
import AddSheet from "./components/AddSheet";

export interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = (props) => {
  const {} = props;
  const navigation = useNavigation();
  const { loading } = useGlobalLoading();
  const items = useMemo(() => {
    return new Array(50).fill(0).map((_, i) => i);
  }, []);

  return (
    <Screen>
      <ScrollView style={{ padding: 12 }}>
        <Headline>Your Recipies</Headline>

        {items.map((i) => (
          <Card
            key={i}
            style={{
              marginHorizontal: 0,
              marginTop: 8,
            }}
            onPress={
              !loading
                ? () => {
                    navigation.navigate("Recipe" as never);
                  }
                : undefined
            }
          >
            <Card.Content>
              <Paragraph>{i}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <AddSheet />
    </Screen>
  );
};

export default HomeScreen;
