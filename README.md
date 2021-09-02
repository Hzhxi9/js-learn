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

### CSS

#### 基础

1. CSS 选择器及其优先级

| 选择器         | 格式          | 优先级权重 |
| -------------- | ------------- | ---------- |
| id 选择器      | #id           | 100        |
| 类选择权       | .className    | 10         |
| 属性选择器     | a[ref='eee']  | 10         |
| 伪类选择器     | li:last-child | 10         |
| 标签选择器     | div           | 1          |
| 伪元素选择器   | li:after      | 1          |
| 相邻兄弟选择器 | h1 + p        | 0          |
| 子选择器       | ul > li       | 0          |
| 后代选择器     | li a          | 0          |
| 通配符选择器   | \*            | 0          |

- 对于选择器的优先级

  - 标签选择器、 伪元素选择器: 1
  - 类选择器、 伪类选择器、属性选择器: 10
  - id 选择器: 100
  - 内联样式: 1000

- 注意事项

  - !important 声明的样式的优先级最高
  - 如果优先级相同， 则最后出现的样式生效
  - 继承得到的样式的优先级最低
  - 通用选择器(\*)、 子选择器(>)、 相邻兄弟选择器(+)并不在这四个等级中，所以他们的权值为 0
  - 样式表的来源不同时， 优先级顺序为: 内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式

2. CSS 中可继承与不可继承属性有哪些

3. display 的属性值及其作用

4. display 的 block、inline 和 inline-block 的区别

- block

  会独占一行，多个元素会另起一行，可以设置 width、 height、 margin、 padding

- inline

  元素不会独占一行， 设置 width、 height 属性无效。 但可以设置水平方向的 margin、 padding 属性，不能设置垂直方向的 padding、 margin

- inline-block

  将对象设置为 inline 对象， 但对象的内容作为 block 对象呈现， 之后的内联对象会被排列在同一行内

5. 行内元素和块级元素的特点

   - 行内元素

     - 设置宽高无效
     - 可以设置水平方向的 margin、 padding 属性， 不能设置垂直方向的 padding、margin
     - 不会自动换行

   - 块级元素

     - 可以设置宽高
     - 设置 margin、 padding 都有效
     - 可以自动换行
     - 多个块状，默认排列从上到下

6. 隐藏元素的方法有哪些

   - display: none

     渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件

   - visibility: hidden

     元素在页面中仍占据空间，但是不会响应响应绑定的监听事件

   - opacity: 0

     将元素的透明度设置为 0， 以来此实现元素的隐藏，以此来显示元素的隐藏

   - position： absolute

     通过使用绝对定位将元素移除可视区域内， 以此来实现元素的隐藏

   - z-index: 负值

     来使其他元素遮盖住该元素，以此来实现隐藏

   - clip/clip-path

     使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件

   - transform: scale(0, 0)

     将元素缩放为 0， 来实现元素的隐藏。这种方法下，元素仍在页面中占据页面，但是不会响应绑定的监听事件

7. link 和@import 的区别

两者都是外部引用 CSS 的方式，他们的区别如下

- link 是 XHTML 标签，除了加载 CSS 外， 还可以定义 RSS 等其他事务； @important 属于 CSS 范畴，只能加载 CSS

- link 引用 CSS 时， 在页面载入时同时加载； @important 需要页面网页完全载入以后加载

- link 是 XHTML 标签，无兼容问题； @important 是在 CSS2.1 提出的，低版本浏览器不支持

- link 支持使用 JavaScript 控制 DOM 去改变样式； 而@important 不支持

8. transition 和 animation 的区别

9. display:none 与 visibility:hidden 的区别

10. 伪元素和伪类的区别和作用？

11. 对 requestAnimationframe 的理解

12. 对盒模型的理解

- CSS3 中的盒模型有以下两种: 标准盒子模型、 IE 盒子模型

- 盒模型都是由四个部分组成的， 分别是 margin、 border、 padding、 content

- 标准盒模型和 IE 盒模型的区别在于设置 width、 height 时，所对应的范围不同

  - 标准盒模型的 width、 height 属性的范围只包含 content
  - IE 盒模型的 width、height 属性的范围包含了 border、 padding、 content

- 可以通过修改元素的 box-sizing 属性来改变元素的盒模型

  - box-sizing: content-box 表示标准盒模型
  - box-sizing: border-box 表示 IE 盒模型

13. 为什么有时候⽤ translate 来改变位置⽽不是定位？

14. li 与 li 之间有看不见的空白间隔是什么原因引起的？如何解决？

15. CSS3 中有哪些新特性

    - 新增各种 CSS 选择器(:nit(.input) :所有 class 不是'input'的节点)
    - 圆角(border-radius)
    - 多列布局(multi-column layout)
    - 阴影和反射(shadow, eflect)
    - 文字特效(text-shadow)
    - 文字渲染(text-decoration)
    - 线性渐变(gradient)
    - 旋转(transform)
    - 缩放、定位、 倾斜、 动画、 多背景

16. 替换元素的概念及计算规则

17. 常见的图片格式及使用场景

18. 对 CSSSprites 的理解

    - 含义

      CSSSprites(精灵图)， 将一个页面涉及到的所有图片都包含到一张大图中，然后利用 CSS 的 background-image，background-repeat， background- position 属性的组合进行背景定位

    - 优点

      - 利用 CSS Sprites 能很好地减少网页的 http 请求， 从而大大提高了页面的性能，这是 CSS Sprites 最大的优点
      - CSS Sprites 能减少图片的字节，把三张图片合并成一张图片的字节总是小于这三张图片的字节总和

    - 缺点

      - 在图片合并时，要把多张图片有序的，合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂
      - CSS Sprites 在开发的时候相对来说有点麻烦，需要借助 photoshop 或其他工具来对每个背景单元测量其准确的位置
      - 维护方面: CSS Sprites 在维护的时候比较麻烦， 页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的 CSS，如果在原来的地方放不下，又只能(最好)往下加图片， 这样图片的字节就增加了， 还要改动 CSS

19. 什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x, @2x 这种图片？

20. margin 和 padding 的使用场景

21. 对 line-height 的理解及其赋值方式

22. CSS 优化和提高性能的方法有哪些？

23. CSS 预处理器/后处理器是什么？为什么要使用它们？

24. ::before 和 :after 的双冒号和单冒号有什么区别？

    - 冒号(:)用于 CSS 伪类，双冒号(::)用于 CSS 为伪元素
    - ::before 就是以一个子元素的存在， 定义在元素主体内容之前的一个伪元素。并不存在 DOM 之中，只存在页面之中
    - 注意: :before 和 :after 这两个伪元素，是在 CSS2.1 里新出现。起初伪元素的前缀使用的是单冒号语法，但随着 Web 的进化，但在 CSS 3 的规划里，伪元素的语法被修改成使用双冒号，成为::before， ::after

25. display:inline-block 什么时候会显示间隙？

26. 单行、多行文本溢出隐藏

- 单行文本溢出

  ```
   overflow: hidden; // 溢出隐藏
   text-overflow: ellipsis; // 溢出用省略号显示
   white-space: nowrap; // 规定段落中的文本不进行换行

  ```

- 多行文本溢出

  ```
    overflow: hidden; // 溢出隐藏
    text-overflow: ellipsis; // 溢出用省略号显示
    display: -webkit-box; // 作为弹性伸缩盒子模型显示
    -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式： 从上到下垂直排列
    -webkit-line-clamp: 3; // 显示的行数
  ```

27. Sass、Less 是什么？为什么要使用他们？

28. 对媒体查询的理解？

29. 对 CSS 工程化的理解

30. 如何判断元素是否到达可视区域

31. z-index 属性在什么情况下会失效

32. CSS3 中的 transform 有哪些属性

#### 页面布局

1. 常用的 CSS 布局单位

   - 常用的布局单位包括像素(px), 百分比(%), em, rem, vw/vh

   - 像素(px)是页面布局的基础，一个像素表示终端(电脑、手机、平板等)屏幕所能显示的最小的区域， 像素分为两种类型: CSS 像素和物理像素

     - CSS 像素: 为 Web 开发这提供，在 CSS 中使用的一个抽象单位
     - 物理像素: 只与设备的硬件密度有关，任何设备的物理像素都是固定的

   - 百分比(%)，当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽度和高度随着浏览器的变化而变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素

   - em / rem 相对于 px 更具灵活性，他们都是相对长度单位，他们之间的区别就是 em 相对于父元素， rem 相对于 根元素

     - em: 文本相对长度单位。 相对于当前对象内文本的字体尺寸。 如果当前行内文本的字体尺寸未被认为设置，则相对于浏览器的默认字体尺寸(默认 16px)。 (相对父元素的字体大小倍数)
     - rem: rem 是 CSS3 新增的一个相对单位，相对于根元素(html 元素)的 font-size 的倍数。作用: 利用 rem 可以实现简单的响应式布局，可以利用 html 元素中字体的大小与屏幕间的比值来设置 font-size 的值，以此实现党屏幕分辨率变化时让元素也随之变化

   - vw/vh: 与视图窗口有关的单位， vw 表示相对于视图窗口的宽度，vh 表示相对于视图窗口高度，除了 vw 和 vh 之外，还有 vmin 和 vmax 两个相关的单位

     - vw: 相对于视图的宽度，视图宽度是 100vw
     - vh: 相对于视图的高度，视图高度是 100vh
     - vmin: vw 和 vh 中的较小值
     - vmax: vw 和 vh 中的较大值

   - vw/vh 和百分比很类似，两者的区别

     - 百分比(%): 大部分相对于祖先元素，也有相对于自身的情况比如(border-radius, translate 等)
     - vw/vh: 相对于视图的尺寸

2. px、em、rem 的区别及使用场景

   - 三者的区别

     - px 是固定的像素，一旦设置了就无法因为适应页面的大小而改变
     - em 和 rem 相对于 px 更具有灵活性，他们是相对长度单位，其长度不是固定的，更适用于响应式布局
     - em 是相对于父元素来设置字体大小，这样就会存在一个问题，进行任何元素设置，都有可能需要他父元素的大小。而 rem 是相对于根元素的，这样就意味着，只需要在根元素确定一个参考值

   - 使用场景

     - 对于只需要适配少部分移动设备，且分辨率对页面影响不大的， 使用 px 即可
     - 对于需要适配各种移动设备，使用 rem，例如需要适配 iPhone 和 iPad 等分辨率差别比较挺大的设备

3. 水平垂直居中的实现

   - 绝对定位(考虑兼容性问题)

     ```css
     .parent {
       position: relative;
     }
     .children {
       position: absolute;
       left: 50%;
       top: 50%; // 左上角到页面中心
       transition: translate(-50%, -50%); // 中心点到页面中心
     }
     ```

   - 绝对定位(盒子有宽高的情况)

     ```css
     .parent {
       position: relative;
     }
     .children {
       position: absolute;
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       margin: auto;
     }
     ```

   - 绝对定位(盒子有宽高的情况)

   ```css
   .parent: {
     position: relative;
   }
   .children {
     position: absolute;
     /**左上角到页面中心*/
     top: 50%;
     left: 50%;
     /**中心点到页面中心*/
     margin-top: -50px; /**自身height 的一半*/
     margin-left: -50px; /**自身width 的一半*/
   }
   ```

   - flex 布局(考虑兼容性，移动端用的比较多)

   ```css
   .parent {
     display: flex;
     justify-content: center;
     align-items: center;
   }
   ```

4. 如何根据设计稿进行移动端适配？

移动端适配主要有两个维度

- 适配不同像素密度

  针对不同的像素密度，使用 CSS 媒体查询，选择不同精度的图片，以保证图片不会失真

- 设配不同屏幕大小

  由于不同的屏幕有着不同的逻辑像素大小，所以如果直接使用 px 作为开发单位，会使得开发的页面在某一款可以准确显示，但是在另一款手机上就会失真。为了适配不同屏幕的大小，应按照比例来还原设计稿的内容

为了能让页面的尺寸自适应，可以使用 rem、em、vw、vh 等相对单位

5.  响应式设计的概念及基本原理

- 定义：响应式网站设计是一个网站能够兼容多个终端，而不是为了每一个终端做一个特定的版本

- 原理: 基本原理是通过媒体查询(@media)查询检测不同的设备屏幕尺寸做了处理

- 兼容性: 页面头部必须有 meta 声明的 viewport
  ```html
  <meta
    name="’viewport’"
    content="”width=device-width,"
    initial-scale="1."
    maximum-scale="1,user-scalable=no”"
  />
  ```

#### 定位与浮动

1. 为什么需要清除浮动？清除浮动的方式

- 浮动的定义

  非 IE 浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开。 此时内容会溢出到容器外面而影响布局。这种现象被称为浮动(溢出)

- 浮动的原理

  - 浮动元素脱离文档流，不占据空间(引起"高度塌陷"现象)
  - 浮动元素碰到包含它的边框或者其他浮动元素的边框停留

- 高度塌陷问题

  浮动元素可以左右移动，直到遇到另一个浮动元素或者遇到它外边缘的包含框。浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响块级元素的布局，只会影响内敛元素的布局。此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式。当包含框的高度小于浮动框的时候，此时就会出现"高度塌陷"

- 浮动元素引起的问题

  - 父元素的高度无法被撑开，影响与父元素同级的元素
  - 与浮动元素同级的非浮动元素会跟随其后
  - 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构

- 清除浮动的方式

  - 给父级 div 定义 height 属性
  - 最后一个浮动元素之后添加一个空的 div 标签，并添加 clear: both 样式
  - 包含浮动元素的父级标签添加 overflow: hidden 或者 overflow: auto
  - 使用:after 伪元素。 由于 IE7-8 不支持:after， 使用 zoom:1 触发 hasLayout

2. 对 BFC 的理解，如何创建 BFC

- Box: Box 是 CSS 布局的对象和基本单位，⼀个⻚⾯是由很多个 Box 组成的，这个 Box 就是我们所说的盒模型。

- Formatting context：块级上下⽂格式化，它是⻚⾯中的⼀块渲染区域，并且有⼀套渲染规则，它决定了其⼦元素将如何定位，以及和其他元素的关系和相互作⽤。

- BFC: 块格式化上下文(Box Formatting context, BFC)是 Web 页面的可视化 CSS 渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的关系和相互作用

- 通俗来讲: BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其他环境中的物品。如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响

- 创建 BFC 的条件

  - 根元素: body;
  - 元素设置浮动: float 除 none 以外的值
  - 元素设置绝对定位: position(absolute, fixed)
  - display: inline-block, table-cell, table-caption, flex 等
  - overflow: hidden, auto, scroll

- BFC 的特点

  - 垂直方向上，自上而下排列，和文档流的排列方式一致
  - 在 BFC 中上下相邻的两个容器的 margin 会重叠
  - 计算 BFC 的高度时， 需要计算浮动元素的高度
  - BFC 区域不会与浮动的容器发生重叠
  - BFC 是独立的容器，容器内部元素不会影响外部元素
  - 每个元素的左 margin 值和容器的左 border 相接触

- BFC 的作用

  - 解决 margin 的重叠问题

    由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题

  - 解决高度塌陷的问题

    在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。 解决这个问题， 只需要把父元素变成 BFC。 常用的办法是给父元素设置 overflow: hidden

  - 创建自适应两栏布局

    可以用来创建自适应两栏布局，左边的宽度固定， 右边的宽度自适应

### JavaScript 基础学习

1. `call`、`apply`、`bind`实现

   - call 调用一个函数, 其具有一个指定的 this 值和分别地提供的参数(参数的列表)。

     - 将函数设为对象的属性
     - 执行&删除这个函数
     - 指定`this`到函数并传入给定参数执行函数
     - 如果不传入参数，默认指向 window

   - apply 调用一个函数，以及作为一个数组（或类似数组对象）提供的参数。

   - bind 会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

     - bind 实现需要考虑实例化后对原型链的影响。

2. `new` 关键字实现

   - 在内存中创建一个新对象
   - 新对象的 prototype 赋值构造函数的原型
   - 将 this 指向新对象， 添加新属性
   - 判断是否为非空对象

3. 对象的继承
