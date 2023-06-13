import React, { useContext } from "react";
import { FlatList, View, Text, StatusBar } from "react-native";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { colors } from "./../../styles/colors";
import { Button } from "../../components/Button";
import { fonts } from "../../styles/fonts";

import { ICart, ICartItem, createOrder } from "../../utils/Models";
import { CartItem } from "./components/CartItem";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { FireStoreService } from "../../services/FireStore";
import { DeviceId, FirestoreCollections } from "../../utils/constants";
import { useToast } from "react-native-toast-notifications";
import userContext from "../../context/useContext";

export interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<TabParamList, "Cart">;
}
export const CartScreen = ({ navigation, route }: Props) => {
  const state = useContext(userContext);
  let { storeData } = state.appState;
  console.log("====state=====", storeData);
  const toast = useToast();
  const cartService = new FireStoreService<ICart>(FirestoreCollections.Carts);
  const [CartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>("0");
  const [loader, setLoader] = useState(false);
  // const [loader2, setLoader2] = useState(true);

  async function getCartItems() {
    const deviceId = await DeviceId();
    console.log(deviceId);
    const cart = await cartService.getById(deviceId);
    // console.log("==>>>>cart", cart);
    if (cart) {
      const cartItems = await cartService.getSubCollection<ICartItem>(
        cart?.Id,
        FirestoreCollections.CartItems
      );
      let total = 0;
      cartItems?.forEach((element) => {
        total = total + Number(element.price);
      });
      setTotalPrice(total.toString());
      // console.log("====cartItems===", cartItems);
      setCartItems(cartItems || []);
    }
  }

  useEffect(() => {}, [CartItems]);

  const removeCartItem = async (id: string) => {
    const deviceId = await DeviceId();
    const cart = await cartService.getById(deviceId);
    await cartService.deleteFromSubCollection(
      cart?.Id,
      FirestoreCollections.CartItems,
      id
    );
    toast.show("item removed successfully", {
      type: "success",
      placement: "bottom",
      duration: 2000,
      offset: 30,
      animationType: "zoom-in",
    });
    getCartItems();
  };

  // on checkout generate order number

  const handleCheckout = async () => {
    setLoader(true);
    const deviceId = await DeviceId();
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
      orderType: "notCustom",
      store_id: storeData.id,
      storeName: storeData.name,
    });

    // console.log(oderCreated);

    if (oderCreated) {
      await cartService.delete(deviceId);
      // await AsyncStorageService.clear();
      setCartItems([]);
      setLoader(false);
      navigation.navigate("Checkout", {
        order_number,
        items: CartItems,
        total: total.toString(),
        status: "pending",
      });
    }
  };

  const increament = (type: string, index: number) => {
    var actualPrice =
      Number(CartItems[index].price) / Number(CartItems[index].quantity);
    if (type === "increase") {
      CartItems[index].quantity = Number(CartItems[index].quantity) + 1;
    } else {
      CartItems[index].quantity = Number(CartItems[index].quantity) - 1;
    }
    CartItems[index].price = (
      actualPrice * Number(CartItems[index].quantity)
    ).toString();
    let total = 0;
    CartItems.forEach((element) => {
      total = total + Number(element.price);
    });
    setTotalPrice(total.toString());
    setCartItems([...CartItems]);
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
        data={CartItems}
        scrollEnabled={true}
        keyExtractor={(item) => item.id!}
        renderItem={({ item, index, separators }) => (
          <CartItem
            id={item.id}
            product={item.product}
            price={item.price}
            quantity={item.quantity}
            removeCartItem={removeCartItem}
            index={index}
            increament={increament}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.regular,
                color: colors.text_primary,
                fontSize: 14,
              }}
            >
              There are no items
            </Text>
          </View>
        )}
      />

      {/* checkout button */}
      {CartItems.length !== 0 && (
        <View style={{ marginBottom: 20 }}>
          <Button
            title={`Proceed to Checkout $${totalPrice}`}
            onPress={() => handleCheckout()}
            loader={loader}
          />
        </View>
      )}

      <StatusBar translucent={false} backgroundColor="#FBFCFF" />
    </View>
  );
};
