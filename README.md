## the-subway-of-china
中国地铁图


### 项目介绍
中国地铁图，支持PC、移动端多种浏览器。覆盖北上广多个城市。
- 技术点
    1. svg绘制
    2. 调用svg-pan-zoom.js以及hammer.js缩放
    3. gulp文件打包

- 数据来源
    1. 百度地图

### 项目运行
- 环境依赖
    1. node v6.10.2

- 部署步骤
    1. npm install  //安装node运行环境
    2. gulp    //前端编译

### 目录结构描述
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

### 页面预览
- [在线预览](https://stavinli.github.io/the-subway-of-china/dest/index.html) 点个赞吧！


### 更新记录

#### 2018.7.17
```
    -  first-init 新增gitHub预览设置 
```
#### 2018.7.23
```
    -  gulp打包上线
```
#### 2018.7.24
```
    -  解决cnpm install 后node_modules包无法push，改用npm install
    -  更改依赖配置，新增版本号?v=
    -  新增gulp-sourcemaps地图
```
#### 2018.7.30
```
    -  indexOf()==-1替换为includes()：返回布尔值，表示是否找到了参数字符串。
```
    
### 项目总结
 * 1.stroke color -->加“#”
 * 2.svg image标签路径赋值 -->image[0].href.baseVal = ;
 * 3.pc微信内置浏览器不显示-->es6兼容
 * 4.中转站存在text内容及image相同重叠问题 -->repeatStr.includs(uid)