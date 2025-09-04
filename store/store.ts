import { create } from "zustand";

type Theme = {
  id: number;
  name: "blue" | "green" | "black" | "red";
  color: string;
};

type Store = {
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
};

export const useAppStore = create<Store>((set) => ({
  selectedTheme: { id: 1, name: "green", color: "#18A999" },
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),
}));
