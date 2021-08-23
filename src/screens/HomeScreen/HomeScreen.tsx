import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useMemo, useRef } from "react";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
  Card,
  FAB,
  Headline,
  Paragraph,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import Screen from "../../components/Screen";
import AddSheet from "./components/AddSheet";

export interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = (props) => {
  const {} = props;
  const { colors } = useTheme();
  const { primary, accent } = colors;
  const navigation = useNavigation();
  const addRef = useRef<BottomSheet>(null);
  const items = useMemo(() => {
    return new Array(50).fill(0).map((_, i) => i);
  }, []);
  const [recipeName, setRecipeName] = useState("");

  return (
    <Screen>
      <ScrollView style={{ padding: 12 }}>
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
      </ScrollView>
      <AddSheet />
    </Screen>
  );
};

export default HomeScreen;
