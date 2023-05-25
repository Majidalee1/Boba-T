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
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { WithLocalSvg } from "react-native-svg";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { Button } from "../../components/Button";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

interface Props {
  route: RouteProp<TabParamList, "Profile">;
  navigation: NavigationProp<AppStackParamList>;
}
export const Profile = ({ navigation, route }: Props) => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [open, setOpen] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Entypo name="chevron-small-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>
      <View style={styles.profileSec}>
        <Image
          source={{
            uri:
              image === ""
                ? "https://source.unsplash.com/random/?portrait"
                : image,
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraIcon} onPress={() => pickImage()}>
          <WithLocalSvg asset={require("./../../assets/icons/Camera.svg")} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.inputView}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Emma Jane"
            value={name}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Emma Jane"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>Phone</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setOpen(true)}
          >
            <Text style={styles.dateTxt}>
              {moment(dateOfBirth).format("DD/MM/YYYY")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <Button title={"Add to Cart"} onPress={() => alert("")} /> */}
      <StatusBar barStyle="dark-content" backgroundColor="#FBFCFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 18,
    marginRight: 20,
  },
  profileImage: {
    height: 110,
    width: 110,
    borderRadius: 18,
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
  cameraIcon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  profileSec: {
    alignSelf: "center",
    width: 150,
    height: 150,
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    // borderWidth: 1,
  },
  label: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  input: {
    backgroundColor: colors.white,
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 10,
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginTop: 5,
  },
  dateInput: {
    backgroundColor: colors.white,
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginTop: 5,
    justifyContent: "center",
  },
  dateTxt: {
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
});
