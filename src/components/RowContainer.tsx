import { ViewStyle, View } from "react-native";

export const RowContainer = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: ViewStyle;
}) => (
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",

      ...styles,
    }}
  >
    {children}
  </View>
);
