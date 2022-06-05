const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const output_path = path.resolve(__dirname, 'dist');

module.exports = [
    {
        entry: './xgp/index.js',
        mode: 'development',
        output: {
            filename: 'xgp.js',
            path: output_path,
        },
        resolve: {
            alias: {
                xgp: path.resolve(__dirname, "xgp"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin()
        ]
    },
];

