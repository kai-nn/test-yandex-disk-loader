import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from "html-webpack-plugin"
import 'webpack-dev-server'
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {
    mode: 'development',
    // mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin(
        	{template: path.resolve(__dirname, 'public', 'index.html')}
        ),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),

    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader', // for development
                    // MiniCssExtractPlugin.loader, // for production

                    // Translates CSS into CommonJS
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },

                    // Compiles Sass to CSS
                    "sass-loader",
                ],
             },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    devtool: 'inline-source-map',

    devServer: {
        port: 3000,
        open: true,
    }

}

export default config