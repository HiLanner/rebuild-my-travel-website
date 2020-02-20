# rebuild-my-travel-website
使用node+vue+mongodb重构旅游网站

### 1. 环境说明
     需系统安装mongoDB环境 本项目实用的数据库是Robomongo
     node版本 8.10.0
     npm 5.6.0

### 2. 启动命令
     npm run start


- website

    - bin                    #express项目启动文件
    - lib                    #express项目开发所需的库
    + routes                #express项目路由
    - src                    #前端源码开发目录
        - styles            #css目录，按照页面（模块）、通用、第三方三个级别进行组织
            + page
            + common
            + lib
        + imgs                #图片资源
        - scripts            #JS脚本，按照page、components进行组织
            + page
            + components
        + views                #HTML模板
    - public                #webpack编译打包输出目录的静态文件，express工程的静态目录
        + styles
        + scripts
        + imgs
    + views                    #webpack编译输出的模板静态文件，express工程的视图模板
    + node_modules            #所使用的nodejs模块
    package.json            #项目配置
    webpack.config.js        #webpack配置
    README.md                #项目说明

## 功能和路由设计

    - 注册

        1. 注册页: GET/signup
        2. 注册: 包含上传图片 POST/signup
    - 登录
        1. 登录页: GET/signin
        2. 登录: POST/signin
    - 注销
        1. 注销: GET/signout
    - 个人信息
        1. 查看个人信息: GET/information/:userID
        2. 修改个人信息: POST/information/:userID
    - 攻略
        + 查看攻略
            1. 所有的攻略: GET/strategy
            2. 特定用户的发表的攻略: GET/strategy?user=?
            3. 某个城市相关的攻略: GET/strategy?city=?
            4. 查看某条特定的攻略: POST/strategy/:strategyID
        + 发表攻略
            1. 发表攻略页: GET/strategy/create
            2. 发表攻略: POST/strategy/create
        + 修改攻略
            1. 修改攻略页: GET/strategy/edit
            1. 修改攻略: POST/strategy/:strategyID/edit
        + 删除攻略
            1. 删除攻略: GET/strategy/:strategyID/remove
    - 攻略评论
        + 查看评论
            1. 某条攻略下的所有评论: GET/strategy/:strategy/comment
        + 发表评论
            1. 发表评论: POST/strategy/:strategyID/comment
        + 删除评论
            1. 删除评论: GET/strategy/:strategyID/comment/:commentID/remove
    - 游记
        + 查看游记
            1. 所有的游记: GET/travelNote
            2. 特定用户发表的游记: GET/travelNote?user=?
            3. 某个城市相关的攻略: GET/travelNote?city=?
            4. 查看某条特定的攻略: POST/travelNote/:travelNoteID
        + 发表游记
            1. 发表游记页: GET/travelNote/create
            2. 发表游记: POST/travelNote/create
        + 修改游记
            1. 修改游记页: GET/travelNote/edit
            1. 修改游记: POST/travelNote/:travelNoteID/edit
        + 删除游记
            1. 删除游记: GET/travelNote/:travelNoteID/remove
    - 游记评论
        + 查看评论
            1. 某条游记下的所有评论: GET/travelNote/:travelNoteID/comment
        + 发表评论
            1. 发表评论: POST/travelNote/:travelNoteID/comment
        + 删除评论
            1. 删除评论: GET/travelNote/:travelNoteID/comment/:commentID/remove
    - 社区提问
        + 查看问题
            1. 所有的问题: GET/question
            2. 特定用户发表的: GET/question?user=?
        + 发表问题
            1. 发表问题页: GET/question/create
            2. 发表问题: POST/question/create
        + 删除问题
            1. 删除问题: GET/question/:questionID
    - 社区回答
        + 查看回答
            1. 查看某个问题下的所有回答: GET/question/:questionID/answer
            2. 查看某个问题的特定回答: GET/question/:questionID/answer/:answerID
        + 发表回答
            1. 发表回答: POST/question/:questionID/answer
        + 删除回答
            1. 删除回答: GET/question/:questionID/answer/:answerID/remove
    - 社区回答评论
        + 查看评论
            1. 某条回答下的所有评论: GET/question/:questionID/answer/:answerID/comment
        + 发表评论
            1. 发表评论: POST/question/:questionID/answer/:answerID/comment
        + 删除评论
            1. 删除评论: GET/question/:questionID/answer/:answerID/comment/remove


