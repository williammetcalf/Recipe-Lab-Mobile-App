import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Card, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ReorderableParallaxList from "../../components/ReorderableParallaxList";
import Screen from "../../components/Screen";
import ListItem from "./ListItem";

export interface SandboxScreenProps {}

const SandboxScreen: FC<SandboxScreenProps> = (props) => {
  const {} = props;
  const [isEditing, setIsEditing] = useState(false);
  const data = useMemo(
    () => new Array(30).fill(0).map((_, idx) => ({ v: idx })),
    []
  );

  return (
    <Screen>
      <ReorderableParallaxList
        data={data}
        keyExtractor={(item) => `${item.v}`}
        headerMinHeight={150}
        headerMaxHeight={300}
        headerImageSource={{
          uri: "https://firebasestorage.googleapis.com/v0/b/recipe-lab-96d4d.appspot.com/o/28e88ab4-1e2d-416e-bc13-3476d3fc690a?alt=media&token=f71a8b70-05df-45e7-bc7a-01ffbfbaf502",
        }}
        HeaderComponent={() => (
          <View style={{ position: "absolute", bottom: 0 }}>
            <Title style={{ color: "red" }}>Test</Title>
          </View>
        )}
        renderItem={(item) => <ListItem item={item} />}
        reordering={isEditing}
      />
      <SafeAreaView
        style={{
          position: "absolute",
          right: 10,
          flexDirection: "row-reverse",
        }}
      >
        <BlurView intensity={90}>
          <Button
            color="white"
            mode="contained"
            onPress={() => {
              setIsEditing(!isEditing);
            }}
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </BlurView>
      </SafeAreaView>
    </Screen>
  );
};

export default SandboxScreen;
