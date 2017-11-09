const express = require("express");
const router = express.Router();

const Photo = require("../models/Photo");
const path = require("path");
const fs = require("fs");
const join = path.join;

let photos = [];
photos.push({
  name: "Node.js Logo",

  path: "http://nodejs.org/images/logos/nodejs-green.png"
});

photos.push({
  name: "Ryan Speaking",
  path: "http://nodejs.org/images/ryan-speaker.jpg"
});

router.get("/", function(req, res, next) {
  res.render("photos", {
    title: "photos",
    photos: photos
  });
});

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

exports.submit = dir => {
  return function(req, res, next) {
    let img = req.files.photo.image;
    let name = req.body.photo.name || image.name;
    let path = join(dir, img.name);

    fs.rename(img.path, path, err => {
      if (err) return next(err);

      Photo.create(
        {
          name: name,
          path: img.name
        },
        err => {
          if (err) return next(err);
          res.redirect("/");
        }
      );
    });
  };
};

// module.exports = router;
