import React from "react";
import {
  Image,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg";
import { Icon } from "@rneui/base";
import { colors } from "../../../styles/colors";
import { DeviceWidth, spacing } from "../../../utils/Layouts";
import { ICart, ICartItem, IOrder, IProduct } from "../../../utils/Models";
import { AppStackParamList } from "../../../navigation/AppNavigator";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RowContainer } from "../../../components/RowContainer";
import { fonts } from "../../../styles/fonts";
import { FireStoreService, db } from "../../../services/FireStore";
import { DeviceId, FirestoreCollections } from "../../../utils/constants";
import { Firestore, Timestamp, doc } from "firebase/firestore";
import moment from "moment";

interface Props {
  item: IOrder;
}

export const OrderCard = ({ item }: Props) => {
  const cartService = new FireStoreService<ICart>(FirestoreCollections.Carts);
  const productService = new FireStoreService<IProduct>(
    FirestoreCollections.Products
  );

  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  // creat the cart if not exist
  // const createCart = async () => {
  //   const deviceId = await DeviceId();
  //   console.log("deviceId", deviceId);
  //   const cart: ICart = {
  //     id: deviceId,
  //     storeId: item.store,
  //     deviceId: deviceId,
  //     createdAt: Timestamp.now().toDate(),
  //   };
  //   return await cartService.create(cart);
  // };

  return (
    <View
      style={{
        elevation: 2,
        width: "100%",
        borderRadius: 13,
        backgroundColor: colors.secondary,
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.lightGray,
      }}
    >
      <View style={{ padding: 10, width: "100%" }}>
        <Text
          style={{
            fontSize: 17,
            color: colors.black,
            fontFamily: fonts.medium,
          }}
        >
          #{item.order_number}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "#6A6A6A",
            fontFamily: fonts.regular,
          }}
        >
          {moment(item.createdAt).format("DD MMM YYYY")}
        </Text>
        <RowContainer
          styles={{
            justifyContent: "space-between",
            backgroundColor: colors.secondary,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <View
            style={[
              styles.statusBox,
              {
                backgroundColor: "#EDFFDE",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.medium,
                textTransform: "capitalize",
                color:
                  item.status === "approved"
                    ? "#86EC36"
                    : item.status === "pending" && "#E9CA28",
              }}
            >
              {item.status}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => navigation.navigate("OrderDetails", { item: item })}
          >
            <Text style={styles.detailsBtnTxt}>Details</Text>
          </TouchableOpacity>
        </RowContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBox: {
    backgroundColor: "#EDFFDE",
    paddingHorizontal: 10,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
  },
  detailsBtn: {
    backgroundColor: colors.primary,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 92,
  },
  detailsBtnTxt: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
});
