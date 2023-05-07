import { Card, Icon, Image, ListItem, Text } from "@rneui/themed";
import { DeviceHeight, DeviceWidth } from "../../../utils/Layouts";
import { View } from "react-native";

export type ProductCardProps = {
  title: string;
  address: string;
  icon?: string;
  isSelected: boolean;
};

export const StoreCard = (props: ProductCardProps) => {
  const { title, address, icon = "heart", isSelected = false } = props;
  return (
    <View
      style={{
        width: DeviceWidth * 0.45,
        height: DeviceWidth * 0.45,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 1,
        backgroundColor: isSelected ? "#4FB8E9" : "#fff",
      }}
    >
      <Icon
        name="heartbeat"
        type="font-awesome"
        size={34}
        color={isSelected ? "#fff" : "#4FB8E9"}
        onPress={() => console.log("hello")}
      />
      <Text
        h4={true}
        h4Style={{
          fontWeight: "bold",
          color: isSelected ? "#fff" : "#323232",
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      <Text
        h4={true}
        h4Style={{
          fontWeight: "bold",
          color: isSelected ? "#fff" : "#646464",
          fontSize: 14,
        }}
      >
        {address}
      </Text>
    </View>
  );
};
