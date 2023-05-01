import { View, Text, StyleSheet } from "react-native";

export const ProductDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProductDetails Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});
