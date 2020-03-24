const Profession = require('../models/profession');
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const fs = require('fs');

exports.professionById = (req, res, next, id) => {
  Profession.findById(id).exec((err, profession) => {
    if (err || !profession) {
      return res.status(400).json({
        error: 'profession does not exist'
      });
    }
    req.profession = profession;
    next();
  });
};

// exports.create = (req, res) => {
//   const profession = new Profession(req.body);
//   profession.save((err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler(err)
//       });
//     }
//     res.json({ data });
//   });
// };

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }
    const { professionName } = fields;
    let profession = new Profession(fields);
    console.log('pro: ', profession);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      profession.photo.data = fs.readFileSync(files.photo.path);
      profession.photo.contentType = files.photo.type;
    }

    if (files.photog) {
      if (files.photog.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      profession.photog.data = fs.readFileSync(files.photog.path);
      profession.photog.contentType = files.photog.type;
    }
    profession.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json({ data });
    });
  });
};

exports.photo = (req, res, next) => {
  if (req.profession.photo.data) {
    res.set('Content-Type', req.profession.photo.contentType);
    return res.send(req.profession.photo.data);
  }
  next();
};

exports.photog = (req, res, next) => {
  if (req.profession.photog.data) {
    res.set('Content-Type', req.profession.photog.contentType);
    return res.send(req.profession.photog.data);
  }
  next();
};

exports.read = (req, res) => {
  return res.json(req.profession);
};

exports.update = (req, res) => {
  const profession = req.profession;
  profession.professionName = req.body.professionName;
  profession.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const profession = req.profession;
  profession.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: 'profession deleted'
    });
  });
};

exports.list = (req, res) => {
  Profession.find()
    .select('-photo')
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(data);
    });
};
