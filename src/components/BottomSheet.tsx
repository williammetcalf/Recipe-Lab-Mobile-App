import BottomSheetBase, {
  BottomSheetProps as BottomSheetBaseProps,
} from "@gorhom/bottom-sheet";
import Color from "color";
import React, { forwardRef } from "react";
import { View } from "react-native";
import { IconButton, Title, useTheme } from "react-native-paper";
import { useGlobalLoading } from "./GlobalLoading";

export interface BottomSheetProps extends BottomSheetBaseProps {
  title?: string;
  onClose?: () => void;
}

const BottomSheet = forwardRef<BottomSheetBase, BottomSheetProps>(
  (props, ref) => {
    const { title, onClose, backgroundStyle, ...rest } = props;
    const { colors } = useTheme();
    const { surface } = colors;
    const [loading] = useGlobalLoading();
    const backgroundColor = Color(surface).darken(0.8).toString();

    return (
      <BottomSheetBase
        {...rest}
        ref={ref}
        index={-1}
        backgroundStyle={{ backgroundColor, ...backgroundStyle }}
        handleComponent={() => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 12,
                paddingRight: 8,
              }}
            >
              {title ? <Title>{title}</Title> : <View />}
              {onClose && (
                <IconButton
                  icon="close"
                  size={24}
                  onPress={onClose}
                  disabled={loading}
                />
              )}
            </View>
          );
        }}
      />
    );
  }
);

export default BottomSheet;
