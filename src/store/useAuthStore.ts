import { create } from 'zustand'
import axios from "../axios";

interface User {
    login: string;
    email: string;
}

interface AuthStore {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<string | null>;
    getUser: () => Promise<User | null>;
}

const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    token: null,
    login: async (email, password) => {
        try {
            const res = await axios.post<{ authToken: string }>("/login", {
                email,
                password,
            });

            if (!res.data) {
                throw Error();
            }
            set({ token: res.data.authToken });
            return get().token;
        } catch (error) {
            set({ token: null });
        }

        return null;
    },
    getUser: async () => {

        if (get().user) {
            return get().user;
        }

        try {
            const res = await axios.get<{ data: User }>("/get-user");

            if (!res.data) {
                throw Error();
            }
            set({ user: res.data.data });

            return get().user;

        } catch (error) {
            set({ user: null });
        }
        return null;
    },
}))
  
  export default useAuthStore;