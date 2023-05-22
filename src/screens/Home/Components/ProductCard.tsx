import React from "react";
import { Image, Text, Pressable, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg";
import { Icon } from "@rneui/base";
import { colors } from "../../../styles/colors";
import { DeviceWidth, spacing } from "../../../utils/Layouts";
import { ICart, ICartItem, IProduct } from "../../../utils/Models";
import { AppStackParamList } from "../../../navigation/AppNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RowContainer } from "../../../components/RowContainer";
import AsyncStorageService from "../../../services/Storage";
import { fonts } from "../../../styles/fonts";
import { FireStoreService, db } from "../../../services/FireStore";
import { DeviceId, FirestoreCollections } from "../../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Firestore, Timestamp, doc } from "firebase/firestore";
import { CartItem } from "../../Cart/components/CartItem";

interface Props {
  item: IProduct;
}

export const ProductCard = ({ item }: Props) => {
  const cartService = new FireStoreService<ICart>(FirestoreCollections.Carts);
  const productService = new FireStoreService<IProduct>(
    FirestoreCollections.Products
  );

  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  // creat the cart if not exist
  const createCart = async () => {
    const deviceId = await DeviceId();
    console.log("deviceId", deviceId);
    const cart: ICart = {
      id: deviceId,
      storeId: item.store,
      deviceId: deviceId,
      createdAt: Timestamp.now().toDate(),
    };
    return await cartService.create(cart);
  };

  const handleAddToCart = async (product: IProduct) => {
    const deviceId = await DeviceId();
    let cart = await cartService.getById(deviceId);

    if (!cart) {
      cart = await createCart();
    }

    console.log("cart", cart);

    const cartItem: ICartItem = {
      product: product,
      quantity: 1,
      price: product.price,
    };

    console.log("cartItem", cartItem);

    const items = await cartService.createInSubCollection<ICartItem>(
      cart.id!,
      FirestoreCollections.CartItems,
      cartItem
    );

    console.log("items", items);
  };

  return (
    <Pressable
      key={item.id}
      onPress={() =>
        navigation.navigate("Details", {
          productId: item.id!,
        })
      }
    >
      <View
        style={{
          alignItems: "flex-start",
          display: "flex",
          elevation: 1,
          flexDirection: "column",
          width: DeviceWidth * 0.41,
          marginHorizontal: 4,
          borderRadius: 10,
          backgroundColor: colors.secondary,
          marginTop: 20,
          height: 208,
        }}
      >
        <Image
          source={{
            uri: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
          }}
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: 106,
            width: "100%",
          }}
        />
        <View style={{ padding: 10, width: "100%" }}>
          <Text
            style={{
              fontSize: 14,
              color: colors.black,
              fontFamily: fonts.medium,
            }}
          >
            {item.name}
          </Text>
          <RowContainer
            styles={{
              justifyContent: "space-between",
              backgroundColor: colors.secondary,
              marginTop: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.bold,
                color: colors.primary,
              }}
            ></Text>
            <TouchableOpacity onPress={() => handleAddToCart(item)}>
              <WithLocalSvg
                asset={require("./../../../assets/icons/cartBtn.svg")}
              />
            </TouchableOpacity>
          </RowContainer>
        </View>
      </View>
    </Pressable>
  );
};
