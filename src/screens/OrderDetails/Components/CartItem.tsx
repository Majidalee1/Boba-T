import React from "react";
import { Avatar, Icon } from "@rneui/base";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";
import { DeviceWidth, spacing } from "../../../utils/Layouts";
import { ICartItem } from "../../../utils/Models";
import { useEffect, useState } from "react";
import { RowContainer } from "../../../components/RowContainer";
import { WithLocalSvg } from "react-native-svg";
import { fonts } from "../../../styles/fonts";

export const CartItem = ({
  price,
  quantity,
  product,
}: ICartItem & { removeCartItem: (id: string) => void }) => {
  const [itemCount, setItemCount] = useState<number>(quantity || 0);
  const [item, setItem] = useState(0);
  return (
    <View style={styles.card}>
      <Avatar
        rounded={true}
        source={{
          uri: product?.image,
        }}
        size="medium"
      />
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: DeviceWidth * 0.65,
          paddingHorizontal: 5,
        }}
      >
        <RowContainer
          styles={{
            justifyContent: "space-between",
            alignItems: "center",
            width: DeviceWidth * 0.65,
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: spacing.medium,
              color: colors.text_primary,
              fontFamily: fonts.medium,
            }}
          >
            {product?.name}
          </Text>
        </RowContainer>
        <RowContainer
          styles={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 5,

            width: DeviceWidth * 0.65,
            paddingHorizontal: 5,
          }}
        >
          <View style={styles.itemsBtns}>
            <TouchableOpacity disabled={true} onPress={() => setItem(item - 1)}>
              <AntDesign
                name="minus"
                size={15}
                color={item === 0 ? "#969696" : colors.text_primary}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: colors.text_primary,
                fontFamily: fonts.medium,
                fontSize: 14,
              }}
            >
              {itemCount}
            </Text>
            <TouchableOpacity onPress={() => setItem(item + 1)} disabled={true}>
              <AntDesign name="plus" size={15} color={colors.text_primary} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 18,
              color: colors.primary,
              fontFamily: fonts.bold,
            }}
          >
            ${price}
          </Text>
        </RowContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    width: "90%",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 54,
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
  },
  itemsBtns: {
    flexDirection: "row",
    height: 33,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    width: 74,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 24,
  },
});
