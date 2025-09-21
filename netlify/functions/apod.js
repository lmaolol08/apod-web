// netlify/functions/apod.js
// Proxy to NASA APOD that uses NASA_API_KEY from Netlify env vars

exports.handler = async function(event, context) {
  const API_KEY = process.env.NASA_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Server misconfigured: NASA_API_KEY not set" })
    };
  }

  const date = (event.queryStringParameters && event.queryStringParameters.date) || "";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${date ? `&date=${date}` : ""}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: res.ok ? 200 : res.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // allow browser requests
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message })
    };
  }
};
