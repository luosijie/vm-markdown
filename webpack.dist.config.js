const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const rules = require('./webpack.config.rules')

module.exports = {
    entry: './src/components/vm-markdown/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'vm_markdown.min.js',
        library: 'vm-markdown',
        libraryTarget: 'umd'
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules
    }
}
