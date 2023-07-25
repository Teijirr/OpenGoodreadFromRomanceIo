// ==UserScript==
// @name         Open Goodreads from Romance.io
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.romance.io/books/*
// @match        https://www.goodreads.com/search?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=romance.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    addGoodreadsSearchLinkOnRomanceIo();
    autoOpenGoodreadsBookIfOnlyResult();
})();

function addGoodreadsSearchLinkOnRomanceIo() {
    if(window.location.hostname.trim() === 'www.romance.io') {
        const row = document.querySelector('.link-row');
        const newDiv = document.createElement("div");
        const a = document.createElement("a");
        a.classList.add('btn');
        a.classList.add('btn-red');
        a.classList.add('bbuy-link');
        a.style.backgroundColor = "green";
        a.style.borderColor = "black";
        a.innerText = 'goodreads'
        a.target = '_blank'
        var bookInfo = document.querySelector('.book-info');
        var title = bookInfo.firstElementChild.firstChild.data.trim();
        var author = bookInfo.querySelector('.author').firstElementChild.innerText.trim();
        const url = 'https://www.goodreads.com/search?q=' + title + " " + author + '&fromRomanceIo=true';
        a.href = url;
        newDiv.append(a);
        newDiv.classList.add('buy-buttons');
        var firstChild = row.firstElementChild;
        row.insertBefore(newDiv, firstChild);
    }
}

function autoOpenGoodreadsBookIfOnlyResult() {
    if(window.location.hostname.trim() === 'www.goodreads.com') {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const fromRomanceIo = urlParams.get('fromRomanceIo') === 'true';
        if(fromRomanceIo)
        {
            // For classic website
            let results = document.querySelector('tbody');
            // For mobile website
            if(results === null) {
                results = document.querySelector('.searchResults');
            }
            const resultCount = results.childElementCount;
            if(resultCount === 1) {
                const result = results.firstElementChild;
                const linkTitle = result.querySelector('.bookTitle');
                let url = linkTitle.href;
                if(url === undefined) {
                    url = linkTitle.firstElementChild.href;
                }
                window.open(url, '_self');
            }
        }
    }
}
