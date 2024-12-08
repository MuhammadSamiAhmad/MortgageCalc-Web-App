export type FormValues = {
  mortgageAmount: number;
  interestRate: number;
  mortgageTerm: number;
  mortgageType: string | null;
};

export type MortgageStore = {
  calculationData: FormValues | null;
  showResult: boolean;
  setCalculationData: (data: FormValues) => void;
  setShowResult: (show: boolean) => void;
  clearCalculationData: () => void;
};
