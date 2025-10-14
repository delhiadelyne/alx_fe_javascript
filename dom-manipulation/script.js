// =============================
// Dynamic Quote Generator
// =============================

// Load existing quotes from localStorage or use defaults
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <em>- Category: ${quote.category}</em>
  `;

  // (Optional) Save last shown quote in sessionStorage
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Create form dynamically for adding quotes
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
  `;
  document.body.appendChild(formContainer);

  // Add event listener to the button
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// Add a new quote dynamically
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // 🔹 Save to localStorage
    textInput.value = '';
    categoryInput.value = '';
    alert("Quote added successfully!");
  } else {
    alert("Please enter both quote and category.");
  }
}

// Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // 🔹 Save imported quotes
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Setup event listeners once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const showQuoteButton = document.getElementById('newQuote');
  showQuoteButton.addEventListener('click', showRandomQuote);

  // Create the Add Quote form dynamically
  createAddQuoteForm();

  // Add import/export buttons
  const controls = document.createElement('div');
  controls.innerHTML = `
    <button onclick="exportToJsonFile()">Export Quotes (JSON)</button>
    <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
  `;
  document.body.appendChild(controls);

  // Show last viewed quote if available (from sessionStorage)
  const lastQuote = sessionStorage.getItem('lastQuote');
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    document.getElementById('quoteDisplay').innerHTML = `
      <p>"${quote.text}"</p>
      <em>- Category: ${quote.category}</em>
    `;
  }
});
