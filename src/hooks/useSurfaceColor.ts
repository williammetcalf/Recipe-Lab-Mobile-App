import Color from "color";
import { useMemo } from "react";
import { useTheme } from "react-native-paper";

function useSurfaceColor(alpha = 0.1) {
  const { colors } = useTheme();
  const { surface } = colors;

  return useMemo(() => Color(surface).alpha(alpha).toString(), [surface]);
}

export default useSurfaceColor;
