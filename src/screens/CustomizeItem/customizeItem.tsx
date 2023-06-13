import { AppStackParamList } from "../../navigation/AppNavigator";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ButtonGroup } from "@rneui/themed";
import { FirestoreCollections } from "../../utils/constants";
import React, { useState, useEffect } from "react";
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
import { DeviceWidth, spacing } from "../../utils/Layouts";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { DeviceId } from "../../utils/constants";
import { ICart, ICartItem } from "../../utils/Models";
import { useToast } from "react-native-toast-notifications";
import { FireStoreService } from "../../services/FireStore";
import { Timestamp } from "firebase/firestore";
import { Button } from "@rneui/base";
import { IProduct } from "../../utils/Models";

export interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "CustomizeItem">;
}

export const CustomizeItem = ({ navigation, route }: Props) => {
  const { store, item } = route.params;
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
          (ingredient: any) => ingredient.type === "nonCustom"
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
    const cart: ICart = {
      id: deviceId,
      storeId: store.id,
      deviceId: deviceId,
      createdAt: Timestamp.now().toDate(),
    };
    return await cartService.create(cart);
  };

  const handleAddToCart = async (product: IProduct) => {
    setLoader(true);
    const deviceId = await DeviceId();
    let cart = await cartService.getById(deviceId);
    if (!cart) {
      await createCart();
      cart = await cartService.getById(deviceId);
    }

    ingredients.map((val, i) => {
      product[val.name] = val.values[val.selectedIndex];
    });
    console.log(product);

    const cartItem: ICartItem = {
      quantity: items,
      price: (Number(product.price) * items).toString(),
      product: product,
      itemType: "nonCustom",
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
        <Text style={styles.headerTitle}>{item.name}</Text>
      </View>
      {/* <Image
        source={require("./../../assets/images/bubble-milk.png")}
        style={styles.productImage}
      /> */}

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
          {/* <SelectionButtonGroup
            selectedIndex={sizeIndex}
            title="Choose Size"
            onPress={handleSizePress}
            buttons={sizes}
          />
          <SelectionButtonGroup
            selectedIndex={iceIndex}
            title="Choose Ice"
            onPress={handleIcePress}
            buttons={ices}
          />
          <SelectionButtonGroup
            selectedIndex={sugarIndex}
            title="Choose Sugar"
            onPress={handleSugarPress}
            buttons={sugars}
          /> */}
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
            ${item.price * items}
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
          onPress={() => handleAddToCart(item)}
          loading={loader}
        />
      </View>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
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
            // borderColor: colors.primary,
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
