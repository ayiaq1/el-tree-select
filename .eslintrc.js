/*
 * @moduleName:
 * @Author: dawdler
 * @LastModifiedBy: dawdler
 * @Date: 2019-03-26 10:06:00
 * @LastEditTime: 2019-03-26 10:08:15
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // 0关闭，1警告，2错误
    'new-cap': 'off',
    // 强制文件末尾换行
    'eol-last': 'off',
    // 关闭缩进校验
    'indent': 'off',
    // 必须结束分号
    'semi': ['warn', 'always'],
    // 关闭函数名后空格
    'space-before-function-paren': 'off',
    // 有未使用已经定义的变量或者常量定义
    'no-unused-vars': 'warn',
    'space-unary-ops': 'off',
    'quotes': 'warn',
    'padded-blocks': 'warn',
    // 三元表达式
    'no-unneeded-ternary': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
