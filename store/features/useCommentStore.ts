import { create } from "zustand";

interface Attachment {
  uri: string;
  type: "image" | "doc" | "audio";
  name?: string;
  mimeType?: string;
}

interface CommentState {
  commenterText: string | null;
  attachments: Attachment[];
  setCommenterText: (text: string) => void;
  addAttachment: (attachment: Attachment) => void;
  clearAttachments: () => void;
}

const useCommentStore = create<CommentState>((set) => ({
  commenterText: null,
  attachments: [],
  setCommenterText: (text) => set({ commenterText: text }),
  addAttachment: (attachment) =>
    set((state) => ({ attachments: [...state.attachments, attachment] })),
  clearAttachments: () => set({ attachments: [] }),
}));

export default useCommentStore;
