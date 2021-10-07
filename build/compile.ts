import { webpack } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const compiler = webpack({
  mode: 'development',
  target: 'web',
  entry: './game/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './game/template.html',
      inject: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.wasm'],
    fallback: {
      path: false,
      fs: false,
    },
  },
  output: {
    publicPath: '/',
  },
  devtool: 'inline-source-map',
})

const devServer = new WebpackDevServer(
  {
    port: 13000,
    hot: true,
    static: './assets',
  },
  compiler as any,
)

devServer.start()
