// navigation stack

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { ProductDetails } from "../screens/ProductDetails/ProductDetails";
import { LoginScreen } from "../screens/Auth/Login";
import { NavigationContainer } from "@react-navigation/native";
import { Stores } from "../screens/Store/SelectStoreScreen";
import { CartScreen } from "../screens/Cart/CartScreen";
import { CustomTeaScreen } from "../screens/CustomTea/CustomTeaScreen";
import { Welcome } from "../screens/Welcome/Welcome";
import { Checkout } from "../screens/Checkout/Checkout";
import { WithLocalSvg } from "react-native-svg";

export type AppStackParamList = {
  Store: undefined;
  Details: {
    productId: string;
  };
  Checkout: {
    order_number: string | number;
  };
  CustomTea: undefined;
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
export type HomeScreenNavigationProps = TabScreenProps<"Home">;
export type ProductDetailsNavigationProps = NavigationScreenProps<"Details">;
export type StoreScrenNavigationProps = NavigationScreenProps<"Store">;
export type CheckoutScrenNavigationProps = NavigationScreenProps<"Checkout">;
export type CartScreenNavigationProps = TabScreenProps<"Cart">;

function BottomTabNavigator() {
  const getIconName = (payload: { name: string; isFocused: boolean }) => {
    switch (payload.name) {
      case "Home":
        return payload.isFocused ? "homeActive" : "Home";
      case "Cart":
        return payload.isFocused ? "activeCart" : "cart";
      default:
        return "Home";
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
          const iconUrl = `./../assets/icons/cart.svg`;
          return <WithLocalSvg asset={require(iconUrl)} />;
        },
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
        // title: "Home",H
      }}
    >
      <NavigationStack.Screen name="Welcome" component={Welcome} />
      <NavigationStack.Screen name="CustomTea" component={CustomTeaScreen} />
      <NavigationStack.Screen name="Tabs" component={BottomTabNavigator} />
      <NavigationStack.Screen
        name="Details"
        component={ProductDetails}
        options={(props) => ({
          title: `Profile: `,
        })}
      />
      <NavigationStack.Screen name="Checkout" component={Checkout} />
      <NavigationStack.Screen name="Store" component={Stores} />
    </NavigationStack.Navigator>
  );
};

// auth stack
export type AuthStackScreens = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
};

const AuthNavigationStack = createNativeStackNavigator<AuthStackScreens>();

export const AuthStack = () => {
  return (
    <AuthNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      initialRouteName="Login"
    >
      <AuthNavigationStack.Screen name="Login" component={LoginScreen} />
    </AuthNavigationStack.Navigator>
  );
};

export const AppNavigator = () => {
  const user = true;
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
