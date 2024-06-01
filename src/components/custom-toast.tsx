import Toast, {
  InfoToast,
  SuccessToast,
  ErrorToast,
} from "react-native-toast-message";
import { Colors, Radiuses } from "../constants/styles";

const CustomToast = () => {
  return (
    <Toast
      topOffset={60}
      config={{
        info: (props) => (
          <InfoToast
            {...props}
            style={{ borderLeftColor: Colors.SECONDARY, width: "90%" }}
            text1Style={{
              fontSize: 14,
              fontWeight: "400",
              borderRadius: Radiuses.S,
            }}
          />
        ),
        success: (props) => (
          <SuccessToast
            {...props}
            style={{ borderLeftColor: Colors.SUCCESS, width: "90%" }}
            text1Style={{
              fontSize: 14,
              fontWeight: "400",
              borderRadius: Radiuses.S,
            }}
          />
        ),
        error: (props) => (
          <ErrorToast
            {...props}
            style={{ borderLeftColor: Colors.WARN, width: "90%" }}
            text1Style={{
              fontSize: 14,
              fontWeight: "400",
              borderRadius: Radiuses.S,
            }}
          />
        ),
      }}
    />
  );
};

export default CustomToast;
