import { useState, useEffect } from "react";
import { FireStoreService } from "../services/FireStore";

export const useFireStore = <T extends Record<string, any>>(
  collection: string
) => {
  const [data, setData] = useState<T[]>([]);
  const storeService = new FireStoreService<T>(collection);

  async function getData() {
    const data = await storeService.getAll();
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return [data, setData] as const;
};

// useStorewtih filter

export const useFireStoreWithFilter = <T extends Record<string, any>>(
  collection: string,
  filter: {
    field: keyof T extends string ? keyof T : never;
    operator: "<" | "<=" | "==" | ">=" | ">";
    value: string | number | boolean;
  }
) => {
  const [data, setData] = useState<T[]>([]);

  console.log({ filter });
  const storeService = new FireStoreService<T>(collection);

  async function getData() {
    const data = await storeService.getFiltered(
      filter.field,
      filter.operator,
      filter.value
    );
    setData(data || []);
  }

  useEffect(() => {
    getData();
  }, []);

  return [data, setData] as const;
};
