import { useMortgageStore } from "../store/formStore";

export const MortgageCalculation = () => {
  const { calculationData } = useMortgageStore();
  /*
    Calculate monthly mortgage payment and total repayment over the loan term.
    */
  // Safeguard against null
  if (!calculationData) {
    return { monthlyPayment: 0, totalRepayment: 0 };
  }

  const { mortgageAmount, interestRate, mortgageTerm } = calculationData;
  // Convert annual interest rate to monthly
  const monthlyRate = interestRate / 100 / 12;
  // Total number of payments (months)
  const totalMonths = mortgageTerm * 12;
  // Mortgage calculation formula
  const monthlyPayment =
    (mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  // Total repayment over the term
  const totalRepayment = monthlyPayment * totalMonths;

  return { monthlyPayment, totalRepayment };
};
