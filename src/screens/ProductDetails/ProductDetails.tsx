import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { Button } from "../../components/Button";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { DeviceId } from "../../utils/constants";
import { FireStoreService } from "../../services/FireStore";
import { FirestoreCollections } from "../../utils/constants";
import { ICart, IProduct, ICartItem } from "../../utils/Models";
import { Timestamp } from "firebase/firestore";
import { useToast } from "react-native-toast-notifications";

interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "Details">;
}
export const ProductDetails = ({ navigation, route }: Props) => {
  const toast = useToast();
  let { item } = route.params;
  const cartService = new FireStoreService<ICart>(FirestoreCollections.Carts);
  // creat the cart if not exist
  const createCart = async () => {
    const deviceId = await DeviceId();
    const cart: ICart = {
      id: deviceId,
      storeId: item.store,
      deviceId: deviceId,
      createdAt: Timestamp.now().toDate(),
    };
    return await cartService.create(cart);
  };
  const handleAddToCart = async (product: IProduct) => {
    const deviceId = await DeviceId();
    let cart = await cartService.getById(deviceId);
    if (!cart) {
      await createCart();
      cart = await cartService.getById(deviceId);
    }
    console.log("cart", cart);
    const cartItem: ICartItem = {
      product: product,
      quantity: 1,
      price: product.price,
    };
    console.log("cartItem", cartItem);
    const items = await cartService.createInSubCollection<ICartItem>(
      cart?.Id,
      FirestoreCollections.CartItems,
      cartItem
    );
    toast.show("added successfully", {
      type: "success",
      placement: "bottom",
      duration: 2000,
      offset: 30,
      animationType: "zoom-in",
    });
    console.log("items", items);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Entypo name="chevron-small-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
      </View>

      <Image
        source={{
          uri: item.image,
        }}
        style={styles.productImage}
      />
      <ScrollView>
        <View style={styles.productDetailMain}>
          <View style={styles.productDetailSec}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
          <Text style={styles.detailLabel}>Details</Text>
          <Text style={styles.productDes}>
            {item.description}
            {/* <TouchableOpacity>
              <Text style={styles.readMoreBtn}>Read more</Text>
            </TouchableOpacity> */}
          </Text>
        </View>
      </ScrollView>
      <Button
        title={"Add to Cart"}
        onPress={() =>
          navigation.navigate("CustomizeItem", {
            store: item,
          })
        }
      />
      <StatusBar barStyle="dark-content" backgroundColor="#FBFCFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCFF",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  backBtn: {
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    borderRadius: 10,
  },
  header: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    // elevation: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#00000080",
    fontFamily: fonts.medium,
    fontSize: 18,
    marginRight: 20,
  },
  productImage: {
    height: 231,
    width: "100%",
  },
  productDetailMain: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  productDetailSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    color: "#323232",
    fontSize: 24,
    fontFamily: fonts.medium,
    flex: 1,
    marginRight: 10,
  },
  productPrice: {
    color: colors.primary,
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  productDes: {
    color: "#00000080",
    fontSize: 14,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginTop: 5,
  },
  detailLabel: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.medium,
    lineHeight: 24,
    marginTop: 10,
  },
  readMoreBtn: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: fonts.medium,
    lineHeight: 20,
  },
});
