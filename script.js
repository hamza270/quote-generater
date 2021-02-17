const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const tweetBtn = document.getElementById('twitter-button');
const newBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
var count = 0;

// Loading Spinner Loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Spinner Loading
function removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    // We need to use a proxy url to make our API call in order to avoid CORS error
    const proxyURL = 'https://thawing-thicket-41176.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        // Quote Size is lengthy
        if(data.quoteText.length > 120 ){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        // STOPE LOADER
        removeLoadingSpinner();
        count=1;

    }catch(error){
        count= count+1;
        if(count<4){
            console.log(count);
        getQuote();
        }else{
            alert("There is somthing wents Wrong Pleaase Refresh it again");
        }
    }
}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweet = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweet,'_blank');
}

// Event Click Listner
newBtn.addEventListener('click',getQuote);
tweetBtn.addEventListener('click',tweetQuote);

// On Load
getQuote() 
// loader
// loading()