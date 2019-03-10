module.exports = [
    {
        test: /\.vue$/,
        use: {
            loader: 'vue-loader'
        }
    },
    {
        test: /\.css$/,
        use: [
            'vue-style-loader',
            'style-loader',
            'css-loader'
        ]
    },
    {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    },
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    {
        test: /\.(woff|svg|eot|ttf|otf)(\?.*)?$/,
        use: [{
            loader: 'url-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    }
]

