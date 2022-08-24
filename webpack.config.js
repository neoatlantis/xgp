const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

module.exports = (env)=>{

    const is_dev = (env.production === undefined);
    const output_path = path.resolve(__dirname, is_dev?'dev':'dist');


    return [
        {
            entry: './xgp/index.js',
            mode: is_dev?'development':'production',
            watch: is_dev,
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
                    },
                    {
                        test: /\.(vue|js)$/,
                        loader: 'ifdef-loader',
                        exclude: /node_modules/,
                        options: {
                            DEV: is_dev,
                        }
                    }
                ]
            },
            plugins: [
                new VueLoaderPlugin(),
                new HtmlWebpackPlugin({
                    template: "./xgp/index.html",
                }),
                new CspHtmlWebpackPlugin({
                    'script-src': '',
                    'style-src': ''
                }, {
                    enabled: !is_dev,

                    hashingMethod: 'sha256',
                    hashEnabled: {
                        'script-src': true,
                        'style-src': true,
                    },
                })
            ]
        },
    ];

}; 
