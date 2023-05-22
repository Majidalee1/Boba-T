import AsyncStorage from "@react-native-async-storage/async-storage";

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export enum FirestoreCollections {
  Stores = "Stores",
  Products = "Products",
  Orders = "Orders",
  Users = "Users",
  Carts = "Carts",
  CartItems = "CartItems",
}

export const DeviceId = async () => {
  const deviceId = await AsyncStorage.getItem("deviceId");
  if (deviceId) {
    return deviceId;
  } else {
    const deiceId = uuid();
    await AsyncStorage.setItem("deviceId", deiceId);
    return deiceId;
  }
};
