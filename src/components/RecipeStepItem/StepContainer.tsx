import * as Haptics from "expo-haptics";
import React, { FC } from "react";
import Paper from "../Paper";

export interface StepContainerProps {
  onEdit?: () => void;
}

const StepContainer: FC<StepContainerProps> = (props) => {
  const { children, onEdit } = props;

  return (
    <Paper
      style={{ marginBottom: 12 }}
      alpha={0.2}
      blurIntensity={70}
      onLongPress={
        onEdit &&
        function () {
          Haptics.impactAsync();
          onEdit();
        }
      }
      hitSlop={{ bottom: 4, top: 4 }}
    >
      {children}
    </Paper>
  );
};

export default StepContainer;
