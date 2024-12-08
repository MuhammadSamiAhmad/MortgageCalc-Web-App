import EmptyIllustration from "../assets/images/illustration-empty.svg";

const CalculationSection = () => {
  return (
    <div className="flex flex-col w-full md:w-1/2 p-10 font-PlusJakartaSans bg-slate-800 items-center md:rounded-2xl md:drop-shadow-2xl md:rounded-bl-[18%]">
      <img
        src={EmptyIllustration}
        className="size-60 mt-[15%]"
        alt="illustration-empty-calcImg"
      />
      <h1 className="text-white font-bold text-2xl md:text-3xl mb-2">
        Results shown here
      </h1>
      <p className="text-wrap text-slate-400 w-full text-center">
        Complete the form and click "calculate repayments" to <br /> see what
        your monthly repayments would be.
      </p>
    </div>
  );
};

export default CalculationSection;
