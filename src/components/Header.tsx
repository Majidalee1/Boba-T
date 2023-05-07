import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";
import { colors } from "../styles/colors";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "../navigation/AppNavigator";

export interface Props extends HeaderProps {
  data?: {
    title?: string;
  };
  actions?: {
    left?: () => void;
    right?: () => void;
  };
}

export const Header = (props?: Props) => {
  return (
    <HeaderRNE
      placement="left"
      leftComponent={
        <Icon
          name="dots-square"
          color={colors.primary}
          type="material-community"
          onPress={() => props?.actions?.left?.()}
        />
      }
      centerComponent={{ text: "MY TITLE", style: { color: "#000" } }}
      rightComponent={
        <Icon
          name="cart-minus"
          size={20}
          color={colors.primary}
          type="material-community"
          pressRetentionOffset={{
            bottom: 10,
            left: 10,
            right: 10,
            top: 10,
          }}
          onPress={() => props?.actions?.right?.()}
        />
      }
      {...props}
    />
  );
};
