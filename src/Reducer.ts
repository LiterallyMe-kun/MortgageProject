import type { Action, CalculatorState, LoanInputs } from "./Types";

function calculateLoan(inputs: LoanInputs) {
  const P = Number(inputs.principal);
  const years = Number(inputs.years);
  const annualRate = Number(inputs.rate);

  if (!P || !years || !annualRate) {
    return null;
  }

  const r = annualRate / 100 / 12;
  const n = years * 12;

  const monthlyPayment = (P * r) / (1 - Math.pow(1 + r, -n));
  const totalPaid = monthlyPayment * n;
  const totalInterest = totalPaid - P;

  return {
    monthlyPayment,
    totalPaid,
    totalInterest
  };
}

export function reducer(
  state: CalculatorState,
  action: Action
): CalculatorState {
  switch (action.type) {
    case "rateRequested": {
      if (state.mode === "ready" || state.mode === "calculated") {
        return {
          mode: "loading-rate",
          previousInputs: state.inputs
        };
      }

      return {
        mode: "loading-rate",
        previousInputs: state.previousInputs
      };
    }

    case "rateLoaded": {
      const previous = state.mode === "loading-rate" || state.mode === "rate-error"
        ? state.previousInputs
        : undefined;

      return {
        mode: "ready",
        inputs: {
          principal: previous?.principal ?? "",
          years: previous?.years ?? "",
          rate: String(action.rate)
        }
      };
    }

    case "rateFailed": {
      const previous =
        state.mode === "loading-rate" || state.mode === "rate-error"
          ? state.previousInputs
          : state.mode === "ready" || state.mode === "calculated"
            ? state.inputs
            : undefined;

      return {
        mode: "rate-error",
        message: action.message,
        previousInputs: previous
      };
    }

    case "inputChanged": {
      if (state.mode !== "ready" && state.mode !== "calculated") {
        return state;
      }

      return {
        mode: "ready",
        inputs: {
          ...state.inputs,
          [action.field]: action.value
        }
      };
    }

    case "calculate": {
      if (state.mode !== "ready") {
        return state;
      }

      const result = calculateLoan(state.inputs);

      if (!result) {
        return state;
      }

      return {
        mode: "calculated",
        inputs: state.inputs,
        result
      };
    }

    default: {
  const exhaustiveCheck: never = action;
  throw new Error(`Unhandled action: ${JSON.stringify(exhaustiveCheck)}`);
}
  }
}