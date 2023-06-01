import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { WithLocalSvg } from "react-native-svg";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "../../components/Button";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { storage } from "../../services/FireStore";
import { DeviceId } from "../../utils/constants";
import { FireStoreService } from "../../services/FireStore";
import { FirestoreCollections } from "../../utils/constants";
import { IUser } from "../../utils/Models";
import { useToast } from "react-native-toast-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";

interface Props {
  route: RouteProp<TabParamList, "Profile">;
  navigation: NavigationProp<AppStackParamList>;
}
export const Profile = ({ navigation, route }: Props) => {
  const toast = useToast();
  const usersService = new FireStoreService<IUser>(FirestoreCollections.Users);
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateOfBirth(currentDate);
  };

  const pickImage = async () => {
    const deviceId = await DeviceId();
    const storageRef = ref(storage, `images/${deviceId}`);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blobFile = await response.blob();
      await uploadBytes(storageRef, blobFile)
        .then(async (snapshot) => {
          await getDownloadURL(storageRef)
            .then(async (url) => {
              toast.show("photo uploaded successfully", {
                type: "success",
                placement: "bottom",
                duration: 2000,
                offset: 30,
                animationType: "zoom-in",
              });
              console.log("==========url==========", url);
              setImage(url);
            })
            .catch((error) => {
              console.log("=======>>>>error", error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const saveProfileData = async () => {
    if (name === "" || phone === "" || !dateOfBirth) {
      toast.show("Fill all the fields", {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
      });
      return;
    }
    const deviceId = await DeviceId();
    const user = await usersService.getById(deviceId);
    if (user) {
      await usersService.update(deviceId, {
        name,
        image,
        phone,
        dateOfBirth,
        id: deviceId,
      });
    } else {
      await usersService.createById(deviceId, {
        name,
        image,
        phone,
        dateOfBirth,
        id: deviceId,
      });
    }
    toast.show("Profile saved successfully", {
      type: "success",
      placement: "bottom",
      duration: 2000,
      offset: 30,
      animationType: "zoom-in",
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      (async () => {
        const deviceId = await DeviceId();
        const user = await usersService.getById(deviceId);
        if (user) {
          setName(user.name);
          setPhone(user.phone);
          setDateOfBirth(new Date(user.dateOfBirth.seconds * 1000));
          setImage(user.image);
        }
      })();
    });
    return unsubscribe;
  });
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
            placeholder=""
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>Phone</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShow(true)}
          >
            <Text style={styles.dateTxt}>
              {moment(dateOfBirth).format("DD/MM/YYYY")}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfBirth}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
        <Button title={"Save"} onPress={() => saveProfileData()} />
      </ScrollView>
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
