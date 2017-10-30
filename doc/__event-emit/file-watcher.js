/**
 * - creating a class constructor
 * - inheritring the event emitter's behavior
 * - extending the behavior
 * 
 *  **NOTICES**
 * fs.readdir uses `process.cwd` as start point
 * while `require` uses `__dirname`.
 * 
 * **NOTICES**
 * arrow function will lost the `this` reference.
 */
const events = require("events"),
  util = require("util"),
  fs = require('fs'),
  watchDir = './watch',
  processedDir = './dist',
  path = require('path'),
  ROOT = __dirname;

function Watch(watchDir, processedDir) {
  this.watchDir = path.resolve(ROOT, watchDir);
  this.processedDir = path.resolve(ROOT, processedDir);
}

util.inherits(Watch, events.EventEmitter);
// Watch.prototype = new events.EventEmitter();

Watch.prototype.watch = function() {
  let watcher = this;
  fs.readdir(this.watchDir, (err, files) => {
    if (err) throw err;
    for (let index in files) {
      watcher.emit('process', files[index]);
    }
  });
};

Watch.prototype.start = function () {
  let watcher = this;
  fs.watchFile(watchDir, () => {
    watcher.watch();
  });
};

let watcher = new Watch(watchDir, processedDir);

watcher.on('process', function (file)  {
  let watchFile = this.watchDir + '/' + file;
  let processedFile = this.processedDir + '/' + file.toLowerCase();

  fs.rename(watchFile, processedFile, (err) => {
    if (err) throw err;
  });
});

watcher.start();
