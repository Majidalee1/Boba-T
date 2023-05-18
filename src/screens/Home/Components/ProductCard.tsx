import React from "react";
import { Image, Text, Pressable, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg";
import { Icon } from "@rneui/base";
import { colors } from "../../../styles/colors";
import { DeviceWidth, spacing } from "../../../utils/Layouts";
import { ICartItem, IProduct } from "../../../utils/Models";
import { AppStackParamList } from "../../../navigation/AppNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RowContainer } from "../../../components/RowContainer";
import AsyncStorageService from "../../../services/Storage";
import { fonts } from "../../../styles/fonts";

interface Props {
  item: IProduct;
}

export const ProductCard = ({ item }: Props) => {
  const navigation = useNavigation();
  const handleAddToCart = async (product: IProduct) => {
    const cartItems: ICartItem[] | null = await AsyncStorageService.getItem(
      "cart"
    );
    if (cartItems) {
      await AsyncStorageService.setItem("cart", [...cartItems, product]);
      if (!cartItems.includes(product)) {
        await AsyncStorageService.setItem("cart", [...cartItems, product]);
      }
    } else {
      await AsyncStorageService.setItem("cart", [product]);
    }
  };

  return (
    <Pressable key={item.id} onPress={() => navigation.navigate("Details")}>
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
