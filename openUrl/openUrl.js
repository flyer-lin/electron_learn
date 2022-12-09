let { shell } = require('electron')
let here = document.querySelector('#aHerf')
let childBtn = document.querySelector('#childBtn')
let mytext = document.querySelector('#mytext')
here.onclick = (e) => {
    e.preventDefault();
    let href = here.getAttribute('href')
    shell.openExternal(href)
}
childBtn.onclick = (e) => {
    window.open('../popup_page/popup_page.html')
}
window.addEventListener('message', (msg) => {
    console.log("🚀 ~ file: openUrl.js:15 ~ window.addEventListener ~ msg", msg)
    mytext.innerHTML = msg.data
})