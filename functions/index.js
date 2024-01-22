const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
let fetch;

(async () => {
  fetch = (await import('node-fetch')).default;
})();

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

exports.searchWasteItems = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const searchTerm = request.query.searchTerm;

    const requestBody = {
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI trained in waste management. Classify waste items into the correct categories based on type and characteristics. Provide responses as JSON. Ensure accuracy and relevancy.',
        },
        {
          role: 'system',
          content: `Waste bin categories are:
            {"001": "Organic waste"},
            {"002": "Agricultural waste"},
            {"003": "Animal waste"},
            {"004": "Food waste"},
            {"005": "Green waste"},
            {"006": "Recyclable waste"},
            {"007": "Automotive Waste"},
            {"008": "Bulky waste"},
            {"009": "Construction and demolition waste"},
            {"010": "Electronic waste"},
            {"011": "Glass Waste"},
            {"012": "Industrial Waste"},
            {"013": "Metal Waste"},
            {"014": "Paper Waste"},
            {"015": "Plastic Waste"},
            {"016": "Rubber Waste"},
            {"017": "Textile Waste"},
            {"018": "Wood waste"},
            {"019": "Hazardous Waste"},
            {"020": "Chemical waste"},
            {"021": "Medical waste"},
            {"022": "Oil waste"},
            {"023": "Radioactive waste"},
            {"024": "Sanitary waste"},
            {"025": "Sewage waste"},
            {"026": "Landfill waste"}`,
        },
        {
          role: 'system',
          content: `Classify the item "${searchTerm}". Provide a relevant fact if it fits a category, or guidance if it doesn't. In the input language fallback to english if not able to identify properly`,
        },
        {
          role: 'system',
          content:
            'Respond with JSON. If valid, include "validItem": true, "binId", and a "message" which will contain innovative and practical DIY tips. If invalid, set "validItem": false and in "message" explain why.',
        },
        {
          role: 'system',
          content:
            'Valid example: {"validItem": true, "binId": "017", "message": "Recycling textiles saves water and energy, reducing environmental impact."}',
        },
        {
          role: 'system',
          content:
            'Invalid example: {"validItem": false, "binId": null, "message": "Item not identified. Specify material for correct classification."}',
        },
        {
          role: 'user',
          content: searchTerm,
        },
      ],
    };

    try {
      const apiResponse = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${functions.config().openai.key}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!apiResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await apiResponse.json();

      if (data.choices && data.choices.length > 0) {
        response.send(data.choices[0].message.content);
      } else {
        response.status(404).send('No classification found');
      }
    } catch (error) {
      console.error('Error:', error);
      response.status(500).send('Error processing the request');
    }
  });
});

exports.searchWasteImageWithGPT4Vision = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const imageBase64 = request.body.imageBase64;

      const requestBody = {
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a smart vision system. Analyze the image and classify waste items in the image into the correct categories based on type and characteristics. Provide responses as JSON. Ensure accuracy and relevancy.',
          },
          {
            role: 'system',
            content: `Waste bin categories are:
              {"001": "Organic waste"},
              {"002": "Agricultural waste"},
              {"003": "Animal waste"},
              {"004": "Food waste"},
              {"005": "Green waste"},
              {"006": "Recyclable waste"},
              {"007": "Automotive Waste"},
              {"008": "Bulky waste"},
              {"009": "Construction and demolition waste"},
              {"010": "Electronic waste"},
              {"011": "Glass Waste"},
              {"012": "Industrial Waste"},
              {"013": "Metal Waste"},
              {"014": "Paper Waste"},
              {"015": "Plastic Waste"},
              {"016": "Rubber Waste"},
              {"017": "Textile Waste"},
              {"018": "Wood waste"},
              {"019": "Hazardous Waste"},
              {"020": "Chemical waste"},
              {"021": "Medical waste"},
              {"022": "Oil waste"},
              {"023": "Radioactive waste"},
              {"024": "Sanitary waste"},
              {"025": "Sewage waste"},
              {"026": "Landfill waste"}`,
          },
          {
            role: 'system',
            content:
              'Respond with JSON. If valid, include "validItem": true, "binId", and a "message" which will contain innovative and practical DIY tips. If invalid, set "validItem": false and in "message" explain why.',
          },
          {
            role: 'system',
            content:
              'Valid example: {"validItem": true, "binId": "017", "message": "Items seems to be old jacket. Recycling textiles saves water and energy, reducing environmental impact."}',
          },
          {
            role: 'system',
            content:
              'Invalid example: {"validItem": false, "binId": null, "message": "Item not identified. Specify material for correct classification."}',
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: imageBase64,
              },
              {
                type: 'text',
                text: 'What is in this image?',
              },
            ],
          },
        ],
        max_tokens: 300,
      };

      const apiKey = functions.config().openai.key;
      const openaiResponse = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!openaiResponse.ok) {
        throw new Error('OpenAI API response was not ok');
      }

      const data = await openaiResponse.json();
      response.send(data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      response.status(500).send('Error processing the image request with GPT-4 Vision');
    }
  });
});

