import { TouchableHighlight } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { TouchableHighlightProps } from "react-native";
import { Card, useTheme } from "react-native-paper";
import useSurfaceColor from "../hooks/useSurfaceColor";

export interface PaperProps extends TouchableHighlightProps {
  alpha?: number;
  blurIntensity?: number;
}

const Paper: FC<PaperProps> = (props) => {
  const { children, style, alpha = 0.1, blurIntensity, ...rest } = props;
  const { roundness } = useTheme();
  const surfaceColor = useSurfaceColor(alpha);

  return (
    <TouchableHighlight
      underlayColor={surfaceColor}
      style={[style, { borderRadius: roundness, overflow: "hidden" }]}
      {...rest}
    >
      <BlurView intensity={blurIntensity}>
        <Card style={{ backgroundColor: surfaceColor }}>
          <Card.Content>{children}</Card.Content>
        </Card>
      </BlurView>
    </TouchableHighlight>
  );
};

export default Paper;
