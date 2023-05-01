import { faker } from "@faker-js/faker";
export interface IStores {
  id: string;
  name: string;
  icon: string;
  address: string;
  description: string;
}

// using faker to generate fake data

export const AvailableStores = (count: number = 10): IStores[] => {
  const response = Array.from({ length: count }, (_, k) => ({
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    icon: faker.image.business(),
    address: faker.address.streetAddress(),
    description: faker.lorem.paragraph(),
  }));
  return response;
};
