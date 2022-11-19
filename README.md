# WeiboDL
- 一个微博相册爬虫
- A Weibo album crawler

## log
 - 22.11.19
    - 支持最新版微博web端，旧版web也兼容了，应该也可以用
    - 出现报错，或者阻塞，可以手动继续运行（重试报错部分）
    - 支持生成txt文件，脚本运行完成后，会直接自动下载，可以把txt直接导入到idm等下载器中。
    - 生成的图片链接有可能直接在浏览器里面打不开，因为微博有做referrer限制，最好使用下载器下载

 - 19.3.30
    
    修复小图bug， 使得出来的图片为大图。
 - 19.6.3
 
    修复关于http在https的域名下不能发送xhr请求的bug。现在已全部改成https。

 - 19.7.30
   
   继续修复19.6.3的bug，问题在于在不同的地区或者网络环境下访问域名`photo.weibo.com`，https协议会在部分情况下降级为http，从而导致请求跨域被拦截。已采用`window.location.origin`动态判断当前页面的协议方式。

 - 21.02.10
   to do 
## Install
- 本脚本在tampermonkey上运行，可在greasyfork上安装，安装地址：https://greasyfork.org/zh-CN/scripts/369485-weibodl-1-4-%E5%BC%82%E6%AD%A5%E5%A2%9E%E5%BC%BA%E7%89%88
- This script runs on tampermonkey and can be installed on XX with the installation address: https://greasyfork.org/zh-CN/scripts/369485-weibodl-1-4-%E5%BC%82%E6%AD%A5%E5%A2%9E%E5%BC%BA%E7%89%88

## Usage
- 在微博相册专辑页面的导航栏下能显示出如下的效果：
- The following effects can be displayed on the navigation bar of the Weibo Album Album page:
![样例2](http://wx3.sinaimg.cn/large/006w0upJgy1fsal9vxxkyj30yw07nweu.jpg)
- 再单击run就能运行，不使用的情况下，不会占用浏览器资源。
- click run to run, without using the browser resources will not be occupied.

## License

![GPLv3](https://www.gnu.org/graphics/gplv3-127x51.png)

WeiboDL is licensed under [GNU General Public License](https://www.gnu.org/licenses/gpl.html) Version 3 or later.

WeiboDL is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

WeiboDL is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with BaiduExporter.  If not, see <http://www.gnu.org/licenses/>.
