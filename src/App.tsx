import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import "./App.css";

import Calculator from "./Calculator";
import Advice from "./Advice";
import { reducer } from "./Reducer";
import type { CalculatorState } from "./Types";

const initialState: CalculatorState = {
  mode: "loading-rate"
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
  if (state.mode !== "loading-rate") return;

  let cancelled = false;

  async function loadRate() {
    try {
      const response = await fetch("/.netlify/functions/GetRate");

      if (!response.ok) {
        if (cancelled) return;
        dispatch({
          type: "rateFailed",
          message: `HTTP ${response.status}: ${response.statusText}`
        });
        return;
      }

      const json = await response.json();

      if (cancelled) return;

      const parsedRate = Number(json.rate);

      if (Number.isNaN(parsedRate)) {
        dispatch({
          type: "rateFailed",
          message: "Could not read mortgage rate from server response."
        });
        return;
      }

      dispatch({
        type: "rateLoaded",
        rate: parsedRate
      });
    } catch (error) {
      if (cancelled) return;

      dispatch({
        type: "rateFailed",
        message:
          error instanceof Error
            ? error.message
            : "Unknown network error"
      });
    }
  }

  loadRate();

  return () => {
    cancelled = true;
  };
}, [state.mode]);

  return (
  <BrowserRouter>
    <div className="app-shell">
      <header className="site-header">
        <nav className="site-nav">
          <Link className="nav-link" to="/">Calculator</Link>
          <Link className="nav-link" to="/advice">Advice</Link>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route
            path="/"
            element={<Calculator state={state} dispatch={dispatch} />}
          />
          <Route path="/advice" element={<Advice />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
}

export default App;