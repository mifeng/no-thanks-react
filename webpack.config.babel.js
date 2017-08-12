import webpack from 'webpack';
import path from 'path';

const config = {
  entry: './client/src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'static/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules', 'lib', 'inclue', 'bin'],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-2'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // devtool: 'eval-source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, 'static'),
  //   port: 1337,
  //   overlay: {
  //     warnings: true,
  //     errors: true,
  //   },
  //   hot: true,
  // },
};

export default config;
