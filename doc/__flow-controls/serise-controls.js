const request = require('request'),
htmlparser = require('htmlparser'),
fs = require('fs'),
path = require('path'),
configFilename = './rss_feeds.txt',
ROOT = __dirname;

let tasks = [checkForRSSFile/*, readRSSFile, downloadRSSFeed, parseRSSFeed */];

function checkForRSSFile() {
  fs.stat(configFilename, (status) => {
    if (!status) {
      return next(new Error('Miss RSS file: ' + configFilename));
    }
    next(null, configFilename);
  });
}

function next(err, result) {
  if (err) throw err;
  let currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}

checkForRSSFile();