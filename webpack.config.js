const path = require("path");
const ROOT = __dirname;

module.exports = {
  entry: "./public/src/chat_ui.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/dist") ///Users/tab/Documents/Self-Project/chatroom/public/dist
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  }
};
