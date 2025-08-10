export interface OnboardingStepProps {
  goToNext?: () => void;
  currentIndex?: number;
  totalSteps: number;
}
