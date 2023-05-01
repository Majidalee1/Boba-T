import { FlatList, Pressable, ScrollView, View, ViewStyle } from "react-native";
import { Link, RouteProp, useRoute } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { DeviceHeight, DeviceWidth, spacing } from "../../utils/Layouts";
import { Card, Icon, Text } from "@rneui/themed";
import { AvailableStores } from "../../utils/Models";
import { ProductCard } from "../../components/ProductCard";
import { StoreCard } from "./components/StoreItem";
import {
  AppStackParamList,
  HomeScreenNavigationProps,
  StoreScrenNavigationProps,
} from "../../navigation/AppNavigator";
import { NavigationProp } from "@react-navigation/native";
import {
  StackNavigationOptions,
  StackScreenProps,
} from "@react-navigation/stack";

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#fff",
};
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.extraSmall,
  paddingBottom: spacing.extraSmall,
};

interface Props {
  navigation: NavigationProp<StackNavigationOptions>;
  route: RouteProp<AppStackParamList, "Store">;
}

export const Stores = (props: Props) => {
  const { navigation } = props;

  return (
    <View style={$container}>
      <Header />
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
          h5="true"
          h5Style={{
            fontWeight: "bold",
            elevation: 1,
            padding: 10,
          }}
        >
          Hello John!
        </Text>
        <Text
          h4="true"
          h4Style={{
            fontWeight: "bold",
            elevation: 1,
            marginTop: 10,
          }}
        >
          Choose A shop To Order your Bubble Tea
        </Text>
      </View>
      <ScrollView
        style={{
          width: "100%",
          height: DeviceHeight * 0.8,
        }}
      >
        <FlatList
          data={AvailableStores(200)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log("Pressed");
                navigation.navigate("Home", {
                  storeId: item.id,
                });
              }}
            >
              <StoreCard
                title={item.name}
                address={item.address}
                icon={item.icon}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          bounces={true}
          contentContainerStyle={$flatListContentContainer}
        ></FlatList>
      </ScrollView>
    </View>
  );
};
