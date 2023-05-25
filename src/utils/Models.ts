import { faker } from "@faker-js/faker";
import { FireStoreService } from "../services/FireStore";
import { Timestamp } from "firebase/firestore";
import { FirestoreCollections } from "./constants";
export interface IStore {
  id: string;
  name: string;
  icon: string;
  address: string;
  description: string;
}

export const GenerateStores = (count: number = 10): IStore[] => {
  const response = Array.from({ length: count }, (_, k) => ({
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    icon: faker.image.business(),
    address: faker.address.streetAddress(),
    description: faker.lorem.paragraph(),
  }));
  return response;
};

export const CreateStores = async (count: number = 10): Promise<IStore[]> => {
  const StoreService = new FireStoreService<IStore>("stores");

  const stores = GenerateStores(count);
  return await StoreService.createMany(stores);
};

export const GenerateCategories = (count: number = 10): string[] => {
  const response = Array.from({ length: count }, (_, k) =>
    faker.commerce.department()
  );
  return response;
};

export interface IProduct {
  [x: string]: ReactNode;
  id?: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  store: string;
}
export const GenerateProducts = (
  store_id: string,
  count: number = 10
): IProduct[] => {
  const response = Array.from({ length: count }, (_, k) => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    image: faker.image.nature(),
    description: faker.lorem.paragraph(),
    store: store_id,
  }));
  return response;
};

export const CreateProducts = async (
  store_id: string,
  count: number = 10
): Promise<IProduct[]> => {
  const ProductService = new FireStoreService<IProduct>(
    FirestoreCollections.Products
  );
  console.log("Creating products");
  const products = GenerateProducts(store_id, count);
  console.log({ products });
  return await ProductService.createMany(products);
};

export interface ICartItem {
  id?: string;
  product?: Partial<IProduct>;
  price: string;
  quantity?: number;
}

export type ICart = {
  id?: string;
  deviceId: string;
  createdAt: Date;
  storeId: string;
  name:string
};

export interface IOrder {
  id?: string;
  store_id?: string;
  order_number: string;
  total: string;
  items: ICartItem[];
  status: string;
}

export const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const OrderService = new FireStoreService<IOrder>("orders");
  return await OrderService.create(payload);
};

export const GenerateCartItems = ({
  quantity,
  cart_id,
}: {
  quantity: number;
  cart_id: string;
}): ICartItem[] => {
  const response = Array.from({ length: quantity }, (_, k) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    product_id: faker.datatype.uuid(),
    cart_id: cart_id,
    quantity: faker.datatype.number({
      min: 1,
      max: 10,
    }),
    total: faker.commerce.price(),
  }));
  return response;
};
