// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

  // Array of quotes with categories
  const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Success is not in what you have, but who you are.", category: "Success" },
    { text: "Your time is limited, don’t waste it living someone else’s life.", category: "Life" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const addQuoteButton = document.getElementById('addQuoteBtn');

  // Function to display a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available. Please add one!";
      return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" <br> <em>— ${randomQuote.category}</em>`;
  }

  // Function to add a new quote
  function addQuote() {
    const newText = document.getElementById('newQuoteText').value.trim();
    const newCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newText === "" || newCategory === "") {
      alert("Please enter both a quote and a category!");
      return;
    }

    // Add new quote to array
    quotes.push({ text: newText, category: newCategory });

    // Update DOM with a confirmation
    quoteDisplay.innerHTML = `✅ New quote added: "${newText}" <br> <em>(${newCategory})</em>`;

    // Clear input fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  }

  // Event listeners
  newQuoteButton.addEventListener('click', showRandomQuote);
  addQuoteButton.addEventListener('click', addQuote);

  // Show a quote on first load
  showRandomQuote();
});
