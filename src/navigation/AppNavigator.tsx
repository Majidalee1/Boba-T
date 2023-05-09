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
import { WithLocalSvg } from "react-native-svg";

export type AppStackParamList = {
  Store: undefined;
  Home: {
    storeId: string;
  };
  Details: {
    productId: string;
  };
  CheckOut: undefined;
  Cart: {
    storeId: string;
    cartId?: string;
  };
  CustomTea: undefined;
  Welcome: undefined;
  Tabs: undefined;
};

const NavigationStack = createNativeStackNavigator<AppStackParamList>();

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

export type TabsScreenNavigationProps = NavigationScreenProps<"Tabs">;
export type WelcomeScreenNavigationProps = NavigationScreenProps<"Welcome">;
export type HomeScreenNavigationProps = NavigationScreenProps<"Home">;
export type ProductDetailsNavigationProps = NavigationScreenProps<"Details">;
export type StoreScrenNavigationProps = NavigationScreenProps<"Store">;
export type CartScreenNavigationProps = NavigationScreenProps<"Cart">;

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
          }

          // You can return any component that you like here!
          return iconName;
        },
        // tabBarActiveTintColor: "tomato",
        // tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        initialParams={{
          cartId: "1",
          storeId: "1",
        }}
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
        title: "Home",
      }}
      initialRouteName="Welcome"
    >
      {/* CustomTeaScreen */}
      <NavigationStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <NavigationStack.Screen name="CustomTea" component={CustomTeaScreen} />
      {/* <NavigationStack.Screen
        name="Cart"
        initialParams={{
          cartId: "1",
          storeId: "1",
        }}
        component={CartScreen}
      /> */}
      <NavigationStack.Screen
        name="Tabs"
        component={BottomTabNavigator}
        // initialParams={{
        //   storeId: "1",
        // }}
      />
      <NavigationStack.Screen
        name="Details"
        component={ProductDetails}
        options={(props) => ({
          title: `Profile: `,
          // ${props.route.params.productId}
        })}
      />
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
