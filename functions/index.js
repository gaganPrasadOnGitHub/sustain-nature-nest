const functions = require('firebase-functions');
let fetch;

(async () => {
  fetch = (await import('node-fetch')).default;
})();

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const cors = require('cors')({origin: true});
exports.searchWasteItems = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const searchTerm = request.query.searchTerm;

    const requestBody = {
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content:
            'You are a global waste management expert. Your task is to classify waste items as json into the correct waste bin categories based on their type and characteristics. Only json no extra text is required.',
        },
        {
          role: 'system',
          content: `Waste bin categories with their IDs are:
            [ 
              {"001": "Wet Waste"},
              {"002": "Dry Waste"},
              {"003": "Plastic"},
              {"004": "Glass"},
              {"005": "Metal"},
              {"006": "Paper"},
              {"007": "Electronic Waste"},
              {"008": "Textiles"},
              {"009": "Wood"},
              {"010": "Rubber"},
              {"011": "Hazardous Waste"},
              {"012": "Sanitary Waste"},
              {"013": "Organic Waste"},
              {"014": "Construction Waste"},
              {"015": "Oil and Chemical Waste"},
              {"016": "Tyre and Rubber Waste"},
              {"017": "Textile Waste"},
              {"018": "Electronic Devices and Accessories"},
              {"019": "Biomedical Waste"},
              {"020": "Automotive Parts"},
              {"021": "Compostable Packaging"},
              {"022": "Pet Waste and Related Products"}
            ]`,
        },
        {
          role: 'system',
          content: `Determine the classification of the waste item based on the provided categories. The search term is "${searchTerm}".
          If the item belongs to a category, provide the reason in the language of the "${searchTerm}" if identified and available in list ["en", "zh", "hi", "es", "fr", "ar", "bn", "ru", "pt", "ur", "id", "de", "ja", "mr", "te", "tr", "ta", "vi"] add language key for language code if not able to identify give reason in english and set language code to 'en', including the 'binId' and a reason for the classification.
          If it does not belong to any category, provide guidance in the same language on better categorization or why it's invalid.`,
        },
        {
          role: 'system',
          content:
            'For a valid waste item, provide a JSON response with "validItem" set to true, the "binId", and a "reason" for the classification in language of searchTerm. For an invalid item, set "validItem" to false and provide a reason for why it does not fit into any category in language of searchTerm.',
        },
        {
          role: 'system',
          content:
            'Example for a valid item - "布団": { "validItem": true, "binId": "008", "reason": "布団は繊維でできているため、繊維廃棄物に分類されます。", "languageCode": "ja" }',
        },
        {
          role: 'system',
          content:
            'Example for an invalid item - "chair": { "validItem": false, "binId": null, "reason": "Specify the material of the chair for accurate categorization.", "languageCode": "en" }',
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

      if (data.choices) {
        response.send(data?.choices[0]?.message?.content);
      }
    } catch (error) {
      console.error('Error:', error);
      response.status(500).send('Error processing the request');
    }
  });
});
