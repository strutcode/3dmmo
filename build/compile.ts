import HtmlWebpackPlugin from 'html-webpack-plugin'
import { webpack } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

const compiler = webpack({
  mode: 'development',
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
    extensions: ['.js', '.json', '.ts'],
  },
})

const devServer = new WebpackDevServer(
  {
    port: 13000,
  },
  compiler,
)

devServer.start()
