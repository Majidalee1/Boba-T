import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const CategoryList = (props: {
  categories: string[];
  selectedCategory: string;
  onSelecCategory: (name: string) => void;
}) => (
  <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingVertical: 10 }}
  >
    {props.categories.map((item, index) => (
      <Pressable
        key={index}
        onPress={() => props.onSelecCategory(item)}
        style={{
          backgroundColor:
            props.selectedCategory === item ? colors.primary : colors.white,
          borderRadius: 10,
          height: 46,
          justifyContent: "center",
          paddingHorizontal: 20,
          marginRight: 20,
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color:
              props.selectedCategory === item ? colors.secondary : "#1C1E23",
            fontFamily: fonts.regular,
          }}
        >
          {item}
        </Text>
      </Pressable>
    ))}
  </ScrollView>
);
function onSelecCategory(item: string): void {
  throw new Error("Function not implemented.");
}
