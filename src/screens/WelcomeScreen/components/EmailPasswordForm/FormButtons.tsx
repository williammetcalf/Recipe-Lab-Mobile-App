import React, { FC } from "react";
import { useState } from "react";
import { View } from "react-native";
import { Button, Portal, Snackbar, useTheme } from "react-native-paper";
import { useGlobalLoading } from "../../../../components/GlobalLoading";

export interface FormButtonsProps {
  primaryLabel: string;
  secondaryLabel: string;
  primaryAction: () => void | Promise<void>;
  secondaryAction: () => void;
  primaryDisabled?: boolean;
}

const FormButtons: FC<FormButtonsProps> = (props) => {
  const { primaryLabel, primaryAction, primaryDisabled } = props;
  const { secondaryLabel, secondaryAction } = props;
  const [loading, setLoading] = useGlobalLoading();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { colors } = useTheme();

  return (
    <>
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button
          mode="outlined"
          style={{ flex: 1, marginRight: 4 }}
          onPress={secondaryAction}
          color="rgba(255,255,255,0.9)"
          disabled={loading}
        >
          {secondaryLabel}
        </Button>
        <Button
          color="rgba(255,255,255,0.9)"
          mode="contained"
          style={{ flex: 1, marginLeft: 4 }}
          onPress={async () => {
            setLoading(true);
            try {
              await primaryAction();
            } catch (err) {
              setShowSnackbar(true);
              setErrorMessage(err.message);
              console.log(err);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading || primaryDisabled}
        >
          {primaryLabel}
        </Button>
      </View>
      <Portal>
        <Snackbar
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          style={{ backgroundColor: colors.error }}
        >
          {errorMessage}
        </Snackbar>
      </Portal>
    </>
  );
};

export default FormButtons;
