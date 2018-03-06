// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    'rules': {
        // 0关闭，1警告，2错误
        "new-cap": 0,
        // 关闭 debugger校验
        "no-debugger": 2,
        // 强制文件末尾换行
        "eol-last": 0,
        // 关闭缩进校验
        'indent': 0,
        // 必须结束分号
        "semi": [1, "always"],
        // 关闭函数名后空格
        "space-before-function-paren": 0,
        // 有未使用已经定义的变量或者常量定义
        "no-unused-vars": 1,

        "space-unary-ops": 0,

        "quotes": 1,

        "padded-blocks": 1,

        // 三元表达式
        "no-unneeded-ternary": 0,

        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
