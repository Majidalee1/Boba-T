// navigation stack

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { OrderHistory } from "../screens/Seller/OrderHistory/OrderHistory";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { CartScreen } from "../screens/Cart/CartScreen";
import { Profile } from "../screens/Seller/Profile/Profile";
import { WithLocalSvg } from "react-native-svg";

export type TabParamList = {
  OrderHistory: {
    storeId: string;
  };
  Profile: {
    cartId?: string;
    storeId?: string;
  };
};

const Tab = createBottomTabNavigator<TabParamList>();

// navigation screen props

export type TabScreenProps<T extends keyof TabParamList> = {
  navigation: {
    navigate: (
      screen: keyof TabParamList,
      params?: TabParamList[keyof TabParamList]
    ) => void;
    goBack: () => void;
  };
  route: {
    params: [T];
  };
};

export type HomeScreenNavigationProps = TabScreenProps<"OrderHistory">;
export type CartScreenNavigationProps = TabScreenProps<"Profile">;

export default function SellerBottomTabNavigator() {
  const getIconName = (payload: { name: string; isFocused: boolean }) => {
    switch (payload.name) {
      case "OrderHistory":
        return payload.isFocused ? "homeActive" : "Home";
      case "Profile":
        return payload.isFocused ? "activeCart" : "cart";
      default:
        return "OrderHistory";
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string; params: any } }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getIconName({
            name: route.name,
            isFocused: focused,
          });
          console.log("===iconName===", typeof iconName);
          const iconUrl = `./../assets/icons/cart.svg`;
          return <WithLocalSvg asset={require(iconUrl)} />;
        },
      })}
    >
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{
          cartId: "1",
          storeId: "1",
        }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
