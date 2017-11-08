const connect = require("connect");
const cookieParse = require("cookie-parser");
const session = require("express-session");

const http = require("http");
const app = connect();
const RedisStore = require("connect-redis")(session);
let option = {
  host: "localhost",
  port: 6379
};

app
  .use(cookieParse("luna"))
  .use(
    session({
      store: new RedisStore(option),
      secret: "keyboard cat"
    })
  )
  .use((req, res) => {
    let _s = req.session;
    _s.view = 1;
    _s.save();
    console.log(req.cookies);
    console.log(req.signedCookies);
    console.log(_s);
    res.setHeader("Set-Cookie", "foo=bar");
    res.setHeader(
      "Set-Cookie",
      "tobi=ferret; ExPires=Tue, 01 Jun 2020 10:10:10 GMT"
    );
    res.end("hello\n");
  });

http.createServer(app).listen(9008);
