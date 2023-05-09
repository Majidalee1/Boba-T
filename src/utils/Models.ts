import { faker } from "@faker-js/faker";
export interface IStores {
  id: string;
  name: string;
  icon: string;
  address: string;
  description: string;
}

// using faker to generate fake data

export const AvailableStores = (count: number = 100): IStores[] => {
  const response = Array.from({ length: count }, (_, k) => ({
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    icon: faker.image.business(),
    address: faker.address.streetAddress(),
    description: faker.lorem.paragraph(),
  }));
  return response;
};

export const GenerateCategories = (count: number = 10): string[] => {
  const response = Array.from({ length: count }, (_, k) =>
    faker.commerce.department()
  );
  return response;
};

export interface IProduct {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  store: string;
}
export const GenerateProducts = (count: number = 10): IProduct[] => {
  const response = Array.from({ length: count }, (_, k) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    image: faker.image.nature(),
    description: faker.lorem.paragraph(),
    store: faker.company.name(),
  }));
  console.log({ response });
  return response;
};

export interface ICartItem {
  id?: string;
  name: string;
  product_id?: string;
  price: string;
  quantity?: number;
  total?: string;
}

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
  console.log({ response });
  return response;
};
