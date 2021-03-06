const connect = require("connect");
const app = connect();
const router = require("./middleware/router");

const routes = {
  GET: {
    "/users": (req, res) => {
      res.end("tobi, loi, ferret");
    },
    "/user/:id": (req, res, id) => {
      res.end("user " + id);
    }
  },
  POST: {
    "/user/:id": (req, res, id) => {
      res.end("deleted user " + id);
    }
  }
};

app
  .use(router(routes))
  .listen(9006, () => console.log("Server listen on 9006"));

