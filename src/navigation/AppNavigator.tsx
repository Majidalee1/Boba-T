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
import { Profile } from "../screens/Profile/Profile";
import { OrderHistory } from "../screens/OrderHistory/OrderHistory";
import { OrderDetails } from "../screens/OrderDetails/OrderDetails";
import { ScanOrder } from "../screens/ScanOrder/ScanOrder";
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
  OrderDetails: {
    navigation: any;
    route: any;
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
  OrderHistory: {
    navigation: any;
    route: any;
  };
  Profile: {
    navigation: any;
    route: any;
  };
  ScanOrder: {
    navigation: any;
    route: any;
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
export type OrderDetailsNavigationProps = NavigationScreenProps<"OrderDetails">;

export type OrderHistoryNavigationProps = TabScreenProps<"OrderHistory">;
export type HomeScreenNavigationProps = TabScreenProps<"Home">;
export type CartScreenNavigationProps = TabScreenProps<"Cart">;
export type ProfileNavigationProps = TabScreenProps<"Profile">;
export type ScanOrderNavigationProps = TabScreenProps<"ScanOrder">;

function BottomTabNavigator() {
  // const getIconName = (payload: { name: string; isFocused: boolean }) => {
  //   switch (payload.name) {
  //     case "Home":
  //       return payload.isFocused ? "homeActive" : "Home";
  //     case "Cart":
  //       return payload.isFocused ? "activeCart" : "cart";
  //     case "OrderHistory":
  //       return payload.isFocused ? "activeCart" : "cart";
  //     case "Profile":
  //       return payload.isFocused ? "activeCart" : "cart";
  //     default:
  //       return "Home";
  //   }
  // };

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string; params: any } }) => ({
        tabBarIcon: ({ focused }) => {
          // const iconName = getIconName({
          //   name: route.name,
          //   isFocused: focused,
          // });
          // console.log("===iconName===", typeof iconName);
          // const iconUrl = `./../assets/icons/cart.svg`;
          // return <WithLocalSvg asset={require(iconUrl)} />;
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
          }

          // You can return any component that you like here!
          return iconName;
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
      <Tab.Screen
        name="ScanOrder"
        component={ScanOrder}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
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
        options={() => ({
          title: `Profile: `,
        })}
      />
      <NavigationStack.Screen name="Checkout" component={Checkout} />
      <NavigationStack.Screen name="Store" component={Stores} />
      <NavigationStack.Screen name="OrderDetails" component={OrderDetails} />
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
