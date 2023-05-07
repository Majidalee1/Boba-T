import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { FlatList, TouchableOpacity, View, ViewStyle } from "react-native";
import { Header } from "../../components/Header";
import { RowContainer } from "../../components/RowContainer";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { colors } from "../../styles/colors";
import { DeviceWidth, spacing } from "../../utils/Layouts";
import { GenerateCategories, GenerateProducts } from "../../utils/Models";
import { CategoryList } from "./Components/CategoryList";
import { LocationHeader } from "./Components/LocationHeader";
import { ProductCard } from "./Components/ProductCard";
import { Icon } from "@rneui/base";

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-start",
  paddingHorizontal: spacing.large,
  backgroundColor: colors.secondary,
};
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.extraSmall,
  paddingBottom: spacing.extraSmall,
};

interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "Home">;
}

// a helper component named Row Container that get the children as props and render them in a row

export const HomeScreen = ({ navigation, route }: Props) => (
  <View style={$container}>
    <Header
      actions={{
        left: () => navigation.navigate("Store"),
        right: () =>
          navigation.navigate("Cart", {
            storeId: route.params.storeId,
          }),
      }}
    ></Header>
    <View>
      <LocationHeader navigation={navigation}></LocationHeader>
      <TouchableOpacity
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 5,
          justifyContent: "flex-start",
          width: DeviceWidth,
        }}
        onPress={() => navigation.navigate("CustomTea")}
      >
        <Text
          h3={true}
          h3Style={{
            fontWeight: "bold",
            elevation: 1,
            fontSize: spacing.large - 2,
            textDecorationLine: "underline",
            textDecorationColor: colors.primary,
            color: colors.primary,
          }}
        >
          Make Your Own Tea
          <Icon
            name="chevron-right"
            type="material-community"
            size={30}
            color={colors.primary}
          />
        </Text>
      </TouchableOpacity>
    </View>
    {/* Slide section */}
    <View
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 4,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: colors.text_secondary,
        justifyContent: "flex-start",
        height: DeviceWidth * 0.5,
        width: DeviceWidth * 0.9,
      }}
    ></View>
    <Text
      h4={true}
      h4Style={{
        fontWeight: "bold",
        elevation: 1,
        fontSize: spacing.medium,
        color: colors.text_primary,
        alignSelf: "flex-start",
      }}
    >
      Avalible Tea's
    </Text>
    <RowContainer
      styles={{
        marginVertical: 10,
      }}
    >
      <CategoryList categories={GenerateCategories(10)} />
    </RowContainer>

    <FlatList
      scrollEnabled={true}
      data={GenerateProducts(6)}
      maxToRenderPerBatch={8}
      initialNumToRender={8}
      renderItem={({ item }) => (
        <ProductCard item={item} navigation={navigation}></ProductCard>
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  </View>
);
