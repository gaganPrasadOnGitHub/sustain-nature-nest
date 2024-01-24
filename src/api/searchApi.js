import {convertToBase64} from '../utils/helpers/convertToBase64';
const IMAGE_FETCH_TIMEOUT = 30000;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

async function extractJsonContent(inputString) {
  const match = inputString.match(/\{.*\}/s);
  return match ? match[0] : null;
}

async function processImageInput(imageInput) {
  if (typeof imageInput === 'string') {
    return await fetchImageAsBase64(imageInput);
  } else {
    checkImageSize(imageInput.size);
    return await convertToBase64(imageInput);
  }
}

async function fetchImageAsBase64(url) {
  if (!url.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/i)) {
    throw new Error('URL does not seem to point to an image');
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to fetch image from URL: ${response.statusText}`);
  }

  const blob = await response.blob();
  checkImageSize(blob.size);

  if (!blob.type.match(/image\/(jpeg|jpg|gif|png)$/i)) {
    throw new Error('Fetched resource is not an image');
  }

  return await convertToBase64(blob);
}

function checkImageSize(size) {
  if (size > MAX_IMAGE_SIZE) {
    throw new Error('Image size exceeds the 5MB limit');
  }
}

async function fetchWithTimeout(resource, options, timeout) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(resource, {
    ...options,
    signal: controller.signal,
  }).finally(() => clearTimeout(id));
}

export const searchWasteItems = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://us-central1-sustainnaturenest.cloudfunctions.net/searchWasteItems?searchTerm=${encodeURIComponent(
        searchTerm
      )}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseText = await response.text();
    const extractedJson = await extractJsonContent(responseText);
    try {
      return JSON.parse(extractedJson);
    } catch (e) {
      throw new Error('Response is not valid JSON', response);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const searchWasteImage = async (imageInput) => {
  try {
    const imageBase64 = await processImageInput(imageInput);
    const requestBody = {imageBase64};

    const response = await fetchWithTimeout(
      `https://us-central1-sustainnaturenest.cloudfunctions.net/searchWasteImageWithGPT4Vision`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody),
      },
      IMAGE_FETCH_TIMEOUT
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const responseText = await response.text();
    const extractedJson = await extractJsonContent(responseText);

    try {
      return JSON.parse(extractedJson);
    } catch (e) {
      throw new Error('Response is not valid JSON', response);
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Error during image search');
  }
};
