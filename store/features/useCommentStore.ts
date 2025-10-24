// import { create } from "zustand";

// interface Attachment {
//   uri: string;
//   type: "image" | "doc" | "audio";
//   name?: string;
//   mimeType?: string;
// }

// interface CommentState {
//   commenterText: string | null;
//   attachments: Attachment[];
//   setCommenterText: (text: string) => void;
//   addAttachment: (attachment: Attachment) => void;
//   clearAttachments: () => void;
//   token?: string | undefined;
// }

// const useCommentStore = create<CommentState>((set) => ({
//   commenterText: null,
//   attachments: [],
//   setCommenterText: (text) => set({ commenterText: text }),
//   addAttachment: (attachment) =>
//     set((state) => ({ attachments: [...state.attachments, attachment] })),
//   clearAttachments: () => set({ attachments: [] }),
// }));

// export default useCommentStore;

import { create } from "zustand";

interface Attachment {
  uri: string;
  type: "image" | "doc" | "audio";
  name?: string;
  mimeType?: string;
}

interface CommentState {
  commenterText: Record<string, string | null>;
  attachments: Record<string, Attachment[]>;

  setCommenterText: (todoId: string, text: string) => void;
  addAttachment: (todoId: string, attachment: Attachment) => void;
  clearAttachments: (todoId: string) => void;
  getAttachments: (todoId: string) => Attachment[];
  getCommenterText: (todoId: string) => string | null;
}

const useCommentStore = create<CommentState>((set, get) => ({
  commenterText: {},
  attachments: {},

  setCommenterText: (todoId, text) =>
    set((state) => ({
      commenterText: {
        ...state.commenterText,
        [todoId]: text,
      },
    })),

  addAttachment: (todoId, attachment) =>
    set((state) => ({
      attachments: {
        ...state.attachments,
        [todoId]: [...(state.attachments[todoId] || []), attachment],
      },
    })),

  clearAttachments: (todoId) =>
    set((state) => ({
      attachments: {
        ...state.attachments,
        [todoId]: [],
      },
    })),

  getAttachments: (todoId) => get().attachments[todoId] || [],
  getCommenterText: (todoId) => get().commenterText[todoId] || null,
}));

export default useCommentStore;
