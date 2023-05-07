import {
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  Avatar,
  Button,
  Dialog,
  Icon,
  Input,
  ListItem,
  Switch,
  Text,
} from "@rneui/themed";
import { colors } from "./../../styles/colors";
import { DeviceHeight, DeviceWidth, spacing } from "../../utils/Layouts";

import { GenerateCartItems } from "../../utils/Models";
import { CartItem } from "./components/CartItem";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { faker } from "@faker-js/faker";
import { RowContainer } from "../../components/RowContainer";

export interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "Cart">;
}
export const CartScreen = ({ navigation, route }: Props) => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <Text
        h4={true}
        h4Style={{
          fontWeight: "500",
          elevation: 1,
          marginVertical: 20,
          paddingHorizontal: 10,
          color: colors.text_primary,
          fontSize: spacing.title,
          alignSelf: "center",
        }}
      >
        Cart Items (40)
      </Text>
      <FlatList
        style={{ maxHeight: DeviceHeight * 0.8 }}
        data={GenerateCartItems({
          quantity: 4,
          cart_id: route.params.storeId,
        })}
        scrollEnabled={true}
        keyExtractor={(item) => item.id!}
        renderItem={({ item, index, separators }) => (
          <CartItem
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            total={item.total}
          />
        )}
      />
      {/* checkout button */}
      <Button
        title="Checkout"
        buttonStyle={{
          backgroundColor: colors.primary,
          borderRadius: 16,
          height: 60,
        }}
        onPress={() => setIsDialogVisible(!isDialogVisible)}
        containerStyle={{
          width: DeviceWidth * 0.8,
          height: DeviceHeight * 0.1,
          alignSelf: "center",
          marginHorizontal: 50,
          marginVertical: 20,
        }}
      />

      <CheckoutDialog
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
        value={route.params.storeId}
      ></CheckoutDialog>
    </View>
  );
};

// checkout Dialog

export const CheckoutDialog = ({
  isDialogVisible,
  setIsDialogVisible,
  value,
}: {
  isDialogVisible: boolean;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
}) => (
  <Dialog
    hardwareAccelerated={true}
    isVisible={isDialogVisible}
    overlayStyle={{
      borderRadius: 12,
      width: DeviceWidth * 0.8,
    }}
    style={{
      backgroundColor: colors.background,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    }}
    onBackdropPress={() => setIsDialogVisible(!isDialogVisible)}
  >
    <View
      style={{
        flexDirection: "column",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        h4={true}
        h4Style={{
          fontWeight: "900",
          elevation: 1,
          fontSize: 18,
          color: colors.text_primary,
          alignSelf: "center",
          paddingHorizontal: 10,
          paddingVertical: 2,
        }}
      >
        Show This To Your Cashier
      </Text>
      {/* ORder Number Tex */}
      <Text
        h4={true}
        h4Style={{
          fontWeight: "300",
          elevation: 1,
          fontSize: 14,
          color: colors.text_secondary,
          paddingBottom: 10,
        }}
      >
        {`Order Number: #${faker.random.alphaNumeric(10)}`}
      </Text>
      <QRCode
        value={value}
        color={colors.primary}
        backgroundColor={colors.secondary}
        size={DeviceWidth * 0.6}
      ></QRCode>
    </View>
    {/* Read only input Feild */}
    <TouchableOpacity
      style={{
        borderRadius: 16,
        height: 60,
        width: DeviceWidth * 0.5,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
      }}
      onPress={() => setIsDialogVisible(!isDialogVisible)}
    >
      <RowContainer
        styles={{
          borderRadius: 12,
          height: 40,
          width: DeviceWidth * 0.4,
          alignSelf: "center",
          elevation: 1,
          borderColor: colors.primary,
          borderWidth: 1,
          alignContent: "center",
          paddingHorizontal: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          h4={true}
          h4Style={{
            fontWeight: "300",
            elevation: 1,
            fontSize: spacing.small,
          }}
        >
          Click To Copy
        </Text>
        <Icon
          name="content-copy"
          type="material-community"
          color={colors.primary}
          size={spacing.large}
        />
      </RowContainer>
    </TouchableOpacity>
  </Dialog>
);
