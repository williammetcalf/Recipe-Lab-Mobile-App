import React, { FC } from "react";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";

export interface SearchRecipesProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchRecipes: FC<SearchRecipesProps> = (props) => {
  const { value, onChange } = props;
  const [focused, setFocused] = useState(false);
  const { colors } = useTheme();

  return (
    <Searchbar
      value={value}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChangeText={onChange}
      style={{
        flexShrink: 1,
        marginRight: 12,
        backgroundColor: "transparent",
        borderRadius: 50,
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
      }}
    />
  );
};

export default SearchRecipes;
