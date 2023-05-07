import {
  AppStackParamList,
  NavigationScreenProps,
} from "../../navigation/AppNavigator";
import { ButtonGroup, Text } from "@rneui/themed";

import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import { NavigationProp, RouteProp } from "@react-navigation/native";
import { DeviceHeight, DeviceWidth, spacing } from "../../utils/Layouts";
import { colors } from "../../styles/colors";
import { RowContainer } from "../../components/RowContainer";
import { Button } from "@rneui/base";
export interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<AppStackParamList, "CustomTea">;
}

export const CustomTeaScreen = () => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [iceIndex, setIceIndex] = useState(0);
  const [sugarIndex, setSugarIndex] = useState(0);
  const [teaIndex, setTeaIndex] = useState(0);
  const [milkIndex, setMilkIndex] = useState(0);
  const [toppingIndex, setToppingIndex] = useState(0);
  const [jellyIndex, setJellyIndex] = useState(0);

  const sizes = ["Small", "Large"];
  const ices = ["No ice", "Little", "Normal", "A lot"];
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "flex-start",
        paddingTop: DeviceHeight * 0.05,
      }}
    >
      {/* header component */}
      <View
        style={{
          height: DeviceHeight * 0.2,
          width: DeviceWidth,
        }}
      >
        <Text
          h4={true}
          h4Style={{
            color: colors.secondary,
            textAlign: "center",
            fontSize: spacing.medium,
            marginTop: DeviceHeight * 0.07,
          }}
        >
          Customize Your Bubble Tea
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          width: DeviceWidth,
          height: DeviceHeight,
          backgroundColor: colors.secondary,
          borderRadius: 30,
        }}
      >
        <View
          style={{
            backgroundColor: colors.secondary,
            height: DeviceHeight,
            paddingBottom: DeviceHeight * 0.1,
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
          }}
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
            title="Choose Topping"
            onPress={handleToppingPress}
            buttons={toppings}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: DeviceHeight * 0.1,
          width: DeviceWidth,
          paddingHorizontal: 20,
          backgroundColor: "#EFFAFF",
        }}
      >
        <View style={{}}>
          <Text
            h4={true}
            h4Style={{
              color: colors.text_secondary,
              fontSize: spacing.medium - 2,
              paddingVertical: 3,
            }}
          >
            Total
          </Text>
          <Text
            h4={true}
            h4Style={{
              color: colors.primary,
              fontSize: spacing.medium,
              paddingVertical: 3,
              fontWeight: "800",
            }}
          >
            4.50€
          </Text>
        </View>
        <Button
          title="Add to cart"
          buttonStyle={{
            backgroundColor: colors.primary,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          titleStyle={{
            color: colors.secondary,
            fontSize: spacing.medium,
            fontWeight: "800",
          }}
        />
      </View>
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
        h4={true}
        h4Style={{
          color: colors.text_primary,
          fontSize: spacing.medium,
          paddingHorizontal: 10,
          paddingVertical: 5,
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
            borderColor: colors.primary,
            borderWidth: 1,
            elevation: 1,
          }}
          textStyle={{
            color: colors.text_primary,
            fontSize: spacing.small,
            paddingVertical: spacing.small,
            paddingHorizontal: spacing.medium,
          }}
          selectedTextStyle={{
            color: colors.primary,
          }}
          buttons={props.buttons}
          containerStyle={{
            marginBottom: spacing.small,
            marginHorizontal: 10,
          }}
        />
      </ScrollView>
      {/* payment section */}
    </View>
  );
};
