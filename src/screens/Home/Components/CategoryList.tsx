import { Pressable, ScrollView } from "react-native";
import { colors } from "../../../styles/colors";
import { spacing } from "../../../utils/Layouts";
import { Text } from "@rneui/themed";
export const CategoryList = (props: { categories: string[] }) => (
  <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{}}
  >
    {props.categories.map((item, index) => (
      <Pressable
        key={index}
        onPress={() => console.log(`Pressed ${item}`)}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 8,
          marginHorizontal: 3,
          backgroundColor: colors.primary,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 5,
            height: 6,
          },
          shadowRadius: 8,
          shadowOpacity: 1,
        }}
      >
        <Text
          h4={true}
          h4Style={{
            fontWeight: "bold",
            elevation: 1,
            fontSize: spacing.small,

            color: colors.secondary,
          }}
        >
          {item}
        </Text>
      </Pressable>
    ))}
  </ScrollView>
);
