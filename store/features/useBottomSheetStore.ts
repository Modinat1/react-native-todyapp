import { create } from "zustand";

interface BottomSheetState {
  isOpen: boolean;
  snapPoints?: string[];
  content: React.ReactNode;
  openSheet: (props: {
    content: React.ReactNode;
    snapPoints?: string[];
  }) => void;
  closeSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  isOpen: false,
  content: null,
  snapPoints: ["40%"],
  openSheet: ({ content, snapPoints }) =>
    set({ isOpen: true, content, snapPoints }),
  closeSheet: () => set({ isOpen: false, content: null }),
}));
