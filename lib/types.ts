export interface OnboardingStepProps {
  goToNext?: () => void;
  currentIndex?: number;
  totalSteps: number;
}

export interface Todo {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
}
