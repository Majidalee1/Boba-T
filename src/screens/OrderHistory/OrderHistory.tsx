import React, { useEffect, useState } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  Image,
  FlatList,
} from "react-native";
import { Header } from "../../components/Header";
import { RowContainer } from "../../components/RowContainer";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { colors } from "../../styles/colors";
import { spacing } from "../../utils/Layouts";
import { IOrder, IProduct } from "../../utils/Models";
import { LocationHeader } from "./components/LocationHeader";
import { OrderCard } from "./components/OrderCard";
import { fonts } from "../../styles/fonts";
import { useFireStore, useFireStoreWithFilter } from "../../utils/Hooks";
import { FirestoreCollections } from "../../utils/constants";
import { FireStoreService } from "../../services/FireStore";
import { DeviceId } from "../../utils/constants";

const $container: ViewStyle = {
  flex: 1,
  // paddingHorizontal: spacing.large,
  backgroundColor: colors.secondary,
};
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.extraSmall,
  paddingBottom: spacing.extraSmall,
};

interface Props {
  route: RouteProp<TabParamList, "OrderHistory">;
  navigation: NavigationProp<AppStackParamList>;
}

// a helper component named Row Container that get the children as props and render them in a row

export const OrderHistory = ({ navigation, route }: Props) => {
  const cartService = new FireStoreService<IOrder>(FirestoreCollections.Orders);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getOrders = async () => {
    const deviceId = await DeviceId();
    const Orders = await cartService.getFiltered("deviceId", "==", deviceId);
    setOrders(Orders || []);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOrders();
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Header
        actions={{
          left: () => navigation.navigate("Store"),
        }}
      />
      <LocationHeader navigation={navigation}></LocationHeader>

      <FlatList
        scrollEnabled={true}
        data={orders}
        maxToRenderPerBatch={8}
        initialNumToRender={8}
        renderItem={({ item }) => <OrderCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.regular,
                color: colors.text_primary,
                fontSize: 14,
              }}
            >
              There are no orders
            </Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.large,
    backgroundColor: colors.secondary,
  },
  makeBtn: {
    width: 91,
    height: 30,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 6,
  },
  makeBtnTxt: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.primary,
  },
  bannerCard: {
    height: 137,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  storeImage: {
    height: 130,
    width: 100,
  },
  bannerTxt: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
});
