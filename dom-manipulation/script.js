// --- Fetching Data from a Mock API (Optional Enhancement) ---
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Convert mock posts into quote-like objects
    const apiQuotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: "API Data"
    }));

    // Merge with existing quotes
    quotes.push(...apiQuotes);
    saveQuotes();
    populateCategories();
    console.log("Quotes fetched from server and added successfully!");
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
  }
}

// Automatically fetch quotes when the page loads
document.addEventListener("DOMContentLoaded", fetchQuotesFromServer);
