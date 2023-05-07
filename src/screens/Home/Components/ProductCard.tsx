import { Icon, Text, Image } from "@rneui/base";
import React from "react";
import { Pressable, View } from "react-native";
import { colors } from "../../../styles/colors";
import { DeviceWidth, spacing } from "../../../utils/Layouts";

import { ICartItem, IProduct } from "../../../utils/Models";
import { AppStackParamList } from "../../../navigation/AppNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RowContainer } from "../../../components/RowContainer";
import AsyncStorageService from "../../../services/Storage";

interface Props {
  item: IProduct;
  navigation: NavigationProp<AppStackParamList>;
}

export const ProductCard = ({ item, navigation }: Props) => {
  const handleAddToCart = async (product: IProduct) => {
    const cartItems: ICartItem[] | null = await AsyncStorageService.getItem(
      "cart"
    );
    console.log("cart items", cartItems);
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
    <Pressable key={item.id} onPress={() => console.log("tea selection store")}>
      <View
        style={{
          alignItems: "flex-start",
          display: "flex",
          elevation: 1,
          height: DeviceWidth * 0.5,
          flexDirection: "column",
          width: DeviceWidth * 0.41,
          marginHorizontal: 4,
          marginVertical: 5,
          borderRadius: 10,
          backgroundColor: colors.secondary,
        }}
      >
        <Image
          source={{
            uri: "https://source.unsplash.com/random/?bubble,tea",
          }}
          style={{
            width: DeviceWidth * 0.41,
            height: DeviceWidth * 0.3,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <Text
          h4={true}
          textBreakStrategy="highQuality"
          h4Style={{
            fontWeight: "bold",
            fontSize: spacing.medium,
            paddingEnd: 10,
            height: DeviceWidth * 0.12,
            paddingVertical: 5,
            paddingHorizontal: 10,
            color: colors.text_primary,
            alignSelf: "flex-start",
          }}
        >
          {item.name}
        </Text>
        <RowContainer
          styles={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            justifyContent: "space-between",
            backgroundColor: colors.secondary,
            width: DeviceWidth * 0.41,
          }}
        >
          <Text
            h4={true}
            h4Style={{
              fontWeight: "bold",
              fontSize: spacing.small,
            }}
          >
            $ 5.00
          </Text>
          <Icon
            name="cart-plus"
            type="font-awesome"
            onPress={() => handleAddToCart(item)}
            color={colors.primary}
            size={spacing.medium}
          />
        </RowContainer>
      </View>
    </Pressable>
  );
};
