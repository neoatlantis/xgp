const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env)=>{

    const is_dev = (env.production === undefined);
    const output_path = path.resolve(__dirname, is_dev?'dev':'dist');


    return [
        {
            entry: './xgp/index.js',
            mode: is_dev?'development':'production',
            watch: true,
            output: {
                filename: 'xgp.js',
                path: output_path,
            },
            resolve: {
                alias: {
                    xgp: path.resolve(__dirname, "xgp"),
                    sfc: path.resolve(__dirname, "xgp", "vue"),
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
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    // enable CSS Modules
                                    modules: true,
                                }
                            }
                        ],
                    },
                    {
                        resourceQuery: /blockType=i18n/,
                        type: 'javascript/auto',
                        loader: '@intlify/vue-i18n-loader'
                    }
                ]
            },
            plugins: [
                new VueLoaderPlugin(),
                new HtmlWebpackPlugin({
                    template: "./xgp/index.html",
                }),
                new CopyPlugin({
                    patterns: [
                        {
                            from: "./xgp/static/",
                            to: path.join(output_path, "static"),
                        }
                    ]
                }),
                new CspHtmlWebpackPlugin({
                    'script-src': '',
                    'style-src': '',
                }, {
                    enabled: false, // TODO !is_dev,

                    policy: {
                        'script-src': [
                            'self',
                        ],
                        'style-src': [
                            'unsafe-inline',
                            'self',
                        ]
                    },

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
