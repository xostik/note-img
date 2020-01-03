export function createElementFromHTML(htmlString) {
    var divEl = document.createElement('div');
    divEl.innerHTML = htmlString.trim();

    return divEl.firstChild;
}