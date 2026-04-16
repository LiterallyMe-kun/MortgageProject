function Advice() {
  return (
    <section className="page-card advice-page">
      <h1 className="page-title">Best Practices Before Taking on a Loan</h1>

      <article className="advice-block">
        <h2>Before You Borrow</h2>
        <ul>
          <li>Compare multiple lenders instead of accepting the first offer.</li>
          <li>Focus on total loan cost, not just the monthly payment.</li>
          <li>Make sure your monthly payment fits comfortably within your budget.</li>
          <li>Leave room for taxes, insurance, repairs, and emergency savings.</li>
        </ul>
      </article>

      <article className="advice-block">
        <h2>Questions to Ask</h2>
        <ul>
          <li>Is the rate fixed or adjustable?</li>
          <li>What fees and closing costs are included?</li>
          <li>How much interest will I pay over the life of the loan?</li>
          <li>Can I make extra principal payments without penalty?</li>
        </ul>
      </article>

      <article className="advice-block">
        <h2>Helpful Resources</h2>
        <ul className="resource-list">
          <li>
            <a
              href="https://www.consumerfinance.gov/"
              target="_blank"
              rel="noreferrer"
            >
              Consumer Financial Protection Bureau
            </a>
          </li>
          <li>
            <a
              href="https://www.freddiemac.com/"
              target="_blank"
              rel="noreferrer"
            >
              Freddie Mac
            </a>
          </li>
          <li>
            <a
              href="https://www.hud.gov/"
              target="_blank"
              rel="noreferrer"
            >
              U.S. Department of Housing and Urban Development
            </a>
          </li>
        </ul>
      </article>
    </section>
  );
}

export default Advice;