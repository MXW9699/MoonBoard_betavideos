const path = require('path');
const HTMLwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //switch between production and development
  mode: process.env.NODE_ENV,
  //entry point for loading all the files
  entry: ['./client/index.js'],

  //location to create the bundle.js file that will contain the consolidated application
  output: {
    //location will be the build folder created in the root
    path: path.join(__dirname, 'build'),
    //bundle.js will be the name
    filename: 'bundle.js',
  },
  //setup development server
  devServer: {
    //listen on port 8080
    port: 8080,
    static: { directory: path.join(__dirname, 'build'), publicPath: '/build/' },
    //set up proxies
    proxy: {
      '/login': 'http://localhost:3000',
      '/data': 'http://localhost:3000',
      '/profile': 'http://localhost:3000',
      '/video/': 'http://localhost:3000',
      '/**': 'http://localhost:3000',
    },
  },

  //template to follow when creating the webserver for dev enviroment
  plugins: [new HTMLwebpackPlugin({ template: './bundle/index.html' })],

  module: {
    //module rules for transpiling and compliling
    rules: [
      //rules to transpile js and jsx files
      {
        test: /.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              //changes es6 format of js files to es5
              ['@babel/preset-env', { targets: 'defaults' }],
              //transpile jsx to js
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      //typescript to js/jsx
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      //rules to change sass files to css to strings that will be injected into the html body
      {
        test: /\.s?css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
};
