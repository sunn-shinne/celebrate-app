import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Colors, Radiuses } from "../constants/styles";

interface IButtonProps {
  title: string;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}

const Button = ({
  title,
  color = Colors.PRIMARY,
  disabled,
  loading,
  onPress,
}: IButtonProps) => {
  const handleOnPress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      style={[
        s.button,
        color && { backgroundColor: color },
        disabled && { backgroundColor: Colors.GREAY },
      ]}
      onPress={handleOnPress}
    >
      <Text style={s.buttonTitle}>{title}</Text>
      {loading && <ActivityIndicator size="small" />}
    </Pressable>
  );
};

const s = StyleSheet.create({
  button: {
    width: "100%",
    // paddingVertical: 12,
    height: 40,
    borderRadius: Radiuses.S,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  buttonTitle: {
    fontSize: 14,
    color: Colors.WHITE,
  },
});

export default Button;
