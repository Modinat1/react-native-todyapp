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

  // audio sheet
  isAudioOpen: boolean;
  audioContent: React.ReactNode;
  audioSnapPoints?: string[];
  openAudioSheet: (props: {
    audioContent: React.ReactNode;
    audioSnapPoints?: string[];
  }) => void;
  closeAudioSheet: () => void;

  // calender sheet
  isCalenderOpen: boolean;
  calenderContent: React.ReactNode;
  calenderSnapPoints?: string[];
  openCalenderSheet: (props: {
    calenderContent: React.ReactNode;
    calenderSnapPoints?: string[];
  }) => void;
  closeCalenderSheet: () => void;

  // time sheet
  isTimeOpen: boolean;
  timeContent: React.ReactNode;
  timeSnapPoints?: string[];
  openTimeSheet: (props: {
    timeContent: React.ReactNode;
    timeSnapPoints?: string[];
  }) => void;
  closeTimeSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  isOpen: false,
  content: null,
  snapPoints: ["40%"],
  openSheet: ({ content, snapPoints }) =>
    set({ isOpen: true, content, snapPoints }),
  closeSheet: () => set({ isOpen: false, content: null }),

  // audio sheet
  isAudioOpen: false,
  audioContent: null,
  audioSnapPoints: ["40%"],
  openAudioSheet: ({ audioContent, audioSnapPoints }) =>
    set({ isAudioOpen: true, audioContent, audioSnapPoints }),
  closeAudioSheet: () => set({ isAudioOpen: false, audioContent: null }),

  // calender sheet
  isCalenderOpen: false,
  calenderContent: null,
  calenderSnapPoints: ["40%"],
  openCalenderSheet: ({ calenderContent, calenderSnapPoints }) =>
    set({ isCalenderOpen: true, calenderContent, calenderSnapPoints }),
  closeCalenderSheet: () =>
    set({ isCalenderOpen: false, calenderContent: null }),

  // time sheet
  isTimeOpen: false,
  timeContent: null,
  timeSnapPoints: ["40%"],
  openTimeSheet: ({ timeContent, timeSnapPoints }) =>
    set({ isTimeOpen: true, timeContent, timeSnapPoints }),
  closeTimeSheet: () => set({ isTimeOpen: false, timeContent: null }),
}));
