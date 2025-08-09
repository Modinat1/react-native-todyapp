import { create } from "zustand";

type Theme = {
  id: number;
  color: string;
};

type Todo = {
  id: number;
  title: string;
  color: string; // To store theme color at creation time
};

type Store = {
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;

  todos: Todo[];
  addTodo: (title: string) => void;
};

export const useAppStore = create<Store>((set, get) => ({
  selectedTheme: { id: 1, color: "#18A999" },
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),

  todos: [],
  addTodo: (title) => {
    const themeColor = get().selectedTheme.color;
    const newTodo = {
      id: Date.now(),
      title,
      color: themeColor,
    };
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },
}));
