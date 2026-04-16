import type { CalculatorProps } from "./Types";

function Calculator({ state, dispatch }: CalculatorProps) {
  if (state.mode === "loading-rate") {
    return (
      <section className="page-card calculator-page">
        <h1 className="page-title">Mortgage Calculator</h1>
        <p className="status-message">Loading latest mortgage rate...</p>
      </section>
    );
  }

  if (state.mode === "rate-error") {
    return (
      <section className="page-card calculator-page">
        <h1 className="page-title">Mortgage Calculator</h1>
        <p className="error-message">Error loading mortgage rate: {state.message}</p>
        <button
          className="primary-button"
          onClick={() => dispatch({ type: "rateRequested" })}
        >
          Retry Rate Fetch
        </button>
      </section>
    );
  }

  const inputs = state.inputs;

  return (
    <section className="page-card calculator-page">
      <h1 className="page-title">Mortgage Calculator</h1>

      <div className="rate-banner">
        Current mortgage rate: <strong>{inputs.rate}%</strong>
      </div>

      <button
        className="secondary-button"
        onClick={() => dispatch({ type: "rateRequested" })}
      >
        Refresh Mortgage Rate
      </button>

      <form
        className="mortgage-form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "calculate" });
        }}
      >
        <div className="form-group">
          <label htmlFor="principal">Loan Principal</label>
          <input
            id="principal"
            type="number"
            value={inputs.principal}
            onChange={(e) =>
              dispatch({
                type: "inputChanged",
                field: "principal",
                value: e.target.value
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="years">Loan Term (Years)</label>
          <input
            id="years"
            type="number"
            value={inputs.years}
            onChange={(e) =>
              dispatch({
                type: "inputChanged",
                field: "years",
                value: e.target.value
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="rate">Annual Interest Rate (%)</label>
          <input
            id="rate"
            type="number"
            step="0.01"
            value={inputs.rate}
            onChange={(e) =>
              dispatch({
                type: "inputChanged",
                field: "rate",
                value: e.target.value
              })
            }
          />
        </div>

        <button className="primary-button" type="submit">
          Calculate
        </button>
      </form>

      {state.mode === "calculated" && (
        <section className="results-card">
          <h2>Loan Summary</h2>
          <p>Monthly Payment: ${state.result.monthlyPayment.toFixed(2)}</p>
          <p>Total Paid: ${state.result.totalPaid.toFixed(2)}</p>
          <p>Total Interest: ${state.result.totalInterest.toFixed(2)}</p>
        </section>
      )}
    </section>
  );
}

export default Calculator;