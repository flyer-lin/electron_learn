//主进程
let electron = require('electron')
let BrowserWindow = electron.BrowserWindow //窗口引用
const { Menu } = require('electron');
let template = [
    {
        label: '凤莱伊洗浴会所',
        submenu: [
            {
                label: 'spa',
                //增加快捷键
                accelerator:'ctrl+n',
                click: () => {
                    let win = new BrowserWindow({
                        width: 500,
                        height: 500,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                        }
                    })
                    win.loadFile('demo/green.html')
                    win.on('close', () => {
                        win = null
                    })
                }
            },
            {
                label: '泰式按摩'
            }
        ]
    },
    {
        label: '大浪淘沙洗浴会所',
        submenu: [
            {
                label: '牛奶欲'
            },
            {
                label: '柔式按摩'
            }
        ]
    }
]
let m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)