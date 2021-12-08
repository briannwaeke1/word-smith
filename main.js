// Information to reach API
const url = 'https://api.datamuse.com/words?';

// A query string is part of the full query, or URL, which allows you to send information using parameters as key-value pairs. queryParams will be the constraints on the result set 
const queryParams = 'rel_rhy=';

// Selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// AJAX function to access API endpoint using the query parameters assigned to queryParams
const getSuggestions = () => {
   // inputField.value grabs what is in the inputField and assigns it to the variable wordQuery
  const wordQuery = inputField.value;
  // endpoint will store the value of the entire URL and query string
  const endpoint = `${url}${queryParams}${wordQuery}`;
  const xhr = new XMLHttpRequest;
  // The data sent back will be in JSON format
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // Renders response before it is modified. renderRawResponse is found in helperFunctions.js
     // renderRawResponse(xhr.response);
     // Renders response after it is modified. renderResponse is found in helperFunctions.js
     renderResponse(xhr.response);
    };
  };
  // This open method call will create a new request using the two arguments: 'GET' sets the method and endpoint sets the destination
  xhr.open('GET', endpoint);
  // The send method call will send the request to the server
  xhr.send();
};

// Clear previous results and display results to webpage
const displaySuggestions = (event) => {
    // If this method is called, the default action of the event will not be triggered
  event.preventDefault();
  // Removes existing results if any
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  };
  getSuggestions();
};
// Bind displaySuggestions function (event handler) to the "click" event on the submit button
submit.addEventListener('click', displaySuggestions);
