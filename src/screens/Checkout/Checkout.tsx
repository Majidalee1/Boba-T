import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { WithLocalSvg } from "react-native-svg";
import { FontAwesome } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { Button } from "../../components/Button";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "Checkout">;
}
export const Checkout = ({ navigation, route }: Props) => {
  const order_number = route.params.order_number as string;
  // const total = route.params.total as string;
  // const status = route.params.status as string;
  // const items = route.params.status as any;
  const [orderNumber, setOrderNumber] = useState<string>(order_number);
  // console.log({ order_number });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={24} color="#5A5A5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.txt1}>
          Show this to counter & Receive your order
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <QRCode
            value={orderNumber}
            color={colors.black}
            backgroundColor={colors.secondary}
            size={250}
          ></QRCode>
        </View>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          <Text style={styles.inputLabel}>Order no</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder={orderNumber!}
              style={styles.input}
              onChangeText={(text) => setOrderNumber(text)}
            />
            <TouchableOpacity>
              <WithLocalSvg asset={require("./../../assets/icons/copy.svg")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btns}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 15,
            }}
          >
            <TouchableOpacity style={styles.downloadBtn}>
              <WithLocalSvg
                asset={require("./../../assets/icons/download.svg")}
              />
            </TouchableOpacity>
            <Text style={styles.saveTxt}>Save</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 15,
            }}
          >
            <TouchableOpacity style={styles.downloadBtn}>
              <WithLocalSvg asset={require("./../../assets/icons/send.svg")} />
            </TouchableOpacity>
            <Text style={styles.saveTxt}>Share</Text>
          </View>
        </View>
      </ScrollView>
      <Button title={"Back"} onPress={() => navigation.goBack()} />
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
    backgroundColor: "#D3F1FF",
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
    // elevation: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#5A5A5C",
    fontFamily: fonts.regular,
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
  txt1: {
    color: colors.text_primary,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 28,
    width: "90%",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 30,
  },
  btns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  downloadBtn: {
    backgroundColor: "#F5F7FF",
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  saveTxt: {
    color: "#333333",
    fontFamily: fonts.regular,
    fontSize: 15,
    marginTop: 10,
  },
  inputLabel: {
    color: "#5A5A5C",
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 56,
    borderColor: "#CCCCCC",
    borderRadius: 15,
  },
  input: {
    flex: 1,
    color: "#03110A",
    fontSize: 14,
    fontFamily: fonts.medium,
  },
});
