// navigation stack

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { ProductDetails } from "../screens/ProductDetails/ProductDetails";
import { LoginScreen } from "../screens/Auth/Login";
import { NavigationContainer } from "@react-navigation/native";
import { Stores } from "../screens/Store/SelectStoreScreen";

export type AppStackParamList = {
  Store: undefined;
  Home: {
    storeId: string;
  };
  Details: {
    productId: string;
  };
  CheckOut: undefined;
  Cart: undefined;
};

const NavigationStack = createNativeStackNavigator<AppStackParamList>();

// navigation screen props

export type NavigationScreenProps<T extends keyof AppStackParamList> = {
  navigation: AppStackParamList[T] extends undefined
    ? {
        navigate: (screen: T) => void;
      }
    : {
        navigate: (screen: T, params: AppStackParamList[T]) => void;
      };
  route: {
    params: AppStackParamList[T];
  };
};

export type HomeScreenNavigationProps = NavigationScreenProps<"Home">;
export type ProductDetailsNavigationProps = NavigationScreenProps<"Details">;
export type StoreScrenNavigationProps = NavigationScreenProps<"Store">;

export const Stack = () => {
  return (
    <NavigationStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        title: "Home",
      }}
      initialRouteName="Store"
    >
      <NavigationStack.Screen name="Home" component={HomeScreen} />
      <NavigationStack.Screen
        name="Details"
        component={ProductDetails}
        options={(props) => ({
          title: `Profile: ${props.route.params.productId}`,
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
    <NavigationContainer>
      {user ? <Stack /> : <AuthStack />}
    </NavigationContainer>
  );
};
