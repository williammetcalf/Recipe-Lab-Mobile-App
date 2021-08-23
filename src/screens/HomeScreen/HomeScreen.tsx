import React, { FC } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Card,
  IconButton,
  Surface,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import Screen from "../../components/Screen";
import AddSheet from "./components/AddSheet";
import Header from "./components/Header";

export interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = (props) => {
  // firebase.auth().signOut();

  return (
    <Screen>
      <Header />
      <ScrollView
        style={{
          padding: 12,
        }}
      >
        <View style={{ height: 130 }} />
        {new Array(50).fill(0).map((_, i) => (
          <Card
            key={i}
            onPress={() => {}}
            style={{
              marginTop: 4,
            }}
          >
            <Card.Content>
              <View>
                <Text>{i}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>
      <AddSheet />
    </Screen>
  );
};

export default HomeScreen;
