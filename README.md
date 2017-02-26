# rebuild-my-travel-website
使用node+vue+mongodb重构旅游网站
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
