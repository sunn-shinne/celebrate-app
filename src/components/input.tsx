import { useState } from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { Colors, Radiuses } from "../constants/styles";

interface IInputProps extends TextInputProps {}

const Input = ({ ...attr }: IInputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      {...attr}
      style={[s.input, focused && s.inputFocused]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

const s = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.GREAY,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: Radiuses.M,
    alignItems: "center",
    height: 50,
    backgroundColor: Colors.WHITE,
  },
  inputFocused: {
    borderColor: Colors.SECONDARY,
  },
});

export default Input;
