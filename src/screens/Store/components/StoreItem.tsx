import { Card, Icon, Text } from "@rneui/themed";
import { DeviceHeight, DeviceWidth } from "../../../utils/Layouts";

export type ProductCardProps = {
  title: string;
  address: string;
  icon?: string;
};

export const StoreCard = (props: ProductCardProps) => {
  const { title, address, icon = "heart" } = props;
  return (
    <Card
      wrapperStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
      }}
      containerStyle={{
        width: DeviceWidth * 0.4,
        height: DeviceHeight * 0.25,
        borderRadius: 10,
        elevation: 1,
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
        h6="true"
        h6Style={{
          fontWeight: "bold",
          elevation: 1,
        }}
        style={{
          paddingBottom: 10,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 18,
        }}
      >
        {address}
      </Text>
    </Card>
  );
};
