let searchResultsBox = document.getElementById("searchResultsBox");
let searchResults = document.getElementById("searchResults");
let submitButton = document.getElementById("submitButton");
let clearButton = document.getElementById("clearButton");
let errmsg = document.getElementById("errmsg");

let hidden = document.querySelector(".hidden");

const clearAll = () => {
  errmsg.innerText='';
  searchResults.innerHTML='';
}

const searchFunc = (e) => {
  e.preventDefault();
  clearAll();
  let name = document.getElementById("name").value;
  let state = document.getElementById("state").value;
  if (!name && !state) {
    errmsg.innerText="ERROR: Please enter in a name or state to search.";
  } else {
    if (name && state) {
      let url="https://api.openbrewerydb.org/breweries?" + "by_name=" + name + "&" + "by_state=" + state;
      getRequest(url);
    } else {
      if (name) {
        let url= "https://api.openbrewerydb.org/breweries?" + "by_name=" + name;
        getRequest(url);
      }
      if (state) {
        let url= "https://api.openbrewerydb.org/breweries?" + "by_state=" + state;
        getRequest(url);
      }
    }
  }
}

// forEach
const addSearches = (array) => {
  let count = 0;
  if (array.length == 0) {
    let noResultsDiv = document.createElement("div");
    noResultsDiv.textContent="No results found - please try a new search";
    searchResults.appendChild(noResultsDiv);
  } else {
    searchResultsBox.classList.toggle("hidden");
    array.forEach((element) => {
      let newSearchResultDiv = document.createElement("div");
      newSearchResultDiv.classList.add("box");
      newSearchResultDiv.textContent=(
        (count += 1)+
        ") "+
        element.name+
        " | "+
        element.street+" "+element.city+", "+element.state+" "+element.postal_code+
        " | "+
        element.website_url+
        " | brewery type: "+
        element.brewery_type
      );
      searchResults.appendChild(newSearchResultDiv);
    });
  }
};


const getRequest = (url) => {
  console.log(url);
  return fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      addSearches(data);
    });
};

submitButton.addEventListener("click", searchFunc);
clearButton.addEventListener("click", clearAll);

//format GET request func
const getRequestFormat = () => {
  console.log('format request here!');
};

// when searching via zipcode, make sure the postal_code is only a few numbers away +-3? 
// example 94612 --> 94613, 94611, 94614, 94615, 94610, 94609