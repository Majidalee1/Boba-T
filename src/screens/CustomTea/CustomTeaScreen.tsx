import {
  AppStackParamList,
  NavigationScreenProps,
} from "../../navigation/AppNavigator";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ButtonGroup } from "@rneui/themed";
import { useFireStoreCreate } from "../../utils/Hooks";
import { createCart } from "../../utils/Models";
import { FirestoreCollections } from "../../utils/constants";
import React, { useState } from "react";
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
import { createOrder, createCustomOrder } from "../../utils/Models";
import { faker } from "@faker-js/faker";

export interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "CustomTea">;
}

export const CustomTeaScreen = ({ navigation, route }: Props) => {
  const { store } = route.params;
  const toast = useToast();
  const cartService = new FireStoreService<ICart>(FirestoreCollections.Carts);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [iceIndex, setIceIndex] = useState(0);
  const [sugarIndex, setSugarIndex] = useState(0);
  const [teaIndex, setTeaIndex] = useState(0);
  const [milkIndex, setMilkIndex] = useState(0);
  const [toppingIndex, setToppingIndex] = useState(0);
  const [jellyIndex, setJellyIndex] = useState(0);
  const [items, setItems] = useState(1);

  const sizes = ["Small", "Large"];
  const ices = ["No", "Little", "Normal", "A lot"];
  const sugars = ["0%", "30%", "50%", "70%", "Regular"];
  const teas = ["Black milk tea", "Jasmine green milk tea", "Caramel milk tea"];
  const milks = [
    "Black milk tea",
    "Jasmine green milk tea",
    "Caramel milk tea",
  ];
  const toppings = [
    "Tapioca black",
    "Tapioca white",
    "Apple pearls",
    "Pomegranate pearls",
    "Grape pearls",
    "Kiwi pearls",
    "Strawberry pearls",
    "Blueberry pearls",
    "Raspberry pearls",
    "Cherry pearls",
    "Mango pearls",
    "Passion fruit pearls",
    "Peach pearls",
    "Lychee pearls",
    "Crème brûlée (+1€)",
  ];
  const jellies = [
    "Jelly Mix",
    "Fruit jelly",
    "White jelly",
    "Apple jelly",
    "Lychee jelly",
    "Mango jelly",
  ];

  const handleSizePress = (selectedIndex: number) => {
    setSizeIndex(selectedIndex);
  };

  const handleIcePress = (selectedIndex: number) => {
    setIceIndex(selectedIndex);
  };

  const handleSugarPress = (selectedIndex: number) => {
    setSugarIndex(selectedIndex);
  };

  const handleTeaPress = (selectedIndex: number) => {
    setTeaIndex(selectedIndex);
  };

  const handleMilkPress = (selectedIndex: number) => {
    setMilkIndex(selectedIndex);
  };

  const handleToppingPress = (selectedIndex: number) => {
    setToppingIndex(selectedIndex);
  };

  const handleJellyPress = (selectedIndex: number) => {
    setJellyIndex(selectedIndex);
  };

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
    const deviceId = await DeviceId();
    let cart = await cartService.getById(deviceId);
    if (!cart) {
      await createCart();
      cart = await cartService.getById(deviceId);
    }

    const cartItem: ICartItem = {
      quantity: items,
      price: (10 * items).toString(),
      product: {
        flavour: teas[teaIndex],
        size: sizes[sizeIndex],
        ice: ices[iceIndex],
        sugar: sugars[sugarIndex],
        milk: milks[milkIndex],
        topping: toppings[toppingIndex],
        jelly: jellies[jellyIndex],
        name: "Pre made drink",
        image:
          "https://firebasestorage.googleapis.com/v0/b/bubble-tea-f3d52.appspot.com/o/images%2Fbubble-milk-tea-pearl-milk-tea-png%20copya%201.png?alt=media&token=12cfce12-e8b6-42b4-8390-169ad6788095&_gl=1*t8qeer*_ga*NTY5NjcyMzQxLjE2NjcyOTg2NDI.*_ga_CW55HF8NVT*MTY4NTYwNzUxNC4yOS4xLjE2ODU2MDc2MDIuMC4wLjA.",
      },
    };

    await cartService.createInSubCollection<ICartItem>(
      cart?.Id,
      FirestoreCollections.CartItems,
      cartItem
    );
    toast.show("added to cart", {
      type: "success",
      placement: "bottom",
      duration: 2000,
      offset: 30,
      animationType: "zoom-in",
    });
    navigation.navigate("Tabs", { screen: "Cart" });
  };

  const handleCheckout = async () => {
    const order_number = faker.random.alphaNumeric(6);
    const oderCreated = await createCustomOrder({
      order_number,
      product: {
        quantity: items,
        flavour: teas[teaIndex],
        size: sizes[sizeIndex],
        ice: ices[iceIndex],
        sugar: sugars[sugarIndex],
        milk: milks[milkIndex],
        topping: toppings[toppingIndex],
        name: "Pre made drink",
        price: (10 * items).toString(),
        image:
          "https://firebasestorage.googleapis.com/v0/b/bubble-tea-f3d52.appspot.com/o/images%2Fbubble-milk-tea-pearl-milk-tea-png%20copya%201.png?alt=media&token=12cfce12-e8b6-42b4-8390-169ad6788095&_gl=1*t8qeer*_ga*NTY5NjcyMzQxLjE2NjcyOTg2NDI.*_ga_CW55HF8NVT*MTY4NTYwNzUxNC4yOS4xLjE2ODU2MDc2MDIuMC4wLjA.",
      },
      total: (10 * items).toString(),
      status: "pending",
      createdAt: new Date().toString(),
      orderType: "custom",
    });

    if (oderCreated) {
      navigation.navigate("Checkout", {
        order_number: order_number,
      });
    }
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
          <SelectionButtonGroup
            selectedIndex={teaIndex}
            title="Choose Flavour"
            onPress={handleTeaPress}
            buttons={teas}
          />
          <SelectionButtonGroup
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
          />
          <SelectionButtonGroup
            selectedIndex={milkIndex}
            title="Choose Milk"
            onPress={handleMilkPress}
            buttons={milks}
          />
          <SelectionButtonGroup
            selectedIndex={toppingIndex}
            title="Topping"
            onPress={handleToppingPress}
            buttons={toppings}
          />
          <SelectionButtonGroup
            selectedIndex={jellyIndex}
            title="Jelly"
            onPress={handleJellyPress}
            buttons={jellies}
          />
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
            ${10 * items}
          </Text>
        </View>
        <Button
          title="Place Order"
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
          onPress={() => handleCheckout()}
        />
      </View>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
    </View>
  );
};

export const SelectionButtonGroup = (props: {
  selectedIndex: number;
  title: string;
  onPress: (selectedIndex: number) => void;
  buttons: string[];
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
          onPress={props.onPress}
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
