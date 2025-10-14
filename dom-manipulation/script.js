// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Array of quotes (initial sample)
  const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Success is not in what you have, but who you are.", category: "Success" },
    { text: "Your time is limited, don’t waste it living someone else’s life.", category: "Life" }
  ];

  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');

  // Function: Display a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available. Please add one!";
      return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" <br><em>— ${randomQuote.category}</em>`;
  }

  // Function: Add a new quote to the list
  function addQuote() {
    const newText = document.getElementById('newQuoteText').value.trim();
    const newCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newText === "" || newCategory === "") {
      alert("Please enter both a quote and a category!");
      return;
    }

    // Add new quote
    quotes.push({ text: newText, category: newCategory });

    // Display confirmation
    quoteDisplay.innerHTML = `✅ Added: "${newText}" <br><em>(${newCategory})</em>`;

    // Clear fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  }

  // Function: Dynamically create the Add Quote form
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('add-quote-form');

    const title = document.createElement('h2');
    title.textContent = "Add a New Quote";

    const inputQuote = document.createElement('input');
    inputQuote.id = 'newQuoteText';
    inputQuote.type = 'text';
    inputQuote.placeholder = 'Enter a new quote';

    const inputCategory = document.createElement('input');
    inputCategory.id = 'newQuoteCategory';
    inputCategory.type = 'text';
    inputCategory.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);

    // Append elements to the form
    formContainer.appendChild(title);
    formContainer.appendChild(inputQuote);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);

    // Add form to body
    document.body.appendChild(formContainer);
  }

  // Event listener for new quote button
  newQuoteButton.addEventListener('click', showRandomQuote);

  // Initial calls
  showRandomQuote();
  createAddQuoteForm(); // dynamically adds the Add Quote form
});
