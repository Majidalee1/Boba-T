import React from "react";
import { Card, Icon, Text } from "@rneui/themed";
import { DeviceHeight, DeviceWidth, spacing } from "../utils/Layouts";

export type ProductCardProps = {
  title: string;
  address: string;
  icon?: string;
};

export const ProductCard = (props: ProductCardProps) => {
  const { title, address, icon = "heart" } = props;
  return (
    <Card
      wrapperStyle={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "flex-start",
      }}
      containerStyle={{
        width: DeviceWidth * 0.4,
        height: DeviceHeight * 0.25,
        borderRadius: 10,
        elevation: 1,
        overflow: "hidden",
      }}
    >
      <Icon
        name="heart"
        color="#89CFF0"
        type="font-awesome"
        style={{
          paddingBottom: 30,
        }}
      />
      <Text
        h6={true}
        h6Style={{
          fontWeight: "bold",
          elevation: 1,
        }}
        style={{
          paddingBottom: 10,
          height: 30,
          overflow: "hidden",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 15,
          height: 50,
        }}
      >
        {address}
      </Text>
    </Card>
  );
};
