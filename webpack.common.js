const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SRC_DIR = path.resolve(__dirname, 'src/view');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const VENDOR_LIBS = [
  'axios',
  'moment',
  'react',
  'react-dom',
  'react-loadable',
  // 'bootstrap',
  'jquery',
  'react-router',
  'react-router-dom',
  // 'recompose',
];

module.exports = {
  entry: {
    bundle: path.join(SRC_DIR, 'index.tsx'),
    vendor: VENDOR_LIBS,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: ['/node_modules/', '/build/', '/blueprint-templates', '/dist'],
      },
      {
        /*bien dich soure map sang ts*/
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        // generator: {
        //   filename: 'asset/[hash][ext][query]'
        // }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'asset/[hash][ext][query]',
        },
      },
      {
        test: /\.(pdf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.html',
      // favicon: SRC_DIR + '/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id]-[chunkhash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/shared/assets/images', to: 'src/shared/assets/images' }],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TsConfigPathsPlugin(/* { tsconfig, compiler } */)],
    // alias: {
    //     "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js"),
    // }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[chunkhash].[chunkhash].js',
    chunkFilename: '[chunkhash].bundle.js',
    publicPath: '/',
  },
};
