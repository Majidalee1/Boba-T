import { Avatar, Text, Icon } from "@rneui/base";
import { View } from "react-native";
import { colors } from "../../../styles/colors";
import { DeviceWidth, spacing } from "../../../utils/Layouts";
import { ICartItem } from "../../../utils/Models";
import { useState } from "react";
import { RowContainer } from "../../../components/RowContainer";

export const CartItem = ({ name, price, quantity, total }: ICartItem) => {
  const [itemCount, setItemCount] = useState<number>(quantity || 0);

  return (
    <View
      style={{
        backgroundColor: colors.secondary,
        width: "100%",
        borderRadius: 20,
        paddingHorizontal: 10,
        justifyContent: "flex-start",
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        maxWidth: DeviceWidth * 0.9,
        height: DeviceWidth * 0.25,
        shadowColor: "rgba(0,0,0,0.05)",
        elevation: 2,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 54,
      }}
    >
      <Avatar
        rounded={true}
        source={{
          uri: "https://source.unsplash.com/random/?portrait",
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
            h4={true}
            h4Style={{
              fontWeight: "bold",
              fontSize: spacing.medium,
              paddingEnd: 10,
              color: colors.text_primary,
              alignSelf: "flex-start",
            }}
          >
            {name}
          </Text>
          <Icon
            name="trash"
            type="font-awesome"
            color="#f44336"
            size={spacing.medium}
            onPress={() => console.log(`delete item with id`)}
          />
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
          <RowContainer>
            <Icon
              name="minus"
              type="font-awesome"
              style={{ paddingEnd: 10 }}
              color={colors.text_primary}
              size={spacing.medium}
              onPress={() => setItemCount(itemCount > 0 ? itemCount - 1 : 0)}
            />
            <Text>{itemCount}</Text>
            <Icon
              name="plus"
              type="font-awesome"
              color={colors.text_primary}
              style={{
                paddingStart: 10,
              }}
              size={spacing.medium}
              onPress={() => setItemCount(itemCount + 1)}
            />
          </RowContainer>
          <Text
            h4={true}
            h4Style={{
              fontWeight: "700",
              fontSize: spacing.medium,
              color: colors.primary,
            }}
          >
            {price}
          </Text>
        </RowContainer>
      </View>
    </View>
  );
};