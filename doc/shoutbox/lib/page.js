module.exports = (fn, perpage = 10) => {
  return function (req, res, next) {
    let page = Math.max(
      parseInt(req.param('page') || '1', 10),
      1
    ) - 1;
  }
}