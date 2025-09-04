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
  comment: [
    {
      _id?: string;
      commenterText: string;
    }
  ];
}
