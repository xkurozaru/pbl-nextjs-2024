import { User } from "@/types/user";
import axios from "axios";

const UserApi = {
  fetchUsers: async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;
      const res = await axios.get(url);
      return res.data as Promise<User[]>;
    } catch (err) {
      throw new Error("fetch users");
    }
  },
  createUser: async (name: string, grade: number, team: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;
      const data = { name: name, grade: grade, team: team };
      const res = await axios.post(url, data);
      return res.data as Promise<User>;
    } catch (err) {
      throw new Error("create user");
    }
  },
  deleteUser: async (id: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`;
      await axios.delete(url);
    } catch (err) {
      throw new Error("delete user");
    }
  },
};

export default UserApi;
