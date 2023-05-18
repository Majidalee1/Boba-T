import React, { useEffect, useState } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  FlatList,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { Header } from "../../components/Header";
import { RowContainer } from "../../components/RowContainer";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { colors } from "../../styles/colors";
import { DeviceWidth, spacing } from "../../utils/Layouts";
import {
  CreateProducts,
  GenerateCategories,
  GenerateProducts,
  IProduct,
} from "../../utils/Models";
import { CategoryList } from "./Components/CategoryList";
import { LocationHeader } from "./Components/LocationHeader";
import { ProductCard } from "./Components/ProductCard";
import { fonts } from "../../styles/fonts";
import { useFireStore, useFireStoreWithFilter } from "../../utils/Hooks";

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
  route: RouteProp<TabParamList, "Home">;
  navigation: NavigationProp<AppStackParamList>;
}

// a helper component named Row Container that get the children as props and render them in a row

export const HomeScreen = ({ navigation, route }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const store_id = route.params.storeId;

  const [products, setProducts] = useFireStoreWithFilter<IProduct>("products", {
    field: "store",
    operator: "==",
    value: store_id,
  });

  useEffect(() => {
    console.log("products", products);
  }, [products]);

  return (
    <View style={styles.container}>
      <Header
        actions={{
          left: () => navigation.navigate("Store"),
        }}
      />
      <View>
        <LocationHeader navigation={navigation}></LocationHeader>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("CustomTea")}
        >
          <Text
            style={{
              fontSize: 24,
              color: colors.primary,
              fontFamily: fonts.semiBold,
              flex: 1,
            }}
          >
            Find the best Tea for you
          </Text>
        </TouchableOpacity>
      </View>
      {/* Slide section */}
      <View style={styles.bannerCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTxt}>
            Make Your Own Customizable Bubble Tea
          </Text>
          <TouchableOpacity style={styles.makeBtn}>
            <Text style={styles.makeBtnTxt}>Make</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("./../../assets/images/bubble-milk.png")}
          style={styles.storeImage}
          resizeMode="stretch"
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          color: "#1C1E23",
          fontFamily: fonts.semiBold,
          marginTop: 20,
        }}
      >
        Tea Category
      </Text>
      <RowContainer
        styles={{
          marginVertical: 10,
        }}
      >
        <CategoryList
          categories={GenerateCategories(10)}
          selectedCategory={selectedCategory}
          onSelecCategory={(name) => setSelectedCategory(name)}
        />
      </RowContainer>

      <FlatList
        scrollEnabled={true}
        data={products}
        maxToRenderPerBatch={8}
        initialNumToRender={8}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id!}
        numColumns={2}
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
