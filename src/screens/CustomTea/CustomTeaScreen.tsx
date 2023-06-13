import {
  AppStackParamList,
  NavigationScreenProps,
} from "../../navigation/AppNavigator";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ButtonGroup } from "@rneui/themed";
import { useFireStoreCreate } from "../../utils/Hooks";
import { createCart } from "../../utils/Models";
import { FirestoreCollections } from "../../utils/constants";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";

import { NavigationProp, RouteProp } from "@react-navigation/native";
import { DeviceHeight, DeviceWidth, spacing } from "../../utils/Layouts";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { RowContainer } from "../../components/RowContainer";
import { DeviceId } from "../../utils/constants";
import { ICart, ICartItem, IProduct } from "../../utils/Models";
import { useToast } from "react-native-toast-notifications";
import { FireStoreService } from "../../services/FireStore";
import { Timestamp } from "firebase/firestore";
import { Button } from "@rneui/base";
import { faker } from "@faker-js/faker";

export interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "CustomTea">;
}

export const CustomTeaScreen = ({ navigation, route }: Props) => {
  const { store } = route.params;
  const toast = useToast();
  const cartService = new FireStoreService<ICart>(FirestoreCollections.Carts);
  const [ingredients, setIngredients] = useState([]);
  const [items, setItems] = useState(1);
  const [loader, setLoader] = useState(false);

  const handlePress = (i: number, index: number) => {
    ingredients[index].selectedIndex = i;
    setIngredients([...ingredients]);
  };

  useEffect(() => {
    var filteredIngredients = store.Ingredients
      ? store.Ingredients.filter(
          (ingredient: any) => ingredient.type === "custom"
        )
      : [];
    console.log(filteredIngredients);
    setIngredients(
      filteredIngredients.map((obj: any) => ({
        ...obj,
        selectedIndex: 0,
      }))
    );
  }, []);

  // creat the cart if not exist
  const createCart = async () => {
    const deviceId = await DeviceId();
    // console.log("deviceId", deviceId);
    const cart: ICart = {
      id: deviceId,
      storeId: store.id,
      deviceId: deviceId,
      createdAt: Timestamp.now().toDate(),
      name: "",
    };
    return await cartService.create(cart);
  };

  const handleAddToCart = async () => {
    setLoader(true);
    const deviceId = await DeviceId();
    let cart = await cartService.getById(deviceId);
    if (!cart) {
      await createCart();
      cart = await cartService.getById(deviceId);
    }

    var product = {};
    ingredients.map((val, i) => {
      product[val.name] = val.values[val.selectedIndex];
    });
    product.name = "Pre made drink";
    product.image =
      "https://firebasestorage.googleapis.com/v0/b/bubble-tea-f3d52.appspot.com/o/images%2Fbubble-milk-tea-pearl-milk-tea-png%20copya%201.png?alt=media&token=12cfce12-e8b6-42b4-8390-169ad6788095&_gl=1*t8qeer*_ga*NTY5NjcyMzQxLjE2NjcyOTg2NDI.*_ga_CW55HF8NVT*MTY4NTYwNzUxNC4yOS4xLjE2ODU2MDc2MDIuMC4wLjA.";

    console.log(product);
    const cartItem: ICartItem = {
      quantity: items,
      price: (Number(store.price) * items).toString(),
      product: product,
      itemType: "custom",
    };

    await cartService.createInSubCollection<ICartItem>(
      cart?.Id,
      FirestoreCollections.CartItems,
      cartItem
    );
    setLoader(false);
    toast.show("added to cart", {
      type: "success",
      placement: "bottom",
      duration: 2000,
      offset: 30,
      animationType: "zoom-in",
    });
    navigation.navigate("Tabs", { screen: "Cart" });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      {/* header component */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Customizable Tea</Text>
      </View>
      <Image
        source={require("./../../assets/images/bubble-milk.png")}
        style={styles.productImage}
      />

      <View
        style={{
          backgroundColor: colors.secondary,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        >
          {/* flavours */}
          {ingredients.length !== 0 &&
            ingredients.map((val: any, i: number) => {
              return (
                <SelectionButtonGroup
                  selectedIndex={val.selectedIndex}
                  title={val.name}
                  onPress={handlePress}
                  buttons={val.values}
                  index={i}
                  key={i}
                />
              );
            })}
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Text style={styles.itemLabel}>Item</Text>
            <View style={styles.itemsBtns}>
              <TouchableOpacity
                disabled={items === 1}
                onPress={() => setItems(items - 1)}
              >
                <AntDesign
                  name="minus"
                  size={20}
                  color={items === 0 ? "#969696" : colors.text_primary}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.text_primary,
                  fontFamily: fonts.medium,
                  fontSize: 14,
                }}
              >
                {items}
              </Text>
              <TouchableOpacity onPress={() => setItems(items + 1)}>
                <AntDesign name="plus" size={20} color={colors.text_primary} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 123,
          width: DeviceWidth,
          paddingHorizontal: 20,
          backgroundColor: "#EFFAFF",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          position: "absolute",
          bottom: 0,
        }}
      >
        <View style={{}}>
          <Text
            style={{
              color: colors.text_secondary,
              fontSize: 16,
              fontFamily: fonts.medium,
            }}
          >
            Total Payment
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontSize: 22,
              fontFamily: fonts.semiBold,
              marginTop: 5,
            }}
          >
            ${Number(store.price) * items}
          </Text>
        </View>
        <Button
          title="Add to cart"
          buttonStyle={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            height: 60,
            width: 144,
          }}
          titleStyle={{
            color: colors.secondary,
            fontSize: 14,
            fontFamily: fonts.semiBold,
          }}
          onPress={() => handleAddToCart()}
          loading={loader}
          disabled={loader}
        />
      </View>
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle="light-content"
      />
    </View>
  );
};

export const SelectionButtonGroup = (props: {
  selectedIndex: number;
  title: string;
  onPress: (i: number, index: number) => void;
  buttons: string[];
  index: number;
}) => {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
      <Text
        style={{
          color: colors.text_primary,
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 5,
          fontFamily: fonts.medium,
        }}
      >
        {props.title}
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <ButtonGroup
          onPress={(i) => props.onPress(i, props.index)}
          selectedIndex={props.selectedIndex}
          selectedButtonStyle={{
            backgroundColor: "#DBF4FF",
            borderWidth: 0,
            height: 50,
            marginRight: 10,
            borderRadius: 10,
            paddingHorizontal: 15,
          }}
          buttonStyle={{
            height: 50,
            marginRight: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#D2D2D2",
          }}
          textStyle={{
            color: colors.text_primary,
            fontSize: 14,
            paddingVertical: spacing.small,
            paddingHorizontal: spacing.medium,
            fontFamily: fonts.medium,
          }}
          selectedTextStyle={{
            color: colors.primary,
            fontFamily: fonts.medium,
            fontSize: 14,
          }}
          buttons={props.buttons}
          containerStyle={{
            marginBottom: spacing.small,
            marginHorizontal: 10,
            height: 50,
            backgroundColor: "transparent",
            borderWidth: 0,
          }}
        />
      </ScrollView>
      {/* payment section */}
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  header: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#FBFCFF",
    fontFamily: fonts.medium,
    fontSize: 18,
    marginRight: 20,
  },
  productImage: {
    height: 226,
    width: 190,
    alignSelf: "center",
  },
  itemLabel: {
    color: colors.text_primary,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  itemsBtns: {
    flexDirection: "row",
    height: 50,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    width: 112,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});
