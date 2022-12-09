let electron = require('electron')
let remote = require("@electron/remote/main");
let app = electron.app //引用app

let BrowserWindow = electron.BrowserWindow //窗口引用
//渲染进程用主进程需要引入remote const remote = require("@electron/remote");
let globalShortcut = electron.globalShortcut

let mainWindow = null //声明要打开的主窗口

app.on('ready', () => {
    // 增加全量使用node.js. webPreferences: { nodeIntegration: true }
    mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, // 使用remote模块
        }
    })
    mainWindow.webContents.openDevTools()
    globalShortcut.register('ctrl+g',()=>{
        mainWindow.loadURL('https://jspang.com')
    })
    let isRegister = globalShortcut.isRegistered('ctrl+g')?'success':'fail'
    console.log("🚀 ~ file: main.js:27 ~ app.on ~ isRegister", isRegister)
    require('./main/menu.js')
    remote.initialize();
    remote.enable(mainWindow.webContents);
    mainWindow.loadFile('./dialog/dialog.html')//加载html页面
    //BrowserView
    let BrowserView = electron.BrowserView;
    let view = new BrowserView()
    mainWindow.setBrowserView(view)
    //设置嵌入样式
    view.setBounds({ x: 0, y: 120, width: 400, height: 600 })
    view.webContents.loadURL('https://jspang.com')
    if (process.platform === "win32") {
        app.setAppUserModelId(process.execPath);
    }
    // window.open打开子窗口 BrowserWindow 打开窗口
    mainWindow.on('close', () => {
        mainWindow = null;
    })
})
//将要推出
app.on('will-quit',()=>{
    //注销全局快捷键
    globalShortcut.unregister('ctrl+g')
    globalShortcut.unregisterAll()
})