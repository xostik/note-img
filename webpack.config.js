const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'cheap-source-map',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }
            }, {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
};