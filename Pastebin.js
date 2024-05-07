let textSavedByUser = document.getElementById('textSavedByUser');
let savedTexts = [];
let TEN = 10;

function SaveText() {
    let textSaved = document.getElementById('textarea').value;                
    console.log(textSaved);
    document.getElementById('textarea').value = '';
    createLinkAndButtonForText(textSaved);
    const response = fetch('/saveText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `textSaved=${encodeURIComponent(textSaved)}`
    });
}

function createLinkAndButtonForText(text) {                               
    let container = document.createElement('div');
    container.classList.add('textContainer');
    let shortenedText;
    if (text.length > TEN) {
        shortenedText = text.substring(0, TEN) + '...';
    } else {
        shortenedText = text;
    }
    let textElement = document.createElement('span');
    textElement.textContent = shortenedText;
    container.appendChild(textElement);
    let button = document.createElement('button');
    button.textContent = 'Show full text';
    button.onclick = function() {
        window.location.href = `page2.html?text=${encodeURIComponent(text)}`;
    };
    container.appendChild(button);
    savedTexts.push(text);
    textSavedByUser.appendChild(container);
}

const urlParams = new URLSearchParams(window.location.search);
const text = urlParams.get('text');
const textParagraph = document.getElementById('text');
if (textParagraph) {
    textParagraph.textContent = text;
}

function goback() {                             
    window.history.back();
}
