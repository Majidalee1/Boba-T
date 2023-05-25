import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { Button } from "../../components/Button";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { useFireStore } from "../../utils/Hooks";
import { DeviceHeight, spacing } from "../../utils/Layouts";
import { IStore } from "../../utils/Models";
import { StoreCard } from "./components/StoreItem";

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
  const [stores, setStores] = useFireStore<IStore>("Stores");

  console.log("stores", stores);

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
            screen: "Home",
            params: {
              storeId: stores[selectedIndex].id,
            },
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
