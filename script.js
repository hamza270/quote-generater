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
    // const proxyURL = 'https://thawing-thicket-41176.herokuapp.com/';
    // const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const apiURL= 'https://type.fit/api/quotes'
    
    // ---- having two web site qoutes use any of one mean commented is one and uncommented is another.
    
    // First One

    // try{
        
        // const response = await fetch(proxyURL + apiURL);
        // const data = await response.json();

        // if(data.quoteAuthor === ''){
        //     authorText.innerText = 'Unknown';
        // }else{
        //     authorText.innerText = data.quoteAuthor;
        // }
        // // Quote Size is lengthy
        // if(data.quoteText.length > 120 ){
        //     quoteText.classList.add('long-quote');
        // }else{
        //     quoteText.classList.remove('long-quote');
        // }
        // quoteText.innerText = data.quoteText;

        // // STOPE LOADER
        // removeLoadingSpinner();
        // count=1;
    // }catch(error){
    //     console.log(error);
    //     count= count+1;
    //     if(count<10){
    //     getQuote();
    //     }else{
    //         alert("There is somthing wents Wrong Pleaase Refresh it again");
    //     }
    // }

        //  --- Second one is this 

        try{
        const response = await fetch(apiURL);
        const data = await response.json();
        let index = Math.floor(Math.random() * data.length+1); 
        if(data[index].author === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data[index].author;
        }
        // Quote Size is lengthy
        if(data[index].text.length > 120 ){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data[index].text;

        // STOPE LOADER
        removeLoadingSpinner();
        count=1;

    }catch(error){
        console.log(error);
        count= count+1;
        if(count<10){
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
