//渲染进程
const remote = require("@electron/remote");
const BrowserWindow = remote.BrowserWindow;
const Menu = remote.Menu;
const btn = document.querySelector('#btn');
let newWin = null;
window.onload = () => {
    btn.onclick = () => {
        newWin = new BrowserWindow({
            width: 500,
            height: 500
        })
        newWin.loadFile('./demo/green.html')
        newWin.on('close', () => {
            newWin = null
        })
    }
}
let rightTemplate = [
    { label: '复制' },
    { label: '粘贴' },
]
let m = Menu.buildFromTemplate(rightTemplate)
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    m.popup({ window: remote.getCurrentWindow() })
})