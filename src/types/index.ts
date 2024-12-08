export type FormValues = {
  mortgageAmount: string;
  interestRate: string;
  mortgageTerm: string;
  mortgageType: string | null;
};

export type MortgageStore = {
  calculationData: FormValues | null;
  showResult: boolean;
  setCalculationData: (data: FormValues) => void;
  setShowResult: (show: boolean) => void;
  clearCalculationData: () => void;
};
