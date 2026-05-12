const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwVStvDXc5qmoWIWFZAPd9FDpH9aCGW00p_L9CCIjzWE_HbG4v_SEWcv-aFdwZi9tKerg/exec";

app.post('/', async (req, res) => {
  res.json({ status: "ok" });
  try {
    await axios.post(GOOGLE_URL, req.body, {
      headers: { "Content-Type": "application/json" },
      maxRedirects: 10,
      timeout: 30000
    });
    console.log("Forwarded OK");
  } catch(err) {
    console.log("Error:", err.message);
  }
});

app.get('/', (req, res) => {
  res.send("Relay LIVE ✅ " + new Date());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on port " + PORT));
