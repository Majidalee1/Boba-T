import React, { useState, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { NavigationProp } from "@react-navigation/native";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { DeviceHeight, spacing } from "../../utils/Layouts";
import { AvailableStores } from "../../utils/Models";
import { StoreCard } from "./components/StoreItem";
import { Button } from "../../components/Button";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { db } from "./../../../firebaseConfig";

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.lightGray,
  paddingTop: 20,
};
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: 0,
  paddingVertical: 0,
  marginHorizontal: 0,
  marginVertical: 0,
};

interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "Store">;
}

export const Stores = (props: Props) => {
  const { navigation } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [stores, setStores] = useState<any>(null);

  useEffect(() => {
    (async () => {
      var allStores: DocumentData[] = [];
      const querySnapshot = await getDocs(collection(db, "Stores"));
      querySnapshot.forEach((doc) => {
        var obj = doc.data();
        console.log(doc.data());
        obj.id = doc.id;
        allStores.push(obj);
      });
      setStores([...allStores]);
    })();
  }, []);

  return (
    <View style={$container}>
      <TouchableOpacity style={styles.menuBtn}>
        <WithLocalSvg asset={require("./../../assets/icons/menu.svg")} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: "flex-start",
          display: "flex",

          flexDirection: "column",
          justifyContent: "flex-start",
          padding: 20,
          width: "100%",
          height: DeviceHeight * 0.2,
        }}
      >
        <Text style={styles.greetingMessage}>Hello John!</Text>
        <Text style={styles.heading}>
          Choose A shop To Order your Bubble Tea
        </Text>
      </View>

      <FlatList
        data={stores}
        scrollEnabled={true}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item.id}
            onPress={() => {
              setSelectedIndex(index);
            }}
          >
            <StoreCard
              title={item.name}
              address={item.address}
              icon={item.icon}
              isSelected={index === selectedIndex}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        bounces={true}
        columnWrapperStyle={{}}
        getItemLayout={(data, index) => ({
          length: stores.length,
          offset: stores.length * index,
          index,
        })}
        contentContainerStyle={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
          paddingBottom: 10,
        }}
      />
      <Button
        title={"Continue"}
        onPress={() =>
          navigation.navigate("Tabs", {
            store: { name: "jkk" },
          })
        }
      />
      <StatusBar
        translucent={false}
        barStyle="dark-content"
        backgroundColor={colors.lightGray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuBtn: {
    marginLeft: spacing.medium,
    backgroundColor: colors.white,
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 5,
  },
  greetingMessage: {
    color: "#1C1E23",
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  heading: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 24,
  },
});
