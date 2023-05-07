import { RouteProp } from "@react-navigation/native";
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { Header } from "../../components/Header";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { DeviceHeight } from "../../utils/Layouts";
import { AvailableStores } from "../../utils/Models";
import { StoreCard } from "./components/StoreItem";
import { colors } from "../../styles/colors";
import { useState } from "react";

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#fff",
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

  // selected index
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={$container}>
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
        <Text
          h4={true}
          h4Style={{
            fontWeight: "bold",
            elevation: 1,

            color: colors.text_primary,
          }}
        >
          Hello John!
        </Text>
        <Text
          h4={true}
          h4Style={{
            fontWeight: "bold",
            elevation: 1,
            marginTop: 10,
            color: colors.primary,
          }}
        >
          Choose A shop To Order your Bubble Tea
        </Text>
      </View>

      <FlatList
        data={AvailableStores(20)}
        scrollEnabled={true}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setSelectedIndex(index);
              navigation.navigate("Home", {
                storeId: item.id,
              });
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
          length: AvailableStores.length,
          offset: AvailableStores.length * index,
          index,
        })}
        contentContainerStyle={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}
      ></FlatList>
    </View>
  );
};
