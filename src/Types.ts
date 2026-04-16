import type { Dispatch } from "react";

export type LoanInputs = {
  principal: string;
  years: string;
  rate: string;
};

export type LoanResult = {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
};

export type CalculatorState =
  | { mode: "loading-rate"; previousInputs?: LoanInputs }
  | { mode: "rate-error"; message: string; previousInputs?: LoanInputs }
  | { mode: "ready"; inputs: LoanInputs }
  | { mode: "calculated"; inputs: LoanInputs; result: LoanResult };

export type Action =
  | { type: "rateRequested" }
  | { type: "rateLoaded"; rate: number }
  | { type: "rateFailed"; message: string }
  | { type: "inputChanged"; field: keyof LoanInputs; value: string }
  | { type: "calculate" };

export type CalculatorProps = {
  state: CalculatorState;
  dispatch: Dispatch<Action>;
};