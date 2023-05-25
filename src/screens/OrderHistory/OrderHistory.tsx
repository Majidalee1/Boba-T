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
  const [orders, setStores] = useFireStore<IOrder>("orders");
  // console.log(typeof new Date().toString());
  // const orders = [
  //   {
  //     id: "#98693923",
  //     status: "Completed",
  //     date: new Date(),
  //     products: [
  //       {
  //         name: "Pastel purple Tea",
  //         image:
  //           "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
  //         quantity: 1,
  //         price: "$5.86",
  //       },
  //     ],
  //   },
  //   {
  //     id: "#98693923",
  //     status: "Pending",
  //     date: new Date(),
  //     products: [
  //       {
  //         name: "Pastel purple Tea",
  //         image:
  //           "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
  //         quantity: 1,
  //         price: "$5.86",
  //       },
  //     ],
  //   },
  // ];
  return (
    <View style={styles.container}>
      <Header
        actions={{
          left: () => navigation.navigate("Store"),
        }}
      />
      <View>
        <LocationHeader navigation={navigation}></LocationHeader>
      </View>

      <FlatList
        scrollEnabled={true}
        data={orders}
        maxToRenderPerBatch={8}
        initialNumToRender={8}
        renderItem={({ item }) => <OrderCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
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
