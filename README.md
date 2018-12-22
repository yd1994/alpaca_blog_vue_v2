ALPACA BLOG
========
ALPACA BLOG 是单用户博客系统，分为前端和后端两部分，前端使用vue+quasar编写，后端以Spring框架为主。

- 前端地址： [alpaca_blog_vue_v2](https://github.com/yd1994/alpaca_blog_vue_v2)
- 后端地址： [alpaca_blog_v2](https://github.com/yd1994/alpaca_blog_v2)
- 线上地址： [YD的BLOG](https://www.yd1994.com)

线上版本未备案（务必加上https://），可多次尝试，可能无法访问。
查看后台可以使用默认用户名密码直接点击登录，但是该账户只有查看，没有修改权限（post、put、delete请求将返回403）。


特点
========
- 前后端分离
- 前台多平台兼容（可自适应pc、手机浏览器，可构建成ios、android、Electron应用）
- restful API
- Spring Cloud 部分功能加持（由于服务器内存有限，只使用Eureka，oauth、feign，未使用config，zuul等功能）


说明
=======
该项目为前端


技术详细
=======
- html
- css（stylus）
- es 6
- vue
- quasar

前端介绍
=======
前端使用VUE框架 + quasar UI开发，包括vue-router、store、axios等组件。

自适应pc、手机浏览器，也可以打包成ios、android、Electron应用。


