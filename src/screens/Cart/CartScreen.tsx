import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from "react-native";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  Avatar,
  // Button,
  Dialog,
  Icon,
  Input,
  ListItem,
  Switch,
} from "@rneui/themed";
import { colors } from "./../../styles/colors";
import { DeviceHeight, DeviceWidth, spacing } from "../../utils/Layouts";
import { Button } from "../../components/Button";
import { fonts } from "../../styles/fonts";

import { GenerateCartItems, ICartItem, createOrder } from "../../utils/Models";
import { CartItem } from "./components/CartItem";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { faker } from "@faker-js/faker";
import { RowContainer } from "../../components/RowContainer";
import AsyncStorageService from "../../services/Storage";

export interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<TabParamList, "Cart">;
}
export const CartScreen = ({ navigation, route }: Props) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  // get cart items from storage
  const [CartItems, setCartItems] = useState<ICartItem[]>([]);
  async function getCartItems() {
    // AsyncStorageService.clear();
    const cartItems = await AsyncStorageService.getItem("cart");
    console.log(cartItems);
    setCartItems(cartItems ? cartItems : []);
  }

  const removeCartItem = async (id: string) => {
    const newCartItems = CartItems.filter((item) => item.id !== id);
    await AsyncStorageService.setItem("cart", newCartItems);
    setCartItems(newCartItems);
  };

  // on checkout generate order number

  const handleCheckout = async () => {
    const order_number = faker.random.alphaNumeric(6);
    const oderCreated = await createOrder({
      order_number,
      items: CartItems,
      total: "17.54",
      status: "pending",
    });

    console.log(oderCreated);

    if (oderCreated) {
      await AsyncStorageService.clear();
      setCartItems([]);
      navigation.navigate("Checkout", { order_number });
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#FBFCFF",
        flex: 1,
      }}
    >
      <Text
        style={{
          color: "#323232",
          textAlign: "center",
          fontSize: 18,
          fontFamily: fonts.medium,
          marginTop: 20,
        }}
      >
        Cart Items ({CartItems.length})
      </Text>
      <FlatList
        // style={{ maxHeight: DeviceHeight * 0.8 }}
        data={CartItems}
        scrollEnabled={true}
        keyExtractor={(item) => item.id!}
        renderItem={({ item, index, separators }) => (
          <CartItem
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            total={item.total}
            removeCartItem={removeCartItem}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* checkout button */}
      <View style={{ marginBottom: 20 }}>
        <Button
          title={"Proceed to Checkout $17.54"}
          onPress={() => handleCheckout()}
        />
      </View>
      <StatusBar translucent={false} backgroundColor="#FBFCFF" />
    </View>
  );
};
