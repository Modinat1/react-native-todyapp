import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  image: any | null;
  token: string | null;
  isAuthenticated: boolean;
  userId: string | null;
}

interface AuthAction {
  set: <K extends keyof AuthState>(key: K, value: AuthState[K]) => void;
  login: (userData: Partial<AuthState>, token: string) => void;
  logout: () => void;
}

type PersistAuthStore = AuthState & AuthAction;

const useAuthStore = create<PersistAuthStore>()(
  persist(
    (set) => ({
      userId: null,
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      gender: null,
      image: null,
      token: null,
      isAuthenticated: false,

      set: (key, value) => set((state) => ({ ...state, [key]: value })),

      login: (userData, token) =>
        set({
          ...userData,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          userId: null,
          username: null,
          email: null,
          firstName: null,
          lastName: null,
          gender: null,
          image: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
