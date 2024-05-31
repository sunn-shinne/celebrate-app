import { Pressable, Text, StyleSheet } from "react-native";
import { Colors, Radiuses } from "../constants/styles";

interface IButtonProps {
  title: string;
  color?: string;
}

const Button = ({ title, color }: IButtonProps) => {
  return (
    <Pressable style={[s.button, color && { backgroundColor: color }]}>
      <Text style={s.buttonTitle}>{title}</Text>
    </Pressable>
  );
};

const s = StyleSheet.create({
  button: {
    width: "100%",
    padding: 10,
    borderRadius: Radiuses.S,
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: 14,
    color: Colors.WHITE,
  },
});

export default Button;
