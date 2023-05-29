// navigation stack

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { ProductDetails } from "../screens/ProductDetails/ProductDetails";
import { NavigationContainer } from "@react-navigation/native";
import { Stores } from "../screens/Store/SelectStoreScreen";
import { CartScreen } from "../screens/Cart/CartScreen";
import { CustomTeaScreen } from "../screens/CustomTea/CustomTeaScreen";
import { Welcome } from "../screens/Welcome/Welcome";
import { Checkout } from "../screens/Checkout/Checkout";
import { WithLocalSvg } from "react-native-svg";
import { View, TouchableOpacity } from "react-native";

import { colors } from "../styles/colors";

export type AppStackParamList = {
  Store: undefined;
  Details: {
    item: any;
  };
  Checkout: {
    order_number: string | number;
    total: string;
    items: any;
    status: string;
  };
  CustomTea: { item: any };
  Welcome: undefined;
  Tabs: {
    screen: keyof TabParamList;
    params?: TabParamList[keyof TabParamList];
  };
};

export type TabParamList = {
  Home: {
    storeId: string;
  };
  Cart: {
    cartId?: string;
    storeId?: string;
  };
};

const NavigationStack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// navigation screen props

export type NavigationScreenProps<T extends keyof AppStackParamList> = {
  navigation: {
    navigate: (
      screen: keyof AppStackParamList,
      params?: AppStackParamList[keyof AppStackParamList]
    ) => void;
    goBack: () => void;
  };
  route: {
    params: AppStackParamList[T];
  };
};
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

export type TabsScreenNavigationProps = NavigationScreenProps<"Tabs">;
export type WelcomeScreenNavigationProps = NavigationScreenProps<"Welcome">;
export type ProductDetailsNavigationProps = NavigationScreenProps<"Details">;
export type StoreScrenNavigationProps = NavigationScreenProps<"Store">;
export type CheckoutScrenNavigationProps = NavigationScreenProps<"Checkout">;

export type HomeScreenNavigationProps = TabScreenProps<"Home">;
export type CartScreenNavigationProps = TabScreenProps<"Cart">;

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string; params: any } }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? (
              <WithLocalSvg
                asset={require("./../assets/icons/homeActive.svg")}
              />
            ) : (
              <WithLocalSvg asset={require("./../assets/icons/Home.svg")} />
            );
          } else if (route.name === "Cart") {
            iconName = focused ? (
              <WithLocalSvg
                asset={require("./../assets/icons/activeCart.svg")}
              />
            ) : (
              <WithLocalSvg asset={require("./../assets/icons/cart.svg")} />
            );
          } else if (route.name === "OrderHistory") {
            iconName = focused ? (
              <WithLocalSvg
                asset={require("./../assets/icons/activeHistory.svg")}
              />
            ) : (
              <WithLocalSvg asset={require("./../assets/icons/history.svg")} />
            );
          } else if (route.name === "Profile") {
            iconName = focused ? (
              <WithLocalSvg
                asset={require("./../assets/icons/activeProfile.svg")}
              />
            ) : (
              <WithLocalSvg asset={require("./../assets/icons/profile.svg")} />
            );
          } else if (route.name === "ScanOrder") {
            iconName = focused ? (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  width: 72,
                  height: 72,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 72 / 2,
                  marginBottom: 30,
                  borderWidth: 8,
                  borderColor: "#F1F2F5",
                }}
              >
                <WithLocalSvg asset={require("./../assets/icons/scan.svg")} />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  backgroundColor: colors.primary,
                  width: 72,
                  height: 72,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 72 / 2,
                  marginBottom: 30,
                  borderWidth: 8,
                  borderColor: "#F1F2F5",
                }}
              >
                <WithLocalSvg asset={require("./../assets/icons/scan.svg")} />
              </View>
            );
          }

          return iconName;
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        initialParams={{
          cartId: "1",
          storeId: "1",
        }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export const Stack = () => {
  return (
    <NavigationStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <NavigationStack.Screen name="Welcome" component={Welcome} />
      <NavigationStack.Screen name="CustomTea" component={CustomTeaScreen} />
      <NavigationStack.Screen name="Tabs" component={BottomTabNavigator} />
      <NavigationStack.Screen
        name="Details"
        component={ProductDetails}
        options={() => ({
          title: `Profile: `,
        })}
      />
      <NavigationStack.Screen name="Checkout" component={Checkout} />
      <NavigationStack.Screen name="Store" component={Stores} />
    </NavigationStack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: "#FBFCFF",
          background: "#FBFCFF",
          card: "#FBFCFF",
          text: "#FBFCFF",
          border: "#FBFCFF",
          notification: "#FBFCFF",
        },
      }}
    >
      <Stack />
    </NavigationContainer>
  );
};
