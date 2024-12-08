import { FieldErrors, useForm } from "react-hook-form"; // Import necessary utilities from react-hook-form
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues } from "../types";
import CalcImage from "../assets/images/icon-calculator.svg";
import { useMortgageStore } from "../store/formStore";

/*
       - Form inputs are treated as strings by default in JavaScript, even if their `type` is set to `number`.
       - `react-hook-form` uses these string values directly, but Zod expects a `number` type explicitly when validating fields like `mortgageAmount`, `interestRate`, and `mortgageTerm`.
       - As a result, validation fails because Zod sees a string instead of a number.

    2. **How the fix works:**
       - Use Zod's `.transform()` method to coerce the input string into a number before validation.
       - Zod's `.refine()` method ensures the transformed value meets additional constraints, such as being non-negative and finite.

    3. **Steps taken in the schema:**
       - Each field is initially treated as a string (using `z.string()`), since the form will send input values as strings.
       - `.transform((val) => parseFloat(val))`: Converts the string input into a floating-point number.
       - `.refine((val) => !isNaN(val) && val >= 0)`: Validates that the converted value is:
         a. A valid number (`!isNaN(val)` ensures this).
         b. Non-negative (`val >= 0` ensures no negative numbers are allowed).
       - For `mortgageType`, no transformation is needed as it remains a string value.

    4. **Benefit:**
       - This approach ensures that values are correctly validated and converted to numbers, avoiding unnecessary errors during form submission.

    5. **How to test:**
       - Use the updated schema and verify that valid numeric inputs no longer trigger validation errors.
       - Test edge cases like entering non-numeric characters or leaving fields empty to ensure validation errors are displayed properly.

    Below is the updated Zod schema:
  */
const schema = z.object({
  mortgageAmount: z
    .string()
    .refine((val) => val.trim() !== "", {
      message: "Mortgage Amount is required",
    }) // Check for empty strings
    .transform((val) => parseFloat(val)) // Convert string to number
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Mortgage Amount must be a positive number",
    }),
  interestRate: z
    .string()
    .refine((val) => val.trim() !== "", {
      message: "Interest Rate is required",
    }) // Check for empty strings
    .transform((val) => parseFloat(val)) // Convert string to number
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Interest Rate must be a positive number",
    }),
  mortgageTerm: z
    .string()
    .refine((val) => val.trim() !== "", {
      message: "Mortgage Term is required",
    }) // Check for empty strings
    .transform((val) => parseFloat(val)) // Convert string to number
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Mortgage Term must be a positive number",
    }),
  mortgageType: z
    .string({
      required_error: "Mortgage Type is required",
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Mortgage Type is required", // Custom error message when null
    }),
});

const FormSection = () => {
  const { setCalculationData, setShowResult, clearCalculationData } =
    useMortgageStore();

  const [focusedField, setFocusedField] = useState<string>();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      mortgageAmount: "",
      interestRate: "",
      mortgageTerm: "",
      mortgageType: null, // For the radio buttons
    },
  });
  const { register, formState, handleSubmit, reset, watch } = form;

  const mortgageTypeValue = watch("mortgageType");

  const { errors, isSubmitSuccessful } = formState;

  // Function to handle successful form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
    setCalculationData(data);
    setShowResult(true);
  };

  // Function to handle form submission errors
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  // Function to reset the form to its default values
  const onReset = () => {
    clearCalculationData();
    setShowResult(false);
    reset();
  };

  // useEffect to reset the form upon successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // Resets the form to default values
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col w-full md:w-1/2 p-10 font-PlusJakartaSans">
      <div
        id="form-header"
        className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-10"
      >
        <h1 className="font-bold text-slate-900 text-xl ">
          Mortgage Calculator
        </h1>
        <p
          className="underline text-slate-500 cursor-pointer"
          onClick={onReset}
        >
          ClearAll
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-control flex flex-col gap-2">
          {/*Mortgage Amount Field*/}
          <label htmlFor="mortgageAmount" className="text-slate-600">
            Mortgage Amount
          </label>
          <div className="relative cursor-pointer">
            {/* Currency Symbol */}
            <span
              className={`absolute rounded-bl-md rounded-tl-md inset-y-0 -left-1 flex items-center p-4 font-bold ${
                focusedField === "mortgageAmount"
                  ? "text-slate-900 bg-lime"
                  : "text-slate-600 bg-slate-300"
              } ${errors.mortgageAmount ? "bg-red text-slate-900" : ""}`}
            >
              £
            </span>
            {/* Input Field */}
            <input
              type="text"
              id="mortgageAmount"
              {...register("mortgageAmount")}
              ref={(e) => {
                register("mortgageAmount").ref(e); // Combine register's ref (to combine my custom onBlur with the onBlur from react-hook-form register)
              }}
              onFocus={() => setFocusedField("mortgageAmount")}
              onBlur={() => setFocusedField(" ")}
              className={`cursor-pointer outline-none border-2 p-2 pl-12 rounded-md w-full text-slate-800 font-bold transition-all duration-200 ${
                focusedField === "mortgageAmount"
                  ? "border-lime"
                  : "border-slate-600"
              } ${errors.mortgageAmount ? "border-red" : ""}`}
            />
          </div>
          {/* Validation Error */}
          <p className="error text-red w-full">
            {errors.mortgageAmount?.message}
          </p>

          {/*Mortgage Term & Interest Rate Fields*/}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="mortgageTerm" className="text-slate-600">
                Mortgage Term
              </label>
              <div className="relative mt-2 cursor-pointer">
                {/* Currency Symbol */}
                <span
                  className={`absolute rounded-br-md rounded-tr-md inset-y-0 -right-1 flex items-center p-4 font-bold ${
                    focusedField === "mortgageTerm"
                      ? "text-slate-900 bg-lime"
                      : "text-slate-600 bg-slate-300"
                  } ${errors.mortgageTerm ? "bg-red text-slate-900" : ""}`}
                >
                  years
                </span>
                {/* Input Field */}
                <input
                  type="text"
                  id="mortgageTerm"
                  {...register("mortgageTerm")}
                  ref={(e) => {
                    register("mortgageTerm").ref(e); // Combine register's ref (to combine my custom onBlur with the onBlur from react-hook-form register)
                  }}
                  onFocus={() => setFocusedField("mortgageTerm")}
                  onBlur={() => setFocusedField(" ")}
                  className={`cursor-pointer outline-none border-2 p-2 pr-12 rounded-md w-full text-slate-800 font-bold transition-all duration-200 ${
                    focusedField === "mortgageTerm"
                      ? "border-lime"
                      : "border-slate-600"
                  } ${errors.mortgageTerm ? "border-red" : ""}`}
                />
              </div>
              {/* Validation Error */}
              <p className="error text-red w-full">
                {errors.mortgageTerm?.message}
              </p>
            </div>

            {/*Interest Rate*/}
            <div className="flex flex-col">
              <label htmlFor="interestRate" className="text-slate-600">
                Interest Rate
              </label>
              <div className="relative mt-2 cursor-pointer">
                {/* Rate Symbol */}
                <span
                  className={`absolute rounded-br-md rounded-tr-md inset-y-0 -right-1 flex items-center p-4 font-bold ${
                    focusedField === "interestRate"
                      ? "text-slate-900 bg-lime"
                      : "text-slate-600 bg-slate-300"
                  } ${errors.interestRate ? "bg-red text-slate-900" : ""}`}
                >
                  %
                </span>
                {/* Input Field */}
                <input
                  type="text"
                  id="interestRate"
                  {...register("interestRate")}
                  ref={(e) => {
                    register("interestRate").ref(e); // Combine register's ref (to combine my custom onBlur with the onBlur from react-hook-form register)
                  }}
                  onFocus={() => setFocusedField("interestRate")}
                  onBlur={() => setFocusedField(" ")}
                  className={`cursor-pointer outline-none border-2 p-2 pr-12 rounded-md w-full text-slate-800 font-bold transition-all duration-200 ${
                    focusedField === "interestRate"
                      ? "border-lime"
                      : "border-slate-600"
                  } ${errors.interestRate ? "border-red" : "border-slate-600"}`}
                />
              </div>
              {/* Validation Error */}
              <p className="error text-red mt-1 w-full">
                {errors.interestRate?.message}
              </p>
            </div>
          </div>

          {/*Mortgage Type (Radio Buttons)*/}
          <div className="mt-4">
            <label className="text-slate-600">Mortgage Type</label>
            <div className="flex flex-col gap-2 mt-3">
              {/* Repayment Option */}
              <label
                className={`flex items-center gap-3 border-2 rounded-md p-4 cursor-pointer transition-all duration-200 ${
                  mortgageTypeValue === "Repayment"
                    ? "bg-yellow-100 border-lime"
                    : "border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  value="Repayment"
                  {...register("mortgageType")}
                  className="hidden"
                />
                <span
                  className={`relative flex items-center justify-center size-5 border-2 rounded-full ${
                    mortgageTypeValue === "Repayment"
                      ? "border-lime bg-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  <span
                    className={`size-3/5 rounded-full ${
                      mortgageTypeValue === "Repayment" ? "bg-lime" : "bg-white"
                    }`}
                  ></span>
                </span>
                <span className="font-bold text-slate-800">Repayment</span>
              </label>

              {/* Interest Only Option */}
              <label
                className={`flex items-center gap-3 border-2 rounded-md p-4 cursor-pointer transition-all duration-200 ${
                  mortgageTypeValue === "Interest Only"
                    ? "bg-yellow-100 border-lime"
                    : "border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  value="Interest Only"
                  {...register("mortgageType")}
                  className="hidden"
                />
                <span
                  className={`relative flex items-center justify-center size-5 border-2 rounded-full ${
                    mortgageTypeValue === "Interest Only"
                      ? "border-lime bg-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  <span
                    className={`size-3/5 rounded-full ${
                      mortgageTypeValue === "Interest Only"
                        ? "bg-lime"
                        : "bg-white"
                    }`}
                  ></span>
                </span>
                <span className="font-bold text-slate-800">Interest Only</span>
              </label>
            </div>
            <p className="error text-red w-full">
              {errors.mortgageType?.message}
            </p>
          </div>
          <button type="submit">
            <div className="flex flex-row bg-lime py-3 px-3 h-fit w-full lg:w-[55%] mt-5 rounded-3xl gap-2 items-center justify-center">
              <img src={CalcImage} alt="calculator-submit-image" />
              <p className="font-bold text-sm md:text-base">
                Calculate Repayments
              </p>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSection;
