const request = require('request'),
htmlparser = require('htmlparser'),
fs = require('fs'),
path = require('path'),
configFilename = './rss_feeds.txt',
ROOT = __dirname;

let tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed ];

function checkForRSSFile() {
  let _file_path = path.resolve(ROOT, configFilename);
  fs.stat(_file_path, (err, stat) => {
    if (err) {
      return next(new Error('Miss RSS file: ' + configFilename));
    }
    next(null, _file_path);
  });
}

function readRSSFile(configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) return next(err);
    feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');
    let random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  })
}

function downloadRSSFeed(feedUrl) {
  request(feedUrl, (err, res, body) => {
    if (err) return next(err);
    if (res.statusCode !== 200) {
      return next(new Error('Abnormal response status code'))
    }
    next(null, body);
  });
}

function parseRSSFeed(rss) {
  let handler = new htmlparser.RssHandler();
  let parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);

  if (!handler.dom.items.length) return next(new Error('No RSS items found'))
  let item = handler.dom.items.shift();
  console.log('====================================');
  console.log(item.title, item.link);
  console.log('====================================');
}

function next(err, result) {
  if (err) throw err;
  let currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}

next();