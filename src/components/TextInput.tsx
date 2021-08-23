import React, { forwardRef } from "react";
import {
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
} from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export interface TextInputProps extends NativeTextInputProps {
  icon?: IconSource;
  error?: boolean;
}

const TextInput = forwardRef<NativeTextInput, TextInputProps>((props, ref) => {
  const { icon, style, error, ...rest } = props;
  const { colors } = useTheme();

  return (
    <View>
      {icon && (
        <Avatar.Icon
          icon={icon}
          size={40}
          style={{
            position: "absolute",
            zIndex: 1,
            top: 5,
            left: 5,
            opacity: props.editable ? 1 : 0.7,
          }}
        />
      )}
      <NativeTextInput
        {...rest}
        placeholderTextColor={
          props.editable ? "rgba(256,256,256,0.8)" : "rgba(256,256,256,0.2)"
        }
        style={[
          styles.input,
          {
            backgroundColor: colors.accent,
            paddingLeft: icon ? 60 : undefined,
            borderWidth: error ? 1 : 0,
            borderColor: "red",
          },
          style,
        ]}
        ref={ref}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    color: "white",
    padding: 16,
    borderRadius: 30,
    marginBottom: 4,
  },
});

export default TextInput;
