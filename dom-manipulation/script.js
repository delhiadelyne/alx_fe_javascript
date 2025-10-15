// Fetch quotes from a local JSON file or mock server
function fetchQuotesFromServer() {
  fetch('quotes.json') // Change this path if your file or API is located elsewhere
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error while fetching quotes');
      }
      return response.json();
    })
    .then(data => {
      quotes = data;
      saveQuotes(); // Save fetched quotes to local storage
      populateCategories(); // Refresh the categories dropdown
      displayRandomQuote(); // Display one of the fetched quotes
      console.log('Quotes fetched successfully from server!');
    })
    .catch(error => {
      console.error('Error fetching quotes:', error);
    });
}

// Optional: Automatically fetch quotes when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchQuotesFromServer();
});
