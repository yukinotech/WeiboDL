// ==UserScript==
// @name         WeiboDL 异步增强版
// @namespace    http://tampermonkey.net/
// @version      1.6.2
// @description  try to take over the world!
// @author       You
// @match        *://photo.weibo.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    //定义全局变量
    var url = 'http://photo.weibo.com/photos/get_all?uid=5611537367&album_id=3843863474221409&count=30&page=3&type=3'

    var shuchu = ''
    var num = 0

    //cdn方式引入jquery
    var script_el = document.createElement('script')
    script_el.src = 'https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js'
    var head = document.getElementsByTagName('head')
    head[0].appendChild(script_el)

    //增加样式
    addStyle(
        `
        * {
            margin: 0;
            padding: 0;
        }

        #container {
            width: 980px;
            /* background: green; */
            position: relative;
            margin: 0 auto;
            top: 0;
            left: 0;
            border: 1px solid #f5144c;
            border-radius: 0.2rem;

        }

        #nav {
            position: relative;
            top: 0;
            left: 0;
            height: 40px;
            width: 980px;
            /* background-color: red; */
        }

        #left {
            position: relative;
            height: 100px;
            width: 720px;
            margin-top: 20px;
            margin-bottom: 5px;
            top: 0;
            left: 5px;
            /* background-color: blue; */
            display: none;
            border: 1px solid rgba(245, 20, 76, 0.62);
            border-radius: 0.2rem;
            text-align: center;
        }

        #right {
            position: relative;
            height: 100px;
            width: 230px;
            top: 17px;
            right: -15px;
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
            color: #f5144c
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
        .title{
            text-align: center;
            display: block;
            position: relative;
            top:-12px;
            left: 15px;
            background: #fff;
            width: 40px;
            height:20px;
        }
        #state{
            display:block;
        }
        `
    )



    //创造容器
    var el_containner = document.createElement('div')
    el_containner.id = 'container'
    el_containner.innerHTML =
        `
        <div id="nav">
            <div id="nav_left">
                <a id="icon" href="#">WeiboDL</a>
            </div>
            <div id="nav_right">
                <button id="loadBtn">Load</button>
                <button id="runBtn">Run</button>
            </div>
        </div>
        <div id="left">
            <span class="title">参数</span>
            <span id="parameter"></span>
        </div>
        <div id="right">
            <span class="title">状态</span>
            <span id="state"></span>
            <span id="state2"></span>
        </div>`

    //添加容器到页面
    var nav = document.getElementById('nav_small')
    insertAfter(el_containner, nav)

    //选取元素标签，对css进行dom操作
    var loadbtn = document.getElementById('loadBtn')
    var runbtn = document.getElementById('runBtn')
    var left = document.getElementById('left')
    var right = document.getElementById('right')
    var parameter = document.getElementById('parameter')
    var state = document.getElementById('state')

    var id_dict = {}
    loadbtn.onclick = function () {
        show()
        id_dict = album_id_get()
        state.innerText = '就绪'
        state2.innerText = '已完成' + num + '张'
        parameter.innerText = '当前相册共有' + id_dict.photo + '张图片'
    }
    //无数据dom操作
    function show() {
        left.style.display = 'inline-block'
        right.style.display = 'inline-block'
        runbtn.style.display = 'inline-block'
        loadbtn.style.display = 'none'
    }
    //run的click事件绑定
    runbtn.onclick = function () {
        setTimeout(function(){state.innerHTML = '正在运行中...请耐心等待'},500)
        var url_list = url_listmake(id_dict)
        var state_arr = []
        state_set(url_list, state_arr)
        ajax_fenxi(url_list, state_arr)
        new_state_judge(state_arr, oc)
        //state_judge(state_arr, oc)
        // var ajtext=ajax_get(url_list[0])
        // var obj=tojson(ajtext)
        // var dl_str=str_make(obj)
    }

    function state_judge(state_arr, callback) {

        var flag = 0
        for (var i = 0; i < state_arr.length; i++) {
            if (state_arr[i] == 1) {
                flag = flag + 1
            }
        }
        console.log(flag)
        if (flag == state_arr.length) {
            callback()
        } else {
            setTimeout(state_judge(state_arr, callback), 1000)
        }
    }

    function new_state_judge(state_arr, callback) {
        var out = setInterval(function(){f(state_arr, callback)}, 1000)

        function f(state_arr, callback) {
            var flag = 0
            for (var i = 0; i < state_arr.length; i++) {
                if (state_arr[i] == 1) {
                    flag = flag + 1
                }
            }
            console.log(flag+"flag")
            if (flag == state_arr.length) {
                console.log(flag+"out")
                state.innerHTML = '已完成'
                callback()
                clearTimeout(out);
                
            } 
        }
    }
    //插入新元素到目标元素的后面
    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement)
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling)
        }
    }

    //增加元素样式
    function addStyle(csstext) {
        var elStyle = document.createElement('style')
        elStyle.innerHTML = csstext
        document.head.appendChild(elStyle)
    }

    //设置状态函数
    function state_set(url_list, state_arr) {
        for (var i = 0; i < url_list.length; i++) {
            state_arr[i] = 0
        }
    }
    //获得uid和album_id
    function album_id_get() {
        var script1 = document.querySelector('.F_album script');
        var text = script1.innerHTML

        var album_id_parten = /"album_id":"(\d+)"/g
        var uid_parten = /"uid":"(\d+)"/g
        var photo_parten = /"photos":(\d+)/g

        var album_list = album_id_parten.exec(text)
        var uid_list = uid_parten.exec(text)
        var photo_list = photo_parten.exec(text)

        var album_id = album_list[1]
        var uid = uid_list[1]
        var photo = photo_list[1]
        var id_dict = {}

        id_dict['album_id'] = album_id
        id_dict['uid'] = uid
        id_dict['photo'] = photo
        console.log(id_dict)
        console.log(album_id)
        console.log(uid)
        console.log(photo)
        return id_dict
    }

    //ajax发包
    function ajax_get(url, flag, callback, state_arr) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    console.log(xhr.responseText);
                    var text = xhr.responseText
                    callback(text)
                } else {
                    console.log("Request was unsuccessful: " + xhr.status);
                }
                state_arr[flag] = 1
                console.log(state_arr)
            }
        };

    }


    //将json字符串转换为obj对象
    function tojson(ajtext) {
        var obj = $.parseJSON(ajtext);
        console.log(obj)
        return obj
    }

    //根据dict生成urllist
    function url_listmake(dict) {
        var origin = window.location.origin
        console.log(origin)
        console.log(window.location)
        var url_list = []
        var url = ''
        var k = dict.photo / 30 + 1
        for (var i = 1; i <= k; i++) {
            url =  origin +'/photos/get_all?uid=' + dict.uid + '&album_id=' + dict.album_id + '&count=30&page=' + i + '&type=3'
            url_list.push(url)
        }
        return url_list
    }

    //发送ajax请求并分析
    function ajax_fenxi(url_list, state_arr) {

        for (var i = 0; i < url_list.length; i++) {


            var url = url_list[i]
            ajax_get(url, i, ajax_callback, state_arr)

        }
        return shuchu

    }

    function ajax_callback(text) {
        var ajtext = text
        var obj = tojson(ajtext)
        if (obj.data.photo_list.length) {
            dataUpdata(obj)

        }
        var strshuchu = str_make(obj)
        shuchu = shuchu + strshuchu + '<br>'
        console.log(shuchu)
    }
    //根据json对象生成图片url,返回图片列表
    function str_make(obj) {
        var strshuchu1 = ''
        var photols = obj.data.photo_list
        var imgurl_list = []
        for (var i = 0; i < photols.length; i++) {
            var photo = photols[i]
            var imgurl = photo.pic_host + '/large/' + photo.pic_name
            imgurl_list.push(imgurl)
            strshuchu1 = strshuchu1 + imgurl + '<br>'
            //console.log(imgurl)
        }
        console.log(strshuchu1)
        return strshuchu1
    }

    //生成新标签页，并写入url
    function oc() {
        var dw;
        dw = window.open();
        dw.document.open();
        dw.document.write('<div>' + shuchu + '<div>');

        dw.document.close();
    }

    function dataUpdata(obj) {
        num = num + obj.data.photo_list.length
        console.log(num+'外')
        setTimeout(function(){
            state2.innerHTML = '已完成' + num + '张'
            console.log(num+'张')
    },800)
    }
    // Your code here...
})();
