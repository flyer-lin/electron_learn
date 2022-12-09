## [Electron 是什么？](https://www.jspang.com/article/62#toc33)

你只要记住下面这两句话就可以对 Electron 有个基本了解：

- Electron 是由 Github 开发的开源框架
- 它允许开发者使用 Web 技术构建跨平台的桌面应用

> Electron = Chromium + Node.js + Native API

- Chromium : 为 Electron 提供了强大的 UI 能力，可以不考虑兼容性的情况下，利用强大的 Web 生态来开发界面。
- Node.js ：让 Electron 有了底层的操作能力，比如文件的读写，甚至是集成 C++等等操作，并可以使用大量开源的`npm`包来完成开发需求。
- Native API ： Native API 让 Electron 有了跨平台和桌面端的原生能力，比如说它有统一的原生界面，窗口、托盘这些。

通过三者的巧妙组合，我们开发应用变的十分高效。

### [什么时候使用 Electron](https://www.jspang.com/article/62#toc34)

1. 公司没有专门的桌面应用开发者，而需要前端兼顾来进行开发时，用 Electron 就是一个不错的选择。
2. 一个应用同时开发 Web 端和桌面端的时候，那使用 Electron 来进行开发就对了。
3. 开发一些效率工具，比如说我们的 VSCode，比如说一些 API 类的工具，用 Electron 都是不错的选择。

### [有哪些著名应用是用 Electron 开发的](https://www.jspang.com/article/62#toc35)

- VSCode ： 程序员最常用的开发者工具。
- Atom : 是 Github 开发的文本编辑器，我想大部分的前端程序员都应该使用过。
- slack ： 聊天群组 + 大规模工具集成 + 文件整合 + 搜索的一个工具。就是把很多你常用的工具整合到了一起。
- wordPress ： 基于 PHP 开发的 Blog 搭建工具，新版本使用了 Electron.

## [安装 Electron](https://www.jspang.com/article/62#toc39)

在你喜欢的盘符下，建立一个文件夹，这个文件可以是任何名字。然后用 VSCode 进行打开。打开终端，直接在终端中输入安装命令：

```
npm install electron --save-dev
```

然后就是耐心的等待，这个等待时间还是比较长的，等待全部完成后，可以使用下面两个命令进行检验。

```
npx electron -v
./node_modules/.bin/electron -v
```

如果安装成功，这两个命令都可以出现版本，我讲课时的版本是`v7.1.11`。

如果你还不放心，你可以直接在命令行启动一下 Electron，如果能顺利启动，并出现这个图，说明你安装成功了。

```
//启动命令
./node_modules/.bin/electron
```

![ElectronUI](http://newimg.jspang.com/ElectronDemo2.png)

### 下载慢解决方案

<https://blog.csdn.net/qq_28762305/article/details/126548889>

## Electron 第一个 Hello world 程序

[新建 index.html 文件](https://www.jspang.com/article/62#toc313)

新建一个文件夹，比如叫`ElectronDemo01`.

在项目的根目录中新建一个`index.html`文件，然后编写如下的代码(可以用快速生成的方式来写这段代码)。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[新建 main.js 文件](https://www.jspang.com/article/62#toc314)

在根目录下新建一个`main.js`文件，这个就是 Electron 的主进程文件。

```js
var electron = require("electron"); //引入electron模块

var app = electron.app; // 创建electron引用

var BrowserWindow = electron.BrowserWindow; //创建窗口引用

var mainWindow = null; //声明要打开的主窗口
app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 400, height: 400 }); //设置打开的窗口大小

  mainWindow.loadFile("index.html"); //加载那个页面

  //监听关闭事件，把主窗口设置为null
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
```

[创建 package.json 文件](https://www.jspang.com/article/62#toc315)

写完后直接使用`npm init --yes`来初始化`package.json`文件，文件生成后如下：

```js
{
  "name": "`ElectronDemo01",
  "version": "1.0.0",
  "description": "electron",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^22.0.0",
    "@electron/remote": "^2.0.8"
  },
  "dependencies": {}
}

```

这时候`main`的值为`main.js`就正确了。这时候你就可以打开终端，在终端里输入`electron .`就可以打开窗口了。

## Electron 编写邀请小姐姐程序

[Electron 的运行流程](https://www.jspang.com/article/62#toc317)

![electron](http://newimg.jspang.com/electrondemo1.png)

- 1.读取 package.json 的中的入口文件,这里我们是`main.js`
- 2.main.js 主进程中创建渲染进程
- 3.读取应用页面的布局和样式
- 4.使用 IPC 在主进程执行任务并获取信息

也许你现在还不能理解这个流程,但是你需要记住这个流程,只有我们记住这个流程后,在以后程序出现问题时,才可以很快的定位问题.

[Electron 的主进程和渲染进程](https://www.jspang.com/article/62#toc318)

我们可以理解`package.json`中定义的入口文件就是主进程,那一般一个程序只有一个主进程,而我们可以利用一个主进程,打开多个子窗口.

由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中,也就是我们说的渲染进程.

也就是说主进程控制渲染进程,一个主进程可以控制多个渲染进程.

![electron流程图](http://newimg.jspang.com/electronDemo08.png)

如果你实在不理解,也没关系,你可以简单的把 main.js 看成主进程,我们写的 html 部分看成渲染进程.虽然这样不太严谨,但是方便我们记忆,我们目的是学会使用 Electron,而不是成为 Electron 的专家.

[简单示例-读取小姐姐](https://www.jspang.com/article/62#toc319)

在我们了解主进程和渲染进程后,我们来作一个读取小姐姐案例.现在项目根目录下建立一个`xiaojiejie.txt`的文件,然后写入几个小姐姐的名字.

代码如下:

```js
1.麻里梨夏
2.星野娜美
3.高桥圣子
```

有了这个文件,我们修改一下 main.js 文件,因为我们要使用 node 里的`fs`模块,所以在设置窗口时,增加全量使用 node.js.

```js
var electron = require("electron");

var app = electron.app;

var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
```

修改完主进程,然后我们到`index.html`里边写一下界面.这里我们写了一个按钮,然后在按钮下方加一个`<div>`,这个 DIV 用来作读取过来内容的容器.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, idivnitial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">小姐姐请进来</button><br />
    <div id="mybaby"></div>
  </body>
</html>
```

有了界面之后,我们可以单独新建一个`renderer`文件夹,一般约定俗成都会起这个名字.注意起这个名字意思是渲染进程中的操作. 文件夹建立完成后,在文件里新建`index.js`文件,然后再 index.html 页面里先进行引入.

```html
<script src="renderer/index.js"></script>
```

然后编写`index.js`里的代码,代码如下,具体含义我会在视频中进行讲解.

```js
var fs = require("fs");
window.onload = function () {
  var btn = this.document.querySelector("#btn");
  var mybaby = this.document.querySelector("#mybaby");
  btn.onclick = function () {
    fs.readFile("xiaojiejie.txt", (err, data) => {
      mybaby.innerHTML = data;
    });
  };
};
```

写完这些,就可以在中台使用`electron .` 命令,跳出我们的界面,点击按钮,就可以看到我们的小姐姐进入了界面中.

## Electron Remote 模块的使用

当我们知道了 Electron 有主进程和渲染进程后，我们还要知道一件事，就是 Electron 的 API 方法和模块也是分为可以在主进程和渲染进程中使用。那如果我们想在渲染进程中使用主进程中的模块方法时，可以使用`Electron Remote`解决在渲染和主进程间的通讯。这节我们就实现一个通过 Web 中的按钮打开新窗口。

### [渲染进程中打开新窗口](https://www.jspang.com/article/62#toc321)

那我们话不多说，直接按照上节课的程序进行改写,在项目根目录下，新建一个`demo2.html`文件，然后快速生成 html 的基本结构，编写一个按钮，引入渲染的 js 页面。代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">打开新的窗口</button><br />
    <script src="renderer/demo2.js"></script>
  </body>
</html>
```

在`render`文件夹下，新建一个`demo2.js`文件，然后编写如下代码。

```js
const btn = this.document.querySelector("#btn");
const remote = require("@electron/remote");
const BrowserWindow = remote.BrowserWindow;

window.onload = function () {
  btn.onclick = () => {
    newWin = new BrowserWindow({
      width: 500,
      height: 500,
    });
    newWin.loadFile("yellow.html");
    newWin.on("close", () => {
      win = null;
    });
  };
};
```

这时候还没有`yellow.html`，在项目根目录下建立页面，然后写入下面的代码。

```html
!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Green</title>
  </head>

  <body>
    <div style="background-color:green;">111</div>
  </body>
</html>
```

然后我们在终端中运行`electron .`,如果一切正常，就可以顺利打开一个新的窗口，这个窗口可以顺利打开主要的功劳就是`electron remote`。它让我们有了很多 pc 端的原生能力，剩下的功能会在后续课程中继续讲解。小伙伴可以先把这节课的效果做出来。

## Electron 创建菜单和基本使用

每一个桌面应用都会有一个窗口，这个视频就学习一下在`Electron`中使用`Menu`来完成菜单的创建。话不多说，直接动手操作。

### [编写菜单模板](https://www.jspang.com/article/62#toc323)

在`Electron`中编写菜单，需要先建立一个模板，这个目标很类似我们`JSON`或者类的数组。

我们打开项目，在项目的根目录下新建一个文件夹`main`，意思是主进程中用到的代码我们都写到这里。

然后新建一个`menu.js`文件,然后编写如下代码。

```js
const { Menu } = require("electron");

var template = [
  {
    label: "凤来怡洗浴会所",
    submenu: [{ label: "精品SPA" }, { label: "泰式按摩" }],
  },
  {
    label: "大浪淘沙洗浴中心",
    submenu: [{ label: "牛奶玫瑰浴" }, { label: "爱情拍拍手" }],
  },
];

var m = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(m);
```

然后再打开主进程`main.js`文件，在`ready`生命周期中，直接加入下面的代码，就可以实现自定义菜单了。

```js
require("./main/menu.js");
```

需要注意的是，`Menu`属于是主线程下的模块，所以只能在主线程中使用，这个要记清楚。

### [使用菜单打开新窗口](https://www.jspang.com/article/62#toc324)

有了菜单之后，可以在菜单中加入`click`事件，代码如下:

```js
const { Menu, BrowserWindow } = require("electron");

var template = [
  {
    label: "凤来怡洗浴会所",
    submenu: [
      {
        label: "精品SPA",
        //主要代码--------------start
        click: () => {
          win = new BrowserWindow({
            width: 500,
            height: 500,
            webPreferences: { nodeIntegration: true },
          });
          win.loadFile("yellow.html");
          win.on("closed", () => {
            win = null;
          });
        },
        //主要代码----------------end
      },
      { label: "泰式按摩" },
    ],
  },
  {
    label: "大浪淘沙洗浴中心",
    submenu: [{ label: "牛奶玫瑰浴" }, { label: "爱情拍拍手" }],
  },
];

var m = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(m);
```

这时候我们打开终端输入`electron .`之后，就可以看到效果了，当然我们还可以绑定快捷键，基于录制时间问题，我们下一个视频再讲解。这个视频先动手作出来吧。

## Electron 制作右键菜单

### [菜单快捷键绑定](https://www.jspang.com/article/62#toc326)

绑定快捷键的属性是`accelerator`属性，比如我们新打开一个窗口，我们就的代码可以写成这样。

```js
accelerator: `ctrl+n`;
```

全部代码如下：

```js
const { Menu ,BrowserWindow} = require('electron')
var template = [
    {
        label:'凤来怡洗浴会所',
        submenu:[
            {
                label:'精品SPA',
                accelerator:`ctrl+n`,
                click:()=>{
                    win = new BrowserWindow({
                        width:500,
                        height:500,
                        webPreferences:{ nodeIntegration:true}
                    })
                    win.loadFile('yellow.html')
                    win.on('closed',()=>{
                        win = null
                    })

                }
            },
            {label:'泰式按摩'}
        ]

    },
    {
        label:'大浪淘沙洗浴中心',
        submenu:[
            {label:'牛奶玫瑰浴'},
            {label:'爱情拍拍手'}
        ]
    }chengxu
]
var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)
```

写完代码后，在终端中输入`electron .` 运行程序，再用快捷键`ctrl+n`就可以新建一个页面了。这就实现了新建页面的方法。

### [创建右键菜单](https://www.jspang.com/article/62#toc327)

右键菜单的响应事件是写在渲染进程中的，也就是写在`index.html`中的，所以要是使用，就用到到`remote`模块进行操作了。

先来看看右键的相应事件，我们打开`render`文件夹，然后打开`demo2.js`文件，编写一个右键菜单的监听事件，代码如下：

```js
window.addEventListener("contextmenu", function () {
  alert(111);
});
```

当我们要使用`Menu`模块,它是主线中的模块，如果想在渲染线程中使用，就必须使用`remote`。代码如下：

```js
const remote = require("@electron/remote");

var rigthTemplate = [{ label: "粘贴" }, { label: "复制" }];

var m = remote.Menu.buildFromTemplate(rigthTemplate);

window.addEventListener("contextmenu", function (e) {
  //阻止当前窗口默认事件
  e.preventDefault();
  //把菜单模板添加到右键菜单
  m.popup({ window: remote.getCurrentWindow() });
});
```

现在就可以有右键菜单了，我们可以在终端中输入`electron .`打开程序进行测试。

## [程序打开调试模式](https://www.jspang.com/article/62#toc328)

由于我们已经定义了顶部菜单，没有了打开调试模式的菜单了，这时候可以使用程序来进行打开。在主进程中加入这句代码就可以了。

```js
mainWindow.webContents.openDevTools();
```

全部代码如下:

```js
var electron = require("electron");

var app = electron.app;

var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: { nodeIntegration: true },
  });
  mainWindow.webContents.openDevTools();

  require("./main/menu.js");

  mainWindow.loadFile("demo2.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
```

这样就实现了打开窗口，直接进入调试模式，极大的提高了调试效率。这节课的内容就到这里吧，下节课我们继续学习`Electron`。

## Electron 中通过链接打开浏览器

在渲染进程中默认加入一个`<a>`标签，进行跳转默认是直接在窗口中打开，而不是在浏览器中打开的，如果我们想在默认浏览器中打开，要如何操作那?这节课讲一下如何使用`electron shell`在浏览器中打开链接。

[默认案例演示](https://www.jspang.com/article/62#toc330)

我们先来看一下，在 electron 中默认打开一个链接是什么样的，在项目根目录，新建一个`demo2.html`文件，编写一个`<a>`标签，代码如下：

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>
        <a href="https://jspang.com">技术胖的博客</a>
    </h1>
</body>
</html>
```

这时候我们运行程序，点击链接以后，可以看到是在窗口中直接打开的，而不是在浏览器中打开。我们现在要作的就是在浏览器中打开。

[使用 Shell 在浏览器中打开](https://www.jspang.com/article/62#toc331)

如果想使用浏览器打开，我们可以直接在`<a>`标签中加入 id,代码如下:

```js
<a id="aHref" href="https://jspang.com">
  技术胖的博客
</a>
```

然后在`render`文件夹下，新建一个`demo3.js`文件，先在文件首页中引入`shell`,然后编写响应事件`click`。

```js
var { shell } = require("electron");

var aHref = document.querySelector("#aHref");

aHref.onclick = function (e) {
  e.preventDefault();
  var href = this.getAttribute("href");
  shell.openExternal(href);
};
```

编写完成，要记得在`html`中引入`demo3.js`文件。

```js
<script src="./renderer/demo3.js"></script>
```

这里给出`demo3.html`全部代码，方便你的学习。

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>
        <a id="aHref" href="https://jspang.com">技术胖的博客</a>
    </h1>
    <script src="./renderer/demo3.js"></script>
</body>
</html>
```

## Electron 中嵌入网页和打开子窗口

这很类似 Web 中的`<iframe>`标签。需要注意的是`BrowserView`是主进程中的类，所以只能在主进程中使用。

[在主进程中用 BrowserView 嵌入网页](https://www.jspang.com/article/62#toc333)

打开根目录下打开`main.js`,直接引入并使用`BrowserView`就可以实现键入网页到应用中。

```js
var BrowserView = electron.BrowserView; //引入BrowserView
var view = new BrowserView(); //new出对象
mainWindow.setBrowserView(view); // 在主窗口中设置view可用
view.setBounds({ x: 0, y: 100, width: 1200, height: 800 }); //定义view的具体样式和位置
view.webContents.loadURL("https://jspang.com"); //wiew载入的页面
```

这个使用起来非常简单，写完上面的代码，就可以在终端中输入一下`electron .`，运行程序，测试一下效果了。

[用 window.open 打开子窗口](https://www.jspang.com/article/62#toc334)

我们以前使用过`BrowserWindow`,这个是有区别的，我们通常把`window.open`打开的窗口叫做子窗口。 在`demo3.html`中，加入一个按钮，代码如下：

```js
<button id="mybtn">打开子窗口</button>
```

然后打开`demo3.js`,先获取`button`的 DOM 节点，然后监听 onclick 事件，代码如下：

```js
var mybtn = document.querySelector("#mybtn");

mybtn.onclick = function (e) {
  window.open("https://jspang.com");
};
```

这样就完成了子窗口的打开。这节课的内容也不多，就是讲解一些经常使用 api，我们下节课接续讲解。

## Electron Window.open 子窗口和父窗口间的通信

### [window.opener.postMessage 子窗口向父窗口传递消息](https://www.jspang.com/article/62#toc336)

`window.opener.postMessage(message,targetOrigin)`,是将消息发送给指定来源的父窗口，如果未指定来源则发送给`*`，即所有窗口。

- message : 传递的消息，是`String`类型的值
- targetOrigin : 指定发送的窗口

在传递消息时，你需要在子窗口的页面中设置一些内容，所以我们不能使用远程的页面，而需要自己建立一个。在项目根目录，建立一个`popup_page.html`文件。 代码如下(详细解释在视频中讲解):

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>我是弹出子窗口</h2>
    <button id="popBtn">向窗口传递信息</button>
</body>
<script>
    var popBtn = this.document.querySelector('#popBtn')
    popBtn.onclick = function(e){
        window.opener.postMessage('我是子窗口的消息')
    }
</script>
</html>
```

这样就可以从子窗口向父窗口发送信息了。

### [window.addEventListener 父窗口接收信息](https://www.jspang.com/article/62#toc337)

先打开`demo3.html`,在代码最下面，加一个`<div>`标签，记得要给一个 ID，这样就用 JS 控制这个层了。

```js
<div id="mytext"></div>
```

父窗口接收信息需要通过`window.addEventListener`,例如现在我们打开`demo3.js`，也就是父窗口的 JS 代码部分，写入下面代码：

```js
window.addEventListener("message", (msg) => {
  let mytext = document.querySelector("#mytext");
  mytext.innerHTML = msg;
});
```

这样父窗口就可以顺利接收到子串口发送过来的信息了，也可以轻松的显示在子窗口中。 这节学习内容就到这里了，希望小伙伴能练习一下。

## Electron 选择文件对话框

### [对话框相关 API 讲解](https://www.jspang.com/article/62#toc339)

我们先来看一下打开对话框的相关 API，打开文件选择对话框可以使用`dialog.showOpenDialog()`方法来打开，它有两个参数，一个是设置基本属性，另一个是回调函数，如果是异步可以使用`then`来实现。

- title ： String (可选)，对话框的标题
- defaultPath ： String (可选),默认打开的路径
- buttonLabel ： String (可选), 确认按钮的自定义标签，当为空时，将使用默认标签
- filters ： 文件选择过滤器，定义后可以对文件扩展名进行筛选
- properties：打开文件的属性，比如打开文件还是打开文件夹，甚至是隐藏文件。

对基本的 API 了解以后，就可以写代码看看具体的效果了。

### [选择对话框练习](https://www.jspang.com/article/62#toc340)

在根目录新建一个`demo4.html`文件，然后编写一个按钮，点击按钮可以打开窗口选择文件。

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="openBtn">打开文件</button>
</body>

<script>
    const {dialog} = require('electron').remote
    var openBtn = document.getElementById('openBtn');
    openBtn.onclick = function(){
        dialog.showOpenDialog({
            title:'请选择你喜欢的小姐姐照片'
        })
    }

</script>

</html>
```

写完后记得把`main.js`中的引入页面改成`demo4.html`代码如下：

```js
mainWindow.loadFile("demo4.html");
```

使用`electron .` 预览一下，可以看到，已经可以顺利打开文件选择窗口了。

### [默认路径的设置](https://www.jspang.com/article/62#toc341)

这时打开的窗口是没有默认文件的，比如我们想直接定位到小姐姐文件`xiaojiejie.jpg`，就可以用`defaultPath`来进行制作。 代码如下：

```js
dialog.showOpenDialog({
  title: "请选择你喜欢的小姐姐照片",
  defaultPath: "xiaojiejie.jpg",
});
```

### [过滤器的使用](https://www.jspang.com/article/62#toc342)

现在程序还是可以看到很多其他的文件，我们的原则就是想选择一个美女照片，然后显示在界面上，这时候就需要用到过滤器了。

```js
openBtn.onclick = function () {
  dialog.showOpenDialog({
    title: "请选择你喜欢的小姐姐照片",
    defaultPath: "xiaojiejie.jpg",
    filters: [{ name: "jpg", extensions: ["jpg"] }],
  });
};
```

### [自定义确定按钮](https://www.jspang.com/article/62#toc343)

可以直接使用`buttonLabel`来自定义确定按钮的文字，比如现在把文字改成'打开图片'。

```js
dialog.showOpenDialog({
  title: "请选择你喜欢的小姐姐照片",
  defaultPath: "xiaojiejie.jpg",
  buttonLabel: "打开图片",
  filters: [{ name: "jpg", extensions: ["jpg"] }],
});
```

### [把小姐姐放到应用中](https://www.jspang.com/article/62#toc344)

当我们选择到了一个文件后，`showOpenDialog`提供了回调函数，也就是我们的第二个参数。现在来看一下回调函数如何获得图片路径。

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="openBtn">打开文件</button>
    <img id="images"  style="width:100%" />
</body>

<script>
    const {dialog} = require('electron').remote
    var openBtn = document.getElementById('openBtn');
    openBtn.onclick = function(){
        dialog.showOpenDialog({
            title:'请选择你喜欢的小姐姐照片',
            defaultPath:'xiaojiejie.jpg',
            filters:[{name:'jpg',extensions:['jpg']}]
        }).then(result=>{
            let image = document.getElementById('images')
            image.setAttribute("src",result.filePaths[0]);
            console.log(result)
        }).catch(err=>{
            console.log(err)
        })
    }

</script>

</html>
```

这样完成了选择照片，并显示在界面上的功能，有的小伙伴这时候就会问了，我用 html 的选择文件也可以实现这个效果，确实是可以实现的，但我认为既然用了 Electron 就最好使用原生的形式打开。

## Electron 保存对话框的操作

### [制作一个保存按钮](https://www.jspang.com/article/62#toc346)

先在`demo4.html`中，编写一个按钮：

```js
<button id="saveBtn">保存文件</button>
```

然后在`<script>`标签中加入下面的代码,这时候就可以顺利的弹出保存文件对话框了，我们可以随便写一个文件名，然后会在控制台给我们返回出来结果。

```js
var saveBtn = document.getElementById("saveBtn");
saveBtn.onclick = function () {
  dialog
    .showSaveDialog({
      title: "保存文件",
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
```

其实我们还可以作的更多，比如我们引入 Node 中的`fs`模块，然后进行文件流的操作，就可以真的生成一个文件。

先引入`fs`模块。

```js
const fs = require("fs");
```

然后在保存后，向文件里写入内容。

```js
saveBtn.onclick = function () {
  dialog
    .showSaveDialog({
      title: "保存文件",
    })
    .then((result) => {
      console.log(result.filePath);
      fs.writeFileSync(result.filePath, "技术胖一个前端爱好者");
    })
    .catch((err) => {
      console.log(err);
    });
};
```

写完这一步就可以在终端中输入`electron .` 来打开应用，进行预览了。这节课的内容就到这里了，内容不多。

## Electron 消息对话框的操作

消息对话框`dialog.showMessageBox()`，他的属性还是比较多的，所以我们先来看一下他的相关属性。

### [showMessageBox 相关属性](https://www.jspang.com/article/62#toc348)

它有太多的属性，这里我们也只挑一些常用的属性来讲解，如果你在工作中具体使用，可以先到官网查询相关的 API 后，再根据需求具体使用。

- type ：String 类型，可以选，图标样式，有`none`、`info`、`error`、`question`和`warning`
- title: String 类型，弹出框的标题
- messsage : String 类型，必选 message box 的内容，这个是必须要写的
- buttons: 数组类型，在案例中我会详细的讲解，返回的是一个索引数值（下标）

### [制作一个确认对话框](https://www.jspang.com/article/62#toc349)

先在`Demo4.html`中增加一个按钮。

```js
<button id="messageBtn">弹出对话框</button>
```

然后这个对话框的内容也非常简单，就是简单的弹出一句话，用户可以点击“确定”或者“取消”。代码如下：

```js
var messageBtn = document.getElementById("messageBtn");
messageBtn.onclick = function () {
  dialog
    .showMessageBox({
      type: "warning",
      title: "去不去由你",
      message: "是不是要跟胖哥去红袖招?",
      buttons: ["我要去", "不去了"],
    })
    .then((result) => {
      console.log(result);
    });
};
```

可以看到回调中`result`里有一个`response`这个里会给我们返回按钮的数组下标。

为什么会鼓励使用`showMessageBox`，因为这样比 JS 里的`alert`更加灵活,比如可以设置按钮，可以设置 title。最常用的对话框就是这三种了，当然还有两个不常用的，我在这里就不讲了。

## Electron 断网提醒功能制作

桌面客户端的程序都必备的一个功能是判断网络状态，这个其实可以用`window.addEventListener`来进行时间监听。

### [相关事件](https://www.jspang.com/article/62#toc351)

其实这个是 JavaScript 的一种方式进行监听网络状态,监听的事件分别是`online`和`offline`。

- online : 如果链接上网络，就会触发该事件。
- offline : 如果突然断网了，就会触发该事件。

[案例演示](https://www.jspang.com/article/62#toc352)

我们现在要做的就是当断网和重新链接到网络时，都给用户一个提示，方便用户即时得知网络状态。

新建一个文件，比如叫作`demo5.html`文件，然后编写下面的代码：

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2> JSPang.com  断网提醒测试 </h2>
</body>
<script>
    window.addEventListener('online',function(){
        alert('官人，我来了，我们继续哦！')
    })

    window.addEventListener('offline',function(){
        alert('小女子先行离开一会，请稍等！')
    })
</script>
</html>
```

这样我们就完成了基本的网络情况监控，小伙伴们可以在终端中输入`electron .` 预览效果。

## Electron 底部通知消息的制作

Electron 的消息通知是通过`H5`的`window.Notification`来实现的。

### [window.Notification 的属性参数](https://www.jspang.com/article/62#toc354)

- title: 通知的标题，可以显示在通知栏上
- option: 消息通知的各种属性配置，以对象的形式进行配置。

其实如果你想详细学习，完全可以看`H5`的`Notification`API 进行学习。

### [点击按钮提示消息](https://www.jspang.com/article/62#toc355)

那直接来作一个实例，当我们点击一个按钮时，会自动给我 i 们弹出提示消息，告诉我们有新的订单。 新建一个`demo5.html`，然后编写如下代码。

```js
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="notifyBtn">通知消息</button>
</body>
<script>

    var notifyBtn = document.getElementById('notifyBtn');

    var option = {
        title:'小二,来订单了，出来接客了!',
        body:'有大官人刚翻了你的牌子',

    }
    notifyBtn.onclick = function(){
      new  window.Notification(option.title,option)
    }
</script>
</html>
```

然后改变一下`main.js`中的代码，让他渲染`demo5.html`。

```js
mainWindow.loadFile("demo5.html");
```

然后在终端中输入`eelctron .` 进行查看效果就可以了。这节课就到这里，我希望小伙伴们都能作一下这个效果。

## Electron 注册全局快捷键

全局快捷键模块就是`globalShortcut`，意思就是我们打开软件以后，按键盘上的快捷键，就可以实现用快捷键实现特定的功能，相当于用键盘快捷键触发某些事件。

[注册快捷键](https://www.jspang.com/article/62#toc357)

`globalShortcut`是主进程中的模块，而且注册的都是全局的快捷键，所以你尽量写在`main.js`中。打开`main.js`，然后先引入`globalShortcut`，代码如下：

```js
var globalShortcut = electron.globalShortcut;
```

引入后，我们现在的需求是按快捷键`ctrl+e`键后，打开我的博客`https://jspang.com`。这时候使用`globalShortcut.register`方法就可以实现，全部代码如下:

```js
var electron = require("electron");

var app = electron.app;
var globalShortcut = electron.globalShortcut;

var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  globalShortcut.register("ctrl+e", () => {
    mainWindow.loadURL("https://jspang.com");
  });

  mainWindow.loadFile("test.html");

  //监听关闭事件，把主窗口设置为null
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
```

这里需要注意的是，注册全局的快捷键必须在`ready`事件之后，才能注册成功。

[检测快捷键是否注册成功](https://www.jspang.com/article/62#toc358)

可以使用`globalShortcut.isRegistered()`方法，来检测快捷键是否注册成功，因为你可能同时打开很多软件，它们已经占用了一些快捷键的组合，所以并不是你 100%可以注册成功的。

```js
let isRegister = globalShortcut.isRegistered("ctrl+e")
  ? "Register Success"
  : "Register fail";
console.log("------->" + isRegister);
```

这样就进行了检测，如果你在实际开发中，可能当有冲突时，软件是支持可以修改快捷键。

[注销快捷键](https://www.jspang.com/article/62#toc359)

因为我们注册的是全局的快捷键，所以当我们关闭软件或者窗口时，记得一定要注销我们的快捷键。防止关闭后打开其他软件和他们的快捷键冲突。

```js
app.on("will-quit", function () {
  //注销全局快捷键的监听
  globalShortcut.unregister("ctrl+e");
  globalShortcut.unregisterAll();
});
```

为了方便学习，给出全部`main.js`代码:

```js
var electron = require("electron");

var app = electron.app;
var globalShortcut = electron.globalShortcut;

var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;
app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  globalShortcut.register("ctrl+e", () => {
    mainWindow.loadURL("https://jspang.com");
  });

  let isRegister = globalShortcut.isRegistered("ctrl+e")
    ? "Register Success"
    : "Register fail";

  console.log("------->" + isRegister);

  mainWindow.loadFile("test.html");

  //监听关闭事件，把主窗口设置为null
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("will-quit", function () {
  //注销全局快捷键的监听
  globalShortcut.unregister("ctrl+e");
  globalShortcut.unregisterAll();
});
```

## Electron 剪贴板事件的使用

在开发中我们经常会遇到给用户一个激活码，然后让用户复制粘贴的情况，这时候就需要用到`clipboard`模块，也就是我们的剪贴板模块。

[复制激活码功能实现](https://www.jspang.com/article/62#toc361)

现在要作一个激活码，然后旁边放一个按钮，点击按钮就可以复制这个激活码，你可以把激活码复制到任何地方。

先新建一个页面`demo7.html`,然后在里边先写相关的 html 代码。再里边放入一个文字的激活码，然后放入一个按钮。

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        激活码：<span id="code">jspangcom1234234242</span> <button id="btn">复制激活码</button>
    </div>
</body>
</html>
```

然后编写`<script>`标签，首先分本获取`<span>`标签的 DOM，然后再获取`<button>`的 DOM,然后点击 button 时，触发事件，把内容复制到剪贴板中。代码如下：

```js
<script>
    const {clipboard} = require('electron')

    const code = document.getElementById('code')
    const btn = document.getElementById('btn')
    btn.onclick = function(){
        clipboard.writeText(code.innerHTML)
        alert('复制成功')
    }

</script>
```
