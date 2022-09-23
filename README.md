# foursmile-utils
js通用函数库


### 项目构建打包以及发布流程
<br/>

```bash

$ npm install cp -g                # 前提：全局安装cp

$ npm install                      # 1.安装依赖

$ npm run build                    # 2.打包构建（rollup）,生成dist目录,即打包后文件目录

$ npm run publish -- -v <版本号>    # 3.打包发布

例如：npm run publish -- -v 1.0.2


创建一个新的函数，根据提示填写函数名和描述
$ npm run create


```