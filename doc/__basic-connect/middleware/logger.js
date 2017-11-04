function setup(format) {
  let regexp = /:(\w+)/g;
  return function logger(req, res, next) {
    let str = format.replace(regexp, (match, property) => {
      return req[property];
    });
    console.log(str);
    next();
  };
}

module.exports = setup;
