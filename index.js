const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // safer: use Render environment variable
});

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message || "";

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "OpenAI failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
