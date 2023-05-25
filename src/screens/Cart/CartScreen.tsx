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

import {
  GenerateCartItems,
  ICart,
  ICartItem,
  createOrder,
} from "../../utils/Models";
import { CartItem } from "./components/CartItem";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { faker } from "@faker-js/faker";
import { RowContainer } from "../../components/RowContainer";
import AsyncStorageService from "../../services/Storage";
import { FireStoreService } from "../../services/FireStore";
import { DeviceId, FirestoreCollections } from "../../utils/constants";

export interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<TabParamList, "Cart">;
}
export const CartScreen = ({ navigation, route }: Props) => {
  const cartService = new FireStoreService<ICart>(FirestoreCollections.Carts);
  const [CartItems, setCartItems] = useState<ICartItem[]>([]);

  async function getCartItems() {
    const deviceId = await DeviceId();
    const cart = await cartService.getById(deviceId);
    const cartItems = await cartService.getSubCollection<ICartItem>(
      cart?.id!,
      FirestoreCollections.CartItems
    );
    setCartItems(cartItems || []);
  }

  const removeCartItem = async (id: string) => {
    const deviceId = await DeviceId();
    await cartService.deleteFromSubCollection(
      deviceId,
      FirestoreCollections.CartItems,
      id
    );
    getCartItems();
  };

  // on checkout generate order number

  const handleCheckout = async () => {
    const order_number = faker.random.alphaNumeric(6);
    let total = 0;
    CartItems.forEach((element) => {
      total = total + Number(element.price);
    });
    console.log(total);
    const oderCreated = await createOrder({
      order_number,
      items: CartItems,
      total: total.toString(),
      status: "pending",
      createdAt: new Date().toString(),
    });

    console.log(oderCreated);

    if (oderCreated) {
      await AsyncStorageService.clear();
      setCartItems([]);
      navigation.navigate("Checkout", {
        order_number,
        items: CartItems,
        total: total.toString(),
        status: "pending",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getCartItems();
    });
    return unsubscribe;
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
            product={item.product}
            // name={item.product?.name}
            price={item.price}
            quantity={item.quantity}
            // total={0}
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
