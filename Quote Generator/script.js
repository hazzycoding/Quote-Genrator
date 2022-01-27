const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const autherText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

// Hide Loading

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote() {
    loading();
    // Pick a random quote form apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author filed is blank and replace it with 'Unknow'
    if (!quote.author) {
        autherText.textContent = 'UnKnown'
    } else {
        autherText.textContent = quote.author;
    }

    //Check Quote length to determine styling

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    //Set Quote , Hide Loader
    quoteText.textContent = quote.text
    complete();
}

// Get Quotes from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const reponse = await fetch(apiUrl);
        apiQuotes = await reponse.json();
        newQuote();
    } catch(error) {
        
    }
}


//tweet Quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${autherText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load

getQuotes();
