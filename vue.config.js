process.env.VUE_APP_VERSION = require("./package.json").version;

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const { VUE_APP_BACKEND_API, VUE_APP_BASE_URL, NODE_ENV } = process.env;

const isDevelopment = NODE_ENV === "development";

const plugins = [];

if (isDevelopment) {
    plugins.push(
        new ForkTsCheckerWebpackPlugin(),
    );
};

module.exports = {
    publicPath: VUE_APP_BASE_URL,
    devServer: {
        overlay: {
            errors: true,
        },
        proxy: {
            "^/api": {
                target: VUE_APP_BACKEND_API,
                pathRewrite: {
                    "^/api": "",
                },
                changeOrigin: true,
            },
        },
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: "vue-template-loader",
                    exclude: /index.html/,
                },
            ],
        },
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            },
        },
        output: {
            filename: "[name].[hash:8].js",
            chunkFilename: "[name].[hash:8].js",
        },
        plugins,
    },
    pluginOptions: {
        quasar: {
            importStrategy: "kebab",
            rtlSupport: true,
        },
    },
    productionSourceMap: false,
    transpileDependencies: [
        "quasar",
    ],
};
