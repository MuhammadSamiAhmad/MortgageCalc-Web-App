import FormSection from "./FormSection";
import ResultSection from "./ResultSection";
import CalculationSection from "./CalculationSection";
import { useMortgageStore } from "../store/formStore";

const CalculatorLayout = () => {
  const { showResult } = useMortgageStore();

  return (
    <div className="bg-white w-full md:w-3/4 h-fit m-auto md:rounded-2xl md:drop-shadow-2xl flex flex-col md:flex-row">
      <FormSection />
      {showResult ? <ResultSection /> : <CalculationSection />}
    </div>
  );
};

export default CalculatorLayout;
