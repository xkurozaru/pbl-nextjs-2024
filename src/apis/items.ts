import { Item } from "@/types/item";
import axios from "axios";

const ItemApi = {
  fetchItems: async (token: string | undefined) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/items`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(url, config);
      return res.data as Promise<Item[]>;
    } catch (err) {
      throw new Error("fetch items");
    }
  },
  createItem: async (
    token: string | undefined,
    name: string,
    price: number
  ) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/items`;
      const data = { name: name, price: price };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(url, data, config);
      return res.data as Promise<Item>;
    } catch (err) {
      throw new Error("create item");
    }
  },
  deleteItem: async (token: string | undefined, id: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(url, config);
    } catch (err) {
      throw new Error("delete item");
    }
  },
};

export default ItemApi;
