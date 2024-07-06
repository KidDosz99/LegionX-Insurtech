// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY',
});
const openai = new OpenAIApi(configuration);

// Endpoint to handle form submission
app.post('/api/recommendations', async (req, res) => {
  const { name, email, age, coverage, budget } = req.body;

  // Generate recommendations using AI (example with GPT-4)
  const aiResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Provide personalized insurance recommendations for someone named ${name}, aged ${age}, looking for ${coverage} insurance with a budget of ${budget}.`,
    max_tokens: 150,
  });

  const recommendations = aiResponse.data.choices[0].text.trim();

  res.json({ recommendations });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
