export interface OnboardingStepProps {
  goToNext?: () => void;
  currentIndex?: number;
  totalSteps: number;
}

export interface Todo {
  _id: string;
  todoTitle: string;
  description: string;
  theme: string;
  priority: string;
  status: string;
  userId: string;
  documents: any[];
  photo: string[];
  voicenote: any[];
  createdAt: Date;
  updatedAt: Date;
  comments: [
    {
      _id?: string;
      commenterText: string;
    }
  ];
}

export interface CommentTypes {
  id: string;
  commenterId: string;
  commenterText: string;
  todoId: string;
  attachments?: attachmentType[];
  _id: string;
}

export type attachmentType = {
  type: string;
  url: string;
  uri?: string;
  meta: {
    originalName: string;
    size: number;
    mime: string;
  };
  _id: string;
};
export interface Comment {
  _id: string;
  commenterId: string;
  commenterText: string;
  todoId: string;
  attachments?: attachmentType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentsResponse {
  comments: Comment[];
}
