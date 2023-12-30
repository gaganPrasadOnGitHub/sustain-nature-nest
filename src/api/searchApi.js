export const searchWasteItems = async(searchTerm) => {
    try {
      console.log('from fetch', searchTerm)

      const response = await fetch(`https://us-central1-sustainnaturenest.cloudfunctions.net/searchWasteItems?searchTerm=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const responseText = await response.text();
      console.log('Response Text:', responseText);
        try {
        return JSON.parse(responseText);
        } catch (e) {
        throw new Error('Response is not valid JSON', response);
        }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }