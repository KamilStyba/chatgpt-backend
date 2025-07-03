const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message || "";

  try {
    const response = await axios.post("https://gpt-api.0x14.dev/completion", {
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = response.data.choices?.[0]?.message?.content || "No reply.";
    res.json({ reply });
  } catch (err) {
    console.error("Proxy failed:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Proxy backend running");
});
