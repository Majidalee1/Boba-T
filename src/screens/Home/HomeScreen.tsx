import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { View, ViewStyle } from "react-native";
import {
  AppStackParamList,
  HomeScreenNavigationProps,
} from "../../navigation/AppNavigator";
import { spacing } from "../../utils/Layouts";

import { StackNavigationOptions } from "@react-navigation/stack";

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#fff",
};
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.extraSmall,
  paddingBottom: spacing.extraSmall,
};

interface Props {
  navigation: NavigationProp<StackNavigationOptions>;
  route: RouteProp<AppStackParamList, "Home">;
}

export const HomeScreen = ({ navigation, route }: Props) => (
  <View style={$container}>
    <Text h1="true">{`Home screen dispalay for store ${route.params.storeId}`}</Text>
  </View>
);
