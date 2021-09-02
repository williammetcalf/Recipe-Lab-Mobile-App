import { TouchableHighlight } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Fuse from "fuse.js";
import React, { FC, useMemo, useRef, useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Portal, Subheading, TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from "react-native-popover-view";

export interface TypeAheadProps extends Omit<TextInputProps, "ref" | "theme"> {
  items: string[];
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
}

const fuseConfig: Fuse.IFuseOptions<string> = {
  findAllMatches: true,
};

const TypeAhead: FC<TypeAheadProps> = (props) => {
  const { items, textInputStyle, containerStyle, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [inputDims, setInputDims] = useState({ width: 200, height: 200 });
  const ref = useRef<View>(null);

  const list = useMemo(() => new Fuse(items, fuseConfig), []);
  const recommendations = useMemo(() => {
    return rest.value
      ? list.search(rest.value).filter((item) => item.item !== rest.value)
      : [];
  }, [rest.value]);

  return (
    <View
      ref={ref}
      style={containerStyle}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setInputDims({ width, height });
      }}
    >
      <TextInput
        {...rest}
        onChange={() => setOpen(true)}
        style={textInputStyle}
        onBlur={(e) => {
          rest.onBlur && rest.onBlur(e);
          setOpen(false);
        }}
      />
      <Portal>
        <Popover
          mode={PopoverMode.TOOLTIP}
          placement={PopoverPlacement.BOTTOM}
          isVisible={open && recommendations.length > 0}
          from={ref}
          animationConfig={{ duration: 100, delay: 0 }}
          arrowStyle={{ backgroundColor: "transparent" }}
          popoverStyle={{ backgroundColor: "transparent" }}
        >
          <ScrollView
            keyboardShouldPersistTaps="always"
            overScrollMode="never"
            bounces={false}
            style={{ minHeight: 100, maxHeight: 200, width: inputDims.width }}
          >
            {recommendations.map((item) => {
              return (
                <TouchableHighlight
                  key={item.item}
                  onPress={() => {
                    rest.onChangeText && rest.onChangeText(item.item);
                    setOpen(false);
                  }}
                >
                  <BlurView intensity={100}>
                    <View
                      style={{
                        padding: 16,
                        backgroundColor: "rgba(0,0,0,0.8)",
                      }}
                    >
                      <Subheading>{item.item}</Subheading>
                    </View>
                  </BlurView>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </Popover>
      </Portal>
    </View>
  );
};

export default TypeAhead;
