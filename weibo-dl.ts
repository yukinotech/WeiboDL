// ==UserScript==
// @name         WeiboDL 异步增强版 微博图片下载
// @namespace    http://tampermonkey.net/
// @version      2.0.2
// @description  微博图片下载 try to take over the world!
// @author       You
// @match        *://photo.weibo.com/*
// @match        *://weibo.com/u/*
// @include      *://weibo.com/*?tabtype=album
// @match        *://weibo.com/p/*/photos*
// @grant        none
// ==/UserScript==

//在window上给ts加属性
//https://stackoverflow.com/questions/55262814/add-variable-to-window
declare module "my-config" {
  global {
    interface Window {
      $CONFIG: {
        oid: string
        onick: string
      }
    }
  }
}

//增加元素样式到html
function addStyle(csstext: string) {
  var elStyle = document.createElement("style")
  elStyle.innerHTML = csstext
  document.head.appendChild(elStyle)
}

//插入新元素到目标元素的后面
function insertAfter(newElement: HTMLElement, targetElement: Element) {
  var parent = targetElement.parentNode
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}

//等待一秒
function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("")
    }, time)
  })
}

/* @ts-ignore 微博源码，hash生成固定一个数字，用于生成 */
const generateN = (t) => {
  t = String(t)
  var e,
    i =
      "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D"
  "undefined" == typeof e && (e = 0)
  var a = 0,
    o = 0
  e ^= -1
  for (var n = 0, s = t.length; n < s; n++)
    (o = 255 & (e ^ t.charCodeAt(n))),
      (a = "0x" + i.substr(9 * o, 8)),
      (e = (e >>> 8) ^ a)
  return -1 ^ e
}

/* @ts-ignore 微博源码,hash生成大图cdn链接*/
function generateUrl(t, i) {
  var e,
    i =
      arguments.length > 1 && void 0 !== arguments[1]
        ? arguments[1]
        : "bmiddle",
    o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
  if (
    ("undefined" == typeof i && (i = "bmiddle"),
    "undefined" == typeof o && (o = !1),
    "w" == t[9] || ("y" == t[9] && t.length >= 32))
  ) {
    var n = 1 + (3 & generateN(t)),
      s = "g" == t[21] ? "gif" : "jpg"
    e = o
      ? "w" == t[9]
        ? "https://ww" + n + ".sinaimg.cn/" + i + "/" + t + "." + s
        : "https://wx" + n + ".sinaimg.cn/" + i + "/" + t + "." + s
      : "w" == t[9]
      ? "http://ww" + n + ".sinaimg.cn/" + i + "/" + t + "." + s
      : "http://wx" + n + ".sinaimg.cn/" + i + "/" + t + "." + s
  } else {
    var r = 1 + (15 & parseInt(t.substr(-2, 2), 16))
    e = o
      ? "https://ss" + r + ".sinaimg.cn/" + i + "/" + t + "&690"
      : "http://ss" + r + ".sinaimg.cn/" + i + "/" + t + "&690"
  }
  return e
}

function download(filename: string, text: string) {
  var element = document.createElement("a")
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  )
  element.setAttribute("download", filename)

  element.style.display = "none"
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

const selfFetch = (url: RequestInfo, uid: string) => {
  return fetch(url, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9,be;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "client-version": "v2.36.23",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "server-version": "v2022.11.18.1",
    },
    referrer: `https://weibo.com/u/${uid}?tabtype=album`,
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
}

class WeiBoDL {
  /*起始分页id*/
  sinceId: string
  /*被爬取的用户uid*/
  uid: string
  /*被爬取的用户可能没有uid，使用的是custom uid*/
  customUid: string
  /*当前完成张数*/
  currentNum: number
  /*当前页数*/
  currentPage: number
  /*url-list 储存已经爬取的大图cdn*/
  urlList: string[]
  /*被爬取的用户名称*/
  userName: string

  constructor() {
    this.sinceId = "0"
    this.uid = ""
    this.currentNum = 0
    this.currentPage = 0
    this.urlList = []
    this.userName = ""
    try {
      this.init()
    } catch (e) {
      var parameter = document.getElementById("parameter")
      parameter.innerHTML =
        "出现错误，可以尝试点击按钮，手动继续。或者刷新页面重新下载一次"
    }
  }

  // 初始化
  init = () => {
    // 加个延时
    // setTimeout(() => {

    this.getUserInfo()
    this.addUIToPage()
    // }, 2000)
  }

  /*获取uid,用户名称*/
  getUserInfo = async () => {
    this.uid =
      window.location.href?.match(/\/u\/(\d*)/)?.[1] || window?.$CONFIG?.oid

    this.customUid =
      window.location.href?.match(
        /weibo\.com\/([^\/]*?)\?tabtype=album/
      )?.[1] || undefined

    if (this.uid) {
      const res = await selfFetch(
        `https://weibo.com/ajax/profile/info?uid=${this.uid}`,
        this.uid
      ).then((r) => r.json())

      this.userName =
        res?.data?.user?.screen_name || window?.$CONFIG?.onick || "unknown"
    }

    if (this.customUid) {
      const res = await selfFetch(
        `https://weibo.com/ajax/profile/info?custom=${this.customUid}`,
        this.uid
      ).then((r) => r.json())
      this.userName =
        res?.data?.user?.screen_name || window?.$CONFIG?.onick || "unknown"
      //根据customUid拿到的数据，回写uid
      this.uid = res?.data?.user?.idstr
    }
  }

  /*添加ui到page上，并绑定好对应的处理事件*/
  addUIToPage = () => {
    //增加样式
    addStyle(
      `
      * {
      margin: 0;
      padding: 0;
    }
  
    #container {
      width: 980px;
      background: #eeeeee;
      position: relative;
      margin: 60px auto 0 auto;
      border: 1px solid #f5144c;
      border-radius: 0.2rem;
    }
  
    #nav {
      position: relative;
      height: 40px;
      width: 980px;
      /* background-color: red; */
    }
  
    #left {
      position: relative;
      height: 120px;
      width: 720px;
      /* background-color: blue; */
      display: none;
      border: 1px solid rgba(245, 20, 76, 0.62);
      border-radius: 0.2rem;
      text-align: center;
    }
  
    #right {
      position: relative;
      height: 120px;
      width: 230px;
      /* background-color: purple; */
      display: none;
      border: 1px solid rgba(245, 20, 76, 0.62);
      border-radius: 0.2rem;
      text-align: center;
    }
  
    #nav #nav_left {
      position: absolute;
      text-align: center;
      height: 40px;
      width: 150px;
      top: 0;
      left: 0;
      /* background-color: yellow; */
    }
  
    #nav #nav_right {
      position: absolute;
      text-align: center;
      height: 40px;
      width: 150px;
      top: 0;
      right: 0;
      /* background-color: yellow; */
    }
  
    #icon {
      line-height: 40px;
      text-decoration: none;
      color: rgba(245, 20, 76, 0.62);
      font-family: sans-serif;
      font-size: 24px;
    }
  
    #icon:hover {
      color: #f5144c;
    }
  
    #loadBtn {
      color: rgba(245, 20, 76, 0.62);
      background-color: #fff;
      border: 1px solid rgba(245, 20, 76, 0.62);
      height: 30px;
      width: 50px;
      line-height: 1.25;
      text-decoration: none;
      border-radius: 0.2rem;
      display: inline-block;
      margin-top: 5px;
    }
  
    #loadBtn:hover {
      color: #fff;
      background-color: rgba(245, 20, 76, 0.62);
    }
  
    #runBtn {
      color: rgba(0, 68, 253, 0.62);
      background-color: #fff;
      border: 1px solid rgba(0, 68, 253, 0.62);
      height: 30px;
      width: 50px;
      line-height: 1.25;
      text-decoration: none;
      border-radius: 0.2rem;
      display: none;
      margin-top: 5px;
    }
  
    #runBtn:hover {
      color: #fff;
      background-color: rgba(0, 68, 253, 0.62);
    }
    .title {
      text-align: center;
      display: block;
      position: relative;
      top: -12px;
      left: 15px;
      background: #fff;
      width: 40px;
      height: 20px;
    }
    #state,
    #state2,
    #state3 {
      margin-top: 10px;
      display: block;
    }
    #place {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 10px 20px 10px
    }
        `
    )
    //创造容器
    var el_container = document.createElement("div")
    el_container.id = "container"
    el_container.innerHTML = `
  <div id="nav">
    <div id="nav_left">
      <a id="icon" href="#">WeiboDL</a>
    </div>
    <div id="nav_right">
      <button id="loadBtn">Load</button>
      <button id="runBtn">Run</button>
    </div>
  </div>
  <div id="place">
    <div id="left">
      <span class="title">参数</span>
      <span id="parameter"></span>
    </div>
    <div id="right">
      <span class="title">状态</span>
      <span id="state"></span>
      <span id="state2"></span>
      <span id="state3"></span>
    </div>
  </div>
  `

    //添加容器到页面
    var nav =
      document.querySelectorAll('div[role="navigation"]')?.[0] ||
      document.getElementById("pl_common_top")
    insertAfter(el_container, nav)

    //选取元素标签，对css进行dom操作
    var loadbtn = document.getElementById("loadBtn")
    var runbtn = document.getElementById("runBtn")
    var left = document.getElementById("left")
    var right = document.getElementById("right")
    var parameter = document.getElementById("parameter")
    var state = document.getElementById("state")
    var state2 = document.getElementById("state2")
    var state3 = document.getElementById("state3")

    left.style.display = "inline-block"
    right.style.display = "inline-block"
    runbtn.style.display = "inline-block"
    loadbtn.style.display = "none"

    state.innerText = "就绪"
    state2.innerText = "当前页数：第" + this.currentNum + "页"
    state3.innerText = "已完成" + this.currentNum + "张"

    //run的click事件绑定
    runbtn.onclick = () => {
      setTimeout(async () => {
        parameter.innerHTML = "正在运行中...请耐心等待"
        while (this.sinceId) {
          const res = await this.getUrlList()
          if (res === "end") break
          await sleep(1000)
        }
        parameter.innerHTML =
          "下载完成，链接在打开的新标签页中,并且会生成一个文件提供下载。<br/>新标签页如果无法打开，请允许浏览器不阻止弹窗，可以按F12，在开发者工具的console里复制结果,无需重复执行"

        this.output()
      }, 500)
    }
  }

  getUrlList = async () => {
    const res = await selfFetch(
      `https://weibo.com/ajax/profile/getImageWall?uid=${this.uid}&sinceid=${
        this.sinceId
      }${this.sinceId === "0" ? `&has_album=true` : ""}`,
      this.uid
    ).then((r) => r.json())

    this.sinceId = String(res.data.since_id)
    this.currentPage++
    var state2 = document.getElementById("state2")
    state2.innerText = "当前页数：第" + this.currentPage + "页"
    this.urlList.push(
      // @ts-ignore
      ...res.data.list.map((item) => {
        this.currentNum++
        var state3 = document.getElementById("state3")
        state3.innerText = "已完成" + this.currentNum + "张"
        return generateUrl(item.pid, "large")
      })
    )
    if (res.data.since_id === 0) return "end"
    // if (this.currentPage === 1) return "end"
  }

  //生成新标签页，并写入url
  output = () => {
    let logStr = ""
    let divStr = ""
    const str = this.urlList.map((item) => {
      logStr = logStr + "\n" + item
      divStr = divStr + `<div>${item}</div><br/>`
    })
    // console.log(this.urlList)

    console.log(logStr)
    download(
      `username_${this.userName}_uid_${this.uid}_date_${Date.now()}.txt`,
      logStr
    )

    var dw = window.open()
    dw.document.open()
    dw.document.write("<div>" + divStr + "</div>")
    dw.document.close()
  }
}

new WeiBoDL()
