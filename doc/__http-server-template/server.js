const http = require('http');
const fs = require('fs');
const path = require('path');

let httpServer = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, './test.json'), (err, data) => {
            if (err) {
                console.log('====================================');
                console.log(err);
                console.log('====================================');
                res.end('Interal Server Error');
            } else {
                let titles = JSON.parse(data.toString());
                fs.readFile(path.join(__dirname, './tempalte.html'), (err, data) => {
                    if (err) {
                        console.log('====================================');
                        console.log(err);
                        console.log('====================================');
                        res.end('Template parse Error');
                    } else {
                        let tmp = data.toString();
                        let html = tmp.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                });
            }
        });
    }
});

httpServer.listen(9006);