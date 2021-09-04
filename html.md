### HTML

1.  src 和 href 的区别

    - 相同点

      都是用来引入外部的资源

    - 区别

      - src: 表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src 会将其指向的资源下载并应用到文档内，如请求 js 脚本。当浏览器解析道该元素时，会暂停其他资源的下载和处理，直到将该资源加载，编译，执行完毕，所以一般 js 脚本会放在页面底部

      - href: 表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它指向的文件时，就会并行下载资源，不会停止当前文档的处理。常用在 a、link 等标签时

2.  对 HTML 语义化的理解

3.  DOCTYPE(⽂档类型) 的作⽤

4.  script 标签中 defer 和 async 的区别

5.  常⽤的 meta 标签有哪些

6.  HTML5 有哪些更新

    - 新增语义化标签: nav、 header、 footer、 aside、 section、 article
    - 音频标签、视频标签: audio、 video
    - 数据存储: localStorage、 sessionStorage
    - canvas(画布)、 geolocation(地理定位)、 websocket(通信协议)、 svg(可伸缩矢量图形)
    - input 标签新属性: placeholder、 autocomplete、 autofocus、 required
    - history API: go、forward、 back、 pushState

7.  img 的 srcset 属性的作⽤？

8.  行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

    - 行内元素

      span、 a、 b、 input、select、 strong、img

    - 块级元素

      div、 ul、 ol、 dl、 li、 dt、 dd、 h1、 h2、 h3、 h4、 h5、 h6、p

    - 空(void)元素，即没有内容的 HTML 元素。空元素是在开始标签中关闭的， 也就是空元素没有闭合标签

      - 常见: br、 hr、 img、 input、 link、 meta
      - 鲜见: area、base、 col、 colgoroup、 command、 embed、keygen、 param、 source、 track、wbr

9.  说一下 web worker

    在 HTML 页面中，如果在执行脚本时，页面的状态是不可相应的，直到脚本执行完成后，页面才变成可相应

    web worker 是运行在后台的 js，独立于其他脚本，不会影响页面的性能， 并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程

    如何创建 web worker

    - 检测浏览器对于 web worker 的支持性

    - 创建 web worker 文件(js、 回传函数等)

    - 创建 web worker 对象

10. HTML5 的离线储存怎么使用，它的工作原理是什么

    - 定义： 在用户没有与因特网连接时，可以正常访问站点或应用， 在用户与因特网连接时，更新用户机器上的缓存文件

    - 原理： HTML 的离线存储是基于一个新建`.appcache`文件的缓存机制(不是存储技术)，通过这个文件上的解析清淡离线存储资源，这些资源就会像 cookie 一样存储下来。这回当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示

    - 使用方法

      - 创建一个 html 同名的 manifest 文件，然后在页面头部加入 manifest 属性

        `<html lang='eb' manifest="index.manifest" ></html>`

      - 在`cache.manifest`文件中需要离线存储的资源

        - CACHE: 表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来
        - NETWORK: 表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高
        - FALLBACK: 表示如果访问第一个资源失败， 那么就使用第二个资源来替换他， 比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html

        ```js
          CACHE MANIFEST
            #v 0.11
            CACHE:
            js/app.js
            css/style.css
            NETWORK:
            resource/logo.png
            FALLBACK:
            // offline.html
        ```

      - 在离线状态时，操作 `window.applicationCache` 进行离线缓存的操作

    - 如何更新缓存

      - 更新 manifest 文件
      - 通过 JavaScript 操作
      - 清楚浏览器缓存

    - 注意事项

      - 浏览器对缓存数据的容量限制可能不太一样(某些浏览器设置的限制是每个站点 5MB)
      - 如果 manifest 文件，或者内部列举的某一个文件不能正常下载， 整个更新过程都将失败， 浏览器继续全部使用老的缓存
      - 引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下
      - FALLBACK 中的资源必须和 manifest 文件同源
      - 当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源
      - 站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中的资源
      - 当 manifest 文件发生改变时，资源请求本身也会触发更新

11. 浏览器是如何对 HTML5 的离线储存资源进行管理和加载？

    - 在线的情况下

      浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件

      如果是第一次访问页面，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行存储

      如果已经访问过页面并且资源已经进行离线存储了， 那么浏览器就会使用离线的资源加载页面， 然后浏览器会比对新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了， 就会重新下载文件中的资源并进行离线存储

    - 离线的情况下

      浏览器会直接使用离线存储的资源

12. title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别？

13. iframe 有那些优点和缺点？

    - 定义: iframe 元素会创建包含另外一个文档的内联框架(即行内框架)

    - 优点

      - 用来加载速度较慢的内容(如广告)
      - 可以使脚本可以并行下载
      - 可以实现跨子域通信

    - 缺点

      - iframe 会阻塞主页面的 onload 事件
      - 无法被一些搜索引擎识别
      - 会产生很多页面，不容易管理

14. label 的作用是什么？如何使用？

15. Canvas 和 SVG 的区别

16. head 标签有什么作用，其中什么标签必不可少？

17. 文档声明（Doctype）和有何作用? 严格模式与混杂模式如何区分？它们有何意义?

18. 浏览器乱码的原因是什么？如何解决？

19. 渐进增强和优雅降级之间的区别

20. 说一下 HTML5 drag API
