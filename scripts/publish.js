/*
 * @Author: 谢炉琪
 * @Date: 2022-09-20 14:56:54
 * @LastEditors: 谢炉琪
 * @LastEditTime: 2022-09-29 11:58:46
 * @Description: 修改包名，获取正确的版本号并修改
 */

const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const program = require('commander');


const fnExiting = fs.readdirSync(path.join(__dirname, '../dist'));
if (fnExiting) {
  const targetFile = path.resolve(__dirname, '../dist/package.json');
  const packagejson = require(targetFile);
  const currentName = packagejson.name;
  const currentVersion = packagejson.version;
  const versionArr = currentVersion.split('.');
  const [mainVersion, subVersion, phaseVersion] = versionArr;

  // 默认版本号
  const defaultVersion = `${mainVersion}.${subVersion}.${+phaseVersion+1}`;

  let newVersion = defaultVersion;


  // 从命令行参数中取版本号
  program
    .option('-v, --versions <type>', 'Add release version number', defaultVersion);

  program.parse(process.argv);


  const options = program.opts();

  if (options.versions) {
    newVersion = options.versions;
  }

  function publish() {
    shelljs.sed('-i', `"name": "${currentName}"`, '"name": "@foursmile/utils"', targetFile); // 修改包名
    shelljs.sed('-i', `"version": "${currentVersion}"`, `"version": "${newVersion}"`, targetFile); // 修改版本号
    shelljs.cd('dist');
    shelljs.exec('npm publish --access public'); // 发布
  }

  publish();
}