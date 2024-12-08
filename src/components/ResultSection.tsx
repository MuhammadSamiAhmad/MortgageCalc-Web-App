import { MortgageCalculation } from "../utils/mortgageCalculation";

const ResultSection = () => {
  // Perform the calculation
  const { monthlyPayment, totalRepayment } = MortgageCalculation();

  // Formatter for currency
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value);

  return (
    <div className="flex flex-col w-full md:w-1/2 p-10 font-PlusJakartaSans bg-slate-800 md:rounded-2xl md:drop-shadow-2xl md:rounded-bl-[18%]">
      <h1 className="text-xl font-bold mb-4 text-white">Your results</h1>
      <p className="text-slate-400 mb-10">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click "calculate repayments"
        again.
      </p>
      <div className="w-full bg-slate-900 h-fit border-t-4 border-lime rounded-tl-lg rounded-tr-lg rounded-b-md p-7">
        <h2 className="text-slate-400 mb-3">Your monthly repayments</h2>
        <p className="text-4xl lg:text-6xl text-lime font-bold">
          {formatCurrency(monthlyPayment)}
        </p>
        <hr className="my-6 border-slate-700" />
        <h2 className="text-slate-400 mb-3">
          Total you'll repay over the term
        </h2>
        <p className="text-lg md:text-2xl text-white font-bold">
          {formatCurrency(totalRepayment)}
        </p>{" "}
      </div>
    </div>
  );
};

export default ResultSection;
