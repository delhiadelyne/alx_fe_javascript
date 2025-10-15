// =============================
// Dynamic Quote Generator Script
// =============================

// Quotes array
let quotes = JSON.parse(localStorage.getItem("quotes") || "[]");

// Select DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

// -----------------------------
// Utility Functions
// -----------------------------

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
  quotes = storedQuotes;
  populateCategories();
  showRandomQuote();
}

function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const selectedCategory = categoryFilter?.value || "all";
  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}" — ${filteredQuotes[randomIndex].category}`;
}

function populateCategories() {
  const uniqueCategories = ["all", ...new Set(quotes.map((q) => q.category))];
  categoryFilter.innerHTML = "";

  uniqueCategories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter && uniqueCategories.includes(savedFilter)) {
    categoryFilter.value = savedFilter;
  }
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuote();
}

// -----------------------------
// Add a New Quote
// -----------------------------
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please enter both quote text and category!");
    return;
  }

  const newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  alert("Quote added successfully!");

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  postQuoteToServer(newQuote);
}

// -----------------------------
// Export & Import
// -----------------------------
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// -----------------------------
// Fetch Quotes from Mock API
// -----------------------------
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log("Fetched quotes (mock):", data.slice(0, 5));
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

// -----------------------------
// Post Quote to Mock API
// -----------------------------
async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote),
    });
    const result = await response.json();
    console.log("Quote successfully posted to server:", result);
  } catch (error) {
    console.error("Error posting quote to server:", error);
  }
}

// -----------------------------
// ✅ Sync Quotes with Notification
// -----------------------------
async function syncQuotes() {
  try {
    console.log("Syncing local quotes with server...");
    for (const quote of quotes) {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quote),
      });
    }

    // ✅ Notification to user (fixes your error)
    alert("Quotes synced with server!");
    console.log("Quotes synced with server!");

  } catch (error) {
    console.error("Error syncing quotes:", error);
    alert("Error syncing quotes with server.");
  }
}

// -----------------------------
// Periodic Check for New Quotes
// -----------------------------
setInterval(() => {
  console.log("Checking for new quotes from the server...");
  fetchQuotesFromServer();
}, 30000);

// -----------------------------
// Event Listeners
// -----------------------------
newQuoteButton.addEventListener("click", showRandomQuote);
categoryFilter.addEventListener("change", filterQuotes);
window.addEventListener("DOMContentLoaded", () => {
