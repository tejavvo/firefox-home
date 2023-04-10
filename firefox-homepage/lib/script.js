function start() {
    startTime();
    try {
      findQuote();
    }
    catch (e) {
      console.log(e);
    }
}

Array.prototype.randItem = function() {
    return this[Math.floor(Math.random() * Math.floor(this.length))]
};

// load a random quote of the quotes.json file
function findQuote() {
    // get the quote
    const chosen = quotes.randItem();
    console.log(`You have ${quotes.length} quotes.`);
    console.log(chosen);

    document.getElementById('quote').innerHTML = chosen[0];

    switch (chosen.length) {
      case 1:
        document.getElementById('author').innerHTML = "Anonymous";
        break;
      case 2:
        document.getElementById('author').innerHTML = chosen[1];
        break;
      default: console.log('Invalid quote... Please be sure it has at least one item in the array');
    };
}

// first search type will always be google
let actualQuery = 'google';
let keysPressed = {};

document.addEventListener('keydown', e => {
     keysPressed[e.key] = true;
     if (keysPressed['Control'] ) { 
      switch (e.keyCode) {
        case 49: changeQuery(e.keyCode); break;
        case 50: changeQuery(e.keyCode); break;
        case 51: changeQuery(e.keyCode); break;
        case 52: changeQuery(e.keyCode); break;
        default: return;
      };
     };
});

document.addEventListener('keyup', e => {
     delete keysPressed[e.key];
});

// change the search type every time you click
function changeQuery(to) {
    const form = document.getElementById("form");
    const input = document.getElementById("input");
    const text = document.getElementById("search");

    if (to) actualQuery = to;

    switch (actualQuery) {
      case 'google':
      case 50:
        actualQuery = 'youtube';
        form.setAttribute("action", "https://www.youtube.com/results");
        input.setAttribute("name", "search_query");
        break;
      case 'youtube':
      case 51:
        actualQuery = 'github';
        form.setAttribute("action", "https://github.com/search");
        input.setAttribute("name", "q")
        break;
      case 'github':
      case 53:
        actualQuery = 'reddit';
        form.setAttribute('action', 'https://www.reddit.com/search/');
        //input.setAttribute("name", "q");
        break;
      case 'reddit':
      case 49:
        actualQuery = 'google';
        form.setAttribute("action", "https://www.google.com/search");
        //input.setAttribute("name", "q");
        break;
      default:
    }
    text.innerHTML = actualQuery;
}

// load time in the screen
function startTime() {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    h = formatTime(h);
    m = formatTime(m);
    s = formatTime(s);
    document.getElementById('ctime').innerHTML = `${h}:${m}:${s}`;
    setTimeout('startTime()', 500);
}

// format time for better output (with zeros)
function formatTime(i) {
    if (i < 10) i = "0" + i;
    return i;
}
