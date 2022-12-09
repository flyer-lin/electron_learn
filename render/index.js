let fs = require('fs')
window.onload = function () {
    let btn = this.document.querySelector('#btn')
    let mybaby = this.document.querySelector('#mybaby')
    btn.onclick = ()=>{
        fs.readFile('xiaojiejie.txt',(err,data)=>{
            mybaby.innerHTML = data
        })
    }
}