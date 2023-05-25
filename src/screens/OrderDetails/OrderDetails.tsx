import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  StyleSheet,
} from "react-native";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Avatar, Dialog, Icon, Input, ListItem, Switch } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";
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
import { CartItem } from "./Components/CartItem";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { faker } from "@faker-js/faker";
import { RowContainer } from "../../components/RowContainer";
import AsyncStorageService from "../../services/Storage";
import { FireStoreService } from "../../services/FireStore";
import { DeviceId, FirestoreCollections } from "../../utils/constants";

export interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "OrderDetails">;
}
export const OrderDetails = ({ navigation, route }: Props) => {
  const cartService = new FireStoreService<ICart>(FirestoreCollections.Carts);
  const [CartItems, setCartItems] = useState<ICartItem[]>([]);
  async function getCartItems() {
    // const deviceId = await DeviceId();
    // const cart = await cartService.getById(deviceId);
    // const cartItems = await cartService.getSubCollection<ICartItem>(
    //   cart?.id!,
    //   FirestoreCollections.CartItems
    // );
    // setCartItems(cartItems || []);
    setCartItems([
      {
        product: {
          id: "1",
          deviceId: "12",
          createdAt: new Date(),
          storeId: "1",
          name: "Pastel purple Tea",
        },
        price: "$5.86",
        quantity: 2,
        id: "12",
      },
    ]);
  }

  const removeCartItem = async (id: string) => {
    const deviceId = await DeviceId();

    return await cartService.deleteFromSubCollection(
      deviceId,
      FirestoreCollections.CartItems,
      id
    );
  };

  // on checkout generate order number

  const handleCheckout = async () => {
    // const order_number = faker.random.alphaNumeric(6);
    // const oderCreated = await createOrder({
    //   order_number,
    //   items: CartItems,
    //   total: "17.54",
    //   status: "pending",
    // });
    // console.log(oderCreated);
    // if (oderCreated) {
    //   await AsyncStorageService.clear();
    //   setCartItems([]);
    //   navigation.navigate("Checkout", { order_number });
    // }
  };

  useEffect(() => {
    (async () => {
      getCartItems();
    })();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#FBFCFF",
        flex: 1,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={24} color="#5A5A5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>
      <FlatList
        // style={{ maxHeight: DeviceHeight * 0.8 }}
        data={CartItems}
        scrollEnabled={true}
        keyExtractor={(item) => item.id!}
        renderItem={({ item, index, separators }) => (
          <CartItem
            id={item.id}
            // name={item.name}
            price={item.price}
            quantity={item.quantity}
            removeCartItem={removeCartItem}
            product={item.product}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* checkout button */}
      <View style={{ marginBottom: 20 }}>
        <Button title={"Mark as complete"} onPress={() => handleCheckout()} />
      </View>
      <StatusBar translucent={false} backgroundColor="#FBFCFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    // elevation: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#5A5A5C",
    fontFamily: fonts.regular,
    fontSize: 18,
    marginRight: 20,
  },
  backBtn: {
    backgroundColor: "#D3F1FF",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
