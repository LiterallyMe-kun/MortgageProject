/// <reference types="node" />

export async function handler() {
  const API_KEY = process.env.FRED_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing FRED_API_KEY" })
    };
  }

  try {
    const response = await fetch(
      `https://api.stlouisfed.org/fred/series/observations?series_id=MORTGAGE30US&sort_order=desc&limit=1&file_type=json&api_key=${API_KEY}`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `FRED request failed: ${response.status} ${response.statusText}`
        })
      };
    }

    const data = await response.json();
    const latestValue = data?.observations?.[0]?.value;
    const parsedRate = Number(latestValue);

    if (!latestValue || Number.isNaN(parsedRate)) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Could not parse mortgage rate from FRED" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ rate: parsedRate })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown server error"
      })
    };
  }
}