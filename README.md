#### the-subway-of-china
中国地铁图


##### 项目介绍
中国地铁图，支持PC、移动端多种浏览器。覆盖北上广多个城市。
- 技术点
    1. svg绘制
    2. 调用svg-pan-zoom.js以及hammer.js缩放
    3. gulp文件打包

- 数据来源
    1. 百度地图

##### 项目运行
- 环境依赖
    1. node v6.10.2

- 部署步骤
    1. npm install  //安装node运行环境
    2. gulp    //前端编译

##### 目录结构描述
```
├── Readme.md                   //help
├── dest                        //发布包
│   ├── css
│   ├── js                
│   └── *.html        
├── libs                        //第三方文件
├── node_modules                  
├── rev                         //静态版本json
├── src                         //开发包
└── gulpfile.js
```

##### 页面预览
- [在线预览](https://stavinli.github.io/the-subway-of-china/dest/index.html) 点个赞吧！
