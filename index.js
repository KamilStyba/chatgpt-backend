const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GROQ_API_URL = "https://api.groq.dev/v1/chat/completions"; // Example URL — replace with actual Groq endpoint
const GROQ_API_KEY = process.env.OPENAI_API_KEY; // Your Groq API key

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message || "";

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "groq-3.5-turbo",  // Use the Groq model name
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Groq API response format may vary, adjust if needed:
    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Groq API request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
