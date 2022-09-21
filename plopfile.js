/*
 * @Author: 谢炉琪
 * @Date: 2022-09-21 11:53:09
 * @LastEditors: 谢炉琪
 * @LastEditTime: 2022-09-21 16:49:24
 * @Description: 自动化创建函数方法
 */
const fs = require('fs');
const path = require('path');
const fnExiting = fs.readdirSync(path.join(__dirname, './src'));
const fnExist = name => fnExiting.indexOf(name+'.ts') > -1;

module.exports = plop => {
  plop.setHelper('camelCase', (txt) => txt.camelCase());
  plop.setGenerator('function', {
    description: '创建一个有返回值的函数',
    prompts: [
      {
        type: 'input',
        name: 'fnName',
        message: '请输入函数名',
        validate: value => {
          if ((/.+/).test(value)) {
            if (fnExist(value)) {
              return '函数名已经存在, 请输入新的函数名！'
            } else {
              if ((/^[a-zA-Z]+$/).test(value)) {
                return true
              }
              return '函数名必须为全英文，请输入新的函数名！'
            }
          } else {
            return '函数名不允许为空！'
          }
        }      
      },
      {
        type: 'input',
        name: 'fnDescription',
        message: '请输入该函数的描述',
        default: ''    
      }      
    ],
    actions:  () => {
      const actions = [];
      actions.push({
        type: 'add',
        path: 'src/{{fnName}}.ts',
        templateFile: 'templates/function.hbs'
      })
      actions.push({
        type: 'append',
        pattern: /((;))/,
        path: './src/index.ts',
        template: 'import {{fnName}} from "./{{fnName}}";'
      })
      actions.push({
        type: 'append',
        pattern: /((export {))/,
        path: './src/index.ts',
        template: '  {{fnName}},'
      })
      return actions;
    }
  })
};