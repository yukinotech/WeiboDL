# WeiboDL

- 一个微博相册爬虫
- A Weibo album crawler

## log

- 22.11.19

  - 支持最新版微博 web 端，旧版 web 也兼容了，应该也可以用
  - 增加 username 输出
  - 出现报错，或者阻塞，可以手动继续运行（重试报错部分）
  - 支持生成 txt 文件，脚本运行完成后，会直接自动下载，可以把 txt 直接导入到 idm 等下载器中。
  - 生成的图片链接有可能直接在浏览器里面打不开，因为微博有做 referrer 限制，最好使用下载器下载

- 19.7.30
  继续修复 19.6.3 的 bug，问题在于在不同的地区或者网络环境下访问域名`photo.weibo.com`，https 协议会在部分情况下降级为 http，从而导致请求跨域被拦截。已采用`window.location.origin`动态判断当前页面的协议方式。

- 19.6.3
  修复关于 http 在 https 的域名下不能发送 xhr 请求的 bug。现在已全部改成 https。

- 19.3.30
  修复小图 bug， 使得出来的图片为大图。

## Install

- 本脚本在 tampermonkey 上运行，可在 greasyfork 上安装，安装地址：https://greasyfork.org/zh-CN/scripts/369485-weibodl-1-4-%E5%BC%82%E6%AD%A5%E5%A2%9E%E5%BC%BA%E7%89%88
- This script runs on tampermonkey and can be installed on XX with the installation address: https://greasyfork.org/zh-CN/scripts/369485-weibodl-1-4-%E5%BC%82%E6%AD%A5%E5%A2%9E%E5%BC%BA%E7%89%88

## Usage

- 在微博相册专辑页面的导航栏下能显示出如下的效果：
- The following effects can be displayed on the navigation bar of the Weibo Album Album page:
  ![样例2](http://wx3.sinaimg.cn/large/006w0upJgy1fsal9vxxkyj30yw07nweu.jpg)
- 再单击 run 就能运行，不使用的情况下，不会占用浏览器资源。
- click run to run, without using the browser resources will not be occupied.

## License

![GPLv3](https://www.gnu.org/graphics/gplv3-127x51.png)

WeiboDL is licensed under [GNU General Public License](https://www.gnu.org/licenses/gpl.html) Version 3 or later.

WeiboDL is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

WeiboDL is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with BaiduExporter. If not, see <http://www.gnu.org/licenses/>.
