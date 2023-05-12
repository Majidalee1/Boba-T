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
import { TabParamList } from "../../navigation/AppNavigator";
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

import { GenerateCartItems, ICartItem } from "../../utils/Models";
import { CartItem } from "./components/CartItem";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { faker } from "@faker-js/faker";
import { RowContainer } from "../../components/RowContainer";
import AsyncStorageService from "../../services/Storage";

export interface Props {
  navigation: NavigationProp<TabParamList>;
  route: RouteProp<TabParamList, "Cart">;
}
export const CartScreen = ({ navigation, route }: Props) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  // get cart items from storage
  const [CartItems, setCartItems] = useState<ICartItem[]>([]);
  async function getCartItems() {
    const cartItems = await AsyncStorageService.getItem("cart");
    setCartItems(cartItems ? cartItems : []);
  }

  const removeCartItem = async (id: string) => {
    const newCartItems = CartItems.filter((item) => item.id !== id);
    await AsyncStorageService.setItem("cart", newCartItems);
    setCartItems(newCartItems);
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
          onPress={() => navigation.navigate("Checkout")}
        />
      </View>
      <StatusBar translucent={false} backgroundColor="#FBFCFF" />

      {/* <CheckoutDialog
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
        value={route.params.storeId}
      ></CheckoutDialog> */}
    </View>
  );
};

// checkout Dialog

// export const CheckoutDialog = ({
//   isDialogVisible,
//   setIsDialogVisible,
//   value,
// }: {
//   isDialogVisible: boolean;
//   setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   value: string;
// }) => (
//   <Dialog
//     hardwareAccelerated={true}
//     isVisible={isDialogVisible}
//     overlayStyle={{
//       borderRadius: 12,
//       width: DeviceWidth * 0.8,
//     }}
//     style={{
//       backgroundColor: colors.background,
//       borderRadius: 20,
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//     onBackdropPress={() => setIsDialogVisible(!isDialogVisible)}
//   >
//     <View
//       style={{
//         flexDirection: "column",
//         borderRadius: 10,
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Text
//         h4={true}
//         h4Style={{
//           fontWeight: "900",
//           elevation: 1,
//           fontSize: 18,
//           color: colors.text_primary,
//           alignSelf: "center",
//           paddingHorizontal: 10,
//           paddingVertical: 2,
//         }}
//       >
//         Show This To Your Cashier
//       </Text>
//       {/* ORder Number Tex */}
//       <Text
//         h4={true}
//         h4Style={{
//           fontWeight: "300",
//           elevation: 1,
//           fontSize: 14,
//           color: colors.text_secondary,
//           paddingBottom: 10,
//         }}
//       >
//         {`Order Number: #${faker.random.alphaNumeric(10)}`}
//       </Text>
//       <QRCode
//         value={value}
//         color={colors.primary}
//         backgroundColor={colors.secondary}
//         size={DeviceWidth * 0.6}
//       ></QRCode>
//     </View>
//     {/* Read only input Feild */}
//     <TouchableOpacity
//       style={{
//         borderRadius: 16,
//         height: 60,
//         width: DeviceWidth * 0.5,
//         alignSelf: "center",
//         alignItems: "center",
//         justifyContent: "center",
//         marginVertical: 20,
//       }}
//       onPress={() => setIsDialogVisible(!isDialogVisible)}
//     >
//       <RowContainer
//         styles={{
//           borderRadius: 12,
//           height: 40,
//           width: DeviceWidth * 0.4,
//           alignSelf: "center",
//           elevation: 1,
//           borderColor: colors.primary,
//           borderWidth: 1,
//           alignContent: "center",
//           paddingHorizontal: 10,
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Text
//           h4={true}
//           h4Style={{
//             fontWeight: "300",
//             elevation: 1,
//             fontSize: spacing.small,
//           }}
//         >
//           Click To Copy
//         </Text>
//         <Icon
//           name="content-copy"
//           type="material-community"
//           color={colors.primary}
//           size={spacing.large}
//         />
//       </RowContainer>
//     </TouchableOpacity>
//   </Dialog>
// );
