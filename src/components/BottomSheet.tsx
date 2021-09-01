import BottomSheetBase, {
  BottomSheetBackgroundProps,
  BottomSheetProps as BottomSheetBaseProps,
} from "@gorhom/bottom-sheet";
import Color from "color";
import React, { FC, forwardRef } from "react";
import { View } from "react-native";
import { IconButton, Title, useTheme } from "react-native-paper";
import { useGlobalLoading } from "./GlobalLoading";

export interface BottomSheetProps extends BottomSheetBaseProps {
  title?: string;
  onClose?: () => void;
}

const BottomSheet = forwardRef<BottomSheetBase, BottomSheetProps>(
  (props, ref) => {
    const { title, onClose, backgroundStyle, children, ...rest } = props;
    const { colors } = useTheme();
    const { background } = colors;
    const [loading] = useGlobalLoading();
    const backgroundColor = Color(background)
      .lighten(0.2)
      .alpha(0.98)
      .toString();

    return (
      <BottomSheetBase
        {...rest}
        ref={ref}
        index={-1}
        backgroundComponent={BackgroundComponent}
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
      >
        <View style={{ height: "100%" }}>{children}</View>
      </BottomSheetBase>
    );
  }
);

const BackgroundComponent: FC<BottomSheetBackgroundProps> = (props) => {
  const { style, pointerEvents, children } = props;
  const { roundness } = useTheme();

  return (
    <View
      pointerEvents={pointerEvents}
      style={[
        {
          borderRadius: roundness,
          shadowColor: "#222",
          shadowOpacity: 0.5,
          shadowRadius: 5,
          // shadowOffset: { height: -1, width: 0 },
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default BottomSheet;
