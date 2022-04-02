const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: 'development',
    entry: {
        main: ["./src/index.js",
            "./src/scss/main.scss"],
        grapesjs: ["./node_modules/grapesjs/dist/css/grapes.min.css"]
    },
    devServer: {
        static: './dist'
    },
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}