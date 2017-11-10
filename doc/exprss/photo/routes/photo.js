const Photo = require("../models/Photo");
const path = require("path");
const fs = require("fs");
const join = path.join;

/**
 * handle post request
 * save files as file
 * redirect to upload index
 * show all images
 */

exports.form = (req, res) => {
  res.render("photos/upload", {
    title: "Upload"
  });
};

exports.list = (req, res, next) => {
  Photo.find({}, (err, photos) => {
    if (err) return next(err);
    res.render("photos", {
      title: "Uploaded photos",
      photos: photos
    });
  });
};

exports.submit = dir => {
  return function(req, res, next) {
    let file = req.file;
    let name = req.body.name;
    let nameWithExt = `${file.filename}.${file.mimetype.split("/")[1]}`;
    let path = file.path;
    let destination = file.destination;

    fs.rename(path, destination + '/' + nameWithExt, err => {
      if (err) return next(err);

      Photo.create(
        {
          name: name,
          fileName: nameWithExt
        },
        err => {
          if (err) return next(err);
          res.redirect("/showUpload");
        }
      );
    });
  };
};

// module.exports = router;
