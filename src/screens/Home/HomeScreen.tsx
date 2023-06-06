import React, { useEffect, useState, useRef } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  FlatList,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Header } from "../../components/Header";
import { RowContainer } from "../../components/RowContainer";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { colors } from "../../styles/colors";
import { spacing } from "../../utils/Layouts";
import { IProduct, IStore, IBanner } from "../../utils/Models";
import { CategoryList } from "./Components/CategoryList";
import { LocationHeader } from "./Components/LocationHeader";
import { ProductCard } from "./Components/ProductCard";
import { fonts } from "../../styles/fonts";
import { useFireStoreWithFilter, useFireStoreById } from "../../utils/Hooks";
import { FirestoreCollections } from "../../utils/constants";
import { useFireStore } from "../../utils/Hooks";
import Carousel from "./Components/Carousal";

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
const screens = Dimensions.get("window");
const { width: screenWidth } = Dimensions.get("window");
export const HomeScreen = ({ navigation, route }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const store_id = route.params.storeId;

  const [products, setProducts] = useFireStoreWithFilter<IProduct>(
    FirestoreCollections.Products,
    {
      field: "storeID",
      operator: "==",
      value: store_id,
    }
  );
  const [store, setStore] = useFireStoreById<IStore>(
    FirestoreCollections.Stores,
    store_id
  );

  const [banners, setbanners] = useFireStore<IStore>("Banners");

  console.log("banners", banners);

  useEffect(() => {
    console.log("store_id", typeof store_id);
  }, [products]);

  const filteredProducts = products.filter((item) => {
    return item.category
      .toLowerCase()
      .includes(selectedCategory?.toLowerCase());
  });

  const _renderItem = (sliderValue: any) => {
    return (
      <View
        style={{
          width: screenWidth,
        }}
      >
        <ImageBackground
          source={{ uri: sliderValue.image }}
          style={styles.bannerCard}
        >
          <View style={{ width: "100%" }}>
            <Text style={styles.bannerTxt}>{sliderValue?.title}</Text>
            <Text style={[styles.bannerTxt, { fontFamily: "Poppins-Medium" }]}>
              {sliderValue?.description}
            </Text>
          </View>
          <Image
            source={require("./../../assets/images/bubble-milk.png")}
            style={styles.storeImage}
            resizeMode="stretch"
          />
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Header
          actions={{
            left: () => navigation.navigate("Store"),
          }}
        />
      </View>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <LocationHeader navigation={navigation} name={store.name} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: colors.primary,
            fontFamily: fonts.medium,
            lineHeight: 25,
          }}
        >
          Make your own customizable tea?
        </Text>
        <TouchableOpacity
          style={styles.makeBtn}
          onPress={() => navigation.navigate("CustomTea", { store: store })}
        >
          <Text style={styles.makeBtnTxt}>Make</Text>
        </TouchableOpacity>
      </View>

      <Carousel data={banners} renderItem={_renderItem} />

      <Text
        style={{
          fontSize: 16,
          color: "#1C1E23",
          fontFamily: fonts.semiBold,
          marginTop: 20,
          width: "90%",
          alignSelf: "center",
        }}
      >
        Tea Category
      </Text>
      {store.length !== 0 && (
        <RowContainer
          styles={{
            marginVertical: 10,
            paddingHorizontal: "5%",
          }}
        >
          <CategoryList
            categories={store?.categories}
            selectedCategory={selectedCategory}
            onSelecCategory={(name) => setSelectedCategory(name)}
          />
        </RowContainer>
      )}

      <FlatList
        scrollEnabled={true}
        data={filteredProducts}
        maxToRenderPerBatch={8}
        initialNumToRender={8}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id!}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: "5%" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: spacing.large,
    backgroundColor: colors.secondary,
  },
  makeBtn: {
    // width: 91,
    height: 25,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 10,
    // elevation:1
  },
  makeBtnTxt: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.primary,
  },
  bannerCard: {
    height: 137,
    // backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.primary,
    width: screenWidth - 50,
  },
  storeImage: {
    height: 40,
    width: 40,
    position: "absolute",
    top: 0,
    right: 10,
  },
  bannerTxt: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    // backgroundColor: "#ffffff87",
    backgroundColor: "#4fb8e9eb",
    color: colors.white,
    alignSelf: "flex-start",
    marginVertical: 4,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  sliderContainer: {
    backgroundColor: "#1E2329",
    width: screens.width * 0.898,
    height: 139,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 0,
    paddingVertical: 10,
  },
  sliderName: {
    color: "#F69223",
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "OpenSans-Regular",
    marginTop: 0,
  },
  sliderHeading: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "OpenSans-Regular",
    marginTop: 10,
  },
  sliderSubHeading: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "OpenSans-Regular",
    marginTop: 3,
  },
  dotMain: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 40,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 9 / 2,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 9 / 2,
    backgroundColor: "#F69223",
    marginHorizontal: 4,
  },
});
