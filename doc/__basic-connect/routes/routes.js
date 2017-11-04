const routes = {
  GET: {
    "/users": (req, res) => {
      res.end("tobi, loi, ferret");
    },
    "/user/:id": (req, res) => {
      res.end("user " + id);
    }
  },
  POST: {
    "/user/:id": (req, res, id) => {
      res.end("deleted user " + id);
    }
  }
};

exports.default = routes;