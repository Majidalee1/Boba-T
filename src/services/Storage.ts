import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICartItem, IProduct } from "../utils/Models";

type StorageKeys = "cart";

type StorageData = {
  cart: ICartItem[];
  products: IProduct[];
};

class AsyncStorageService {
  static async setItem<T extends StorageKeys>(
    key: T,
    value: StorageData[T]
  ): Promise<void> {
    console.log({ key, value });
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in async storage`, error);
      throw error;
    }
  }

  // clear all items from async storage
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`Error clearing async storage`, error);
      throw error;
    }
  }

  static async getItem<T extends StorageKeys>(
    key: T
  ): Promise<StorageData[T] | null> {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        return JSON.parse(value);
      }

      return null;
    } catch (error) {
      console.error(`Error getting item ${key} from async storage`, error);
      throw error;
    }
  }

  //   get all items from async storage
  static async getAllItems(): Promise<StorageData | null> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const data = items.reduce((obj, item) => {
        const [key, value] = item;
        return {
          ...obj,
          [key]: JSON.parse(value!),
        };
      }, {});
      return data as StorageData;
    } catch (error) {
      console.error(`Error getting all items from async storage`, error);
      throw error;
    }
  }

  static async removeItem<T extends StorageKeys>(key: T): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from async storage`, error);
      throw error;
    }
  }
}

export default AsyncStorageService;
