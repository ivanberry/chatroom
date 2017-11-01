const formidable = require("formidable");
const path = require("path");

module.exports = upload;

/**
 * @param {*} req 
 * @param {*} res 
 */
function upload(req, res) {
  if (!isFormData) {
    res.statusCode = 400;
    res.end("Bad Request: expecting multipart/form-data");
    return void 0;
  }

  let form = new formidable.IncomingForm(); //create formidable instance
  form.uploadDir = path.resolve(__dirname, "../upload");
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    console.log(fields),
    console.log(files);
    res.end('upload completed');
  }); //parse req object
}

function isFormData(req) {
  let type = req.headers["Conent-Type"] || "";
  return 0 === type.indexOf("multipart/form-data");
}
