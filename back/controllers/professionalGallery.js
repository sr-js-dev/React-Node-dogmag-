const ProfessionalGallery = require('../models/professionalGallery');
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const fs = require('fs');

exports.professionalById = async (req, res, next, professionalId) => {
  console.log('check exists gallery');
  const gallery = await ProfessionalGallery.findOne({
    professional: professionalId
  });
  if (!gallery)
    return res.status(400).json({
      error: 'לבעל מקצוע אין תמונות'
    });

  req.gallery = gallery;
  next();
};

exports.read = (req, res) => {
  return res.json(req.gallery);
};

exports.read2 = (req, res) => {
  return res.json(req.gallery.numberOfImages);
};

exports.addAndUpdateImages = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }
    console.log('try to add image');

    const user = req.profile;
    const gallery = req.gallery;

    let tempGallery = {};
    let newGallery = {};

    if (gallery) {
      newGallery = gallery;
    } else {
      tempGallery.professional = user._id;
      newGallery = new ProfessionalGallery(tempGallery);
    }
    console.log('profilre: ', newGallery);
    if (
      user.role === 2 &&
      newGallery.professional.toString() !== user.id.toString()
    ) {
      return res.status(403).json({
        error: 'Professional Private resourse! Access denied'
      });
    }

    if (files.photo1) {
      if (files.photo1.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      newGallery.g1.data = fs.readFileSync(files.photo1.path);
      newGallery.g1.contentType = files.photo1.type;
      newGallery.g1.haveImage = true;
    }

    if (files.photo2) {
      if (files.photo2.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      newGallery.g2.data = fs.readFileSync(files.photo2.path);
      newGallery.g2.contentType = files.photo2.type;
      newGallery.g2.haveImage = true;
    }

    if (files.photo3) {
      if (files.photo3.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      newGallery.g3.data = fs.readFileSync(files.photo3.path);
      newGallery.g3.contentType = files.photo3.type;
      newGallery.g3.haveImage = true;
    }

    if (files.photo4) {
      if (files.photo4.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      newGallery.g4.data = fs.readFileSync(files.photo4.path);
      newGallery.g4.contentType = files.photo4.type;
      newGallery.g4.haveImage = true;
    }
    if (files.photo5) {
      if (files.photo5.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      newGallery.g5.data = fs.readFileSync(files.photo5.path);
      newGallery.g5.contentType = files.photo5.type;
      newGallery.g5.haveImage = true;
    }

    if (files.photo6) {
      if (files.photo6.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      newGallery.g6.data = fs.readFileSync(files.photo6.path);
      newGallery.g6.contentType = files.photo6.type;
      newGallery.g6.haveImage = true;
    }

    if (files.photo7) {
      if (files.photo7.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      newGallery.g7.data = fs.readFileSync(files.photo7.path);
      newGallery.g7.contentType = files.photo7.type;
      newGallery.g7.haveImage = true;
    }

    if (files.photo8) {
      if (files.photo8.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }

      newGallery.g8.data = fs.readFileSync(files.photo8.path);
      newGallery.g8.contentType = files.photo8.type;
      newGallery.g8.haveImage = true;
    }

    let count = 0;
    if (newGallery.g1.haveImage === true) count++;
    if (newGallery.g2.haveImage === true) count++;
    if (newGallery.g3.haveImage === true) count++;
    if (newGallery.g4.haveImage === true) count++;
    if (newGallery.g5.haveImage === true) count++;
    if (newGallery.g6.haveImage === true) count++;
    if (newGallery.g7.haveImage === true) count++;
    if (newGallery.g8.haveImage === true) count++;
    newGallery.numberOfImages = count;

    const check = await newGallery.save();
    if (check) {
      return res.json(check);
    } else {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
  });
};

exports.g1 = (req, res, next) => {
  if (req.gallery.g1.data) {
    res.set('Content-Type', req.gallery.g1.contentType);
    return res.send(req.gallery.g1.data);
  }
  next();
};

exports.g2 = (req, res, next) => {
  if (req.gallery.g2.data) {
    res.set('Content-Type', req.gallery.g2.contentType);
    return res.send(req.gallery.g2.data);
  }
  next();
};
exports.g3 = (req, res, next) => {
  if (req.gallery.g3.data) {
    res.set('Content-Type', req.gallery.g3.contentType);
    return res.send(req.gallery.g3.data);
  }
  next();
};
exports.g4 = (req, res, next) => {
  if (req.gallery.g4.data) {
    res.set('Content-Type', req.gallery.g4.contentType);
    return res.send(req.gallery.g4.data);
  }
  next();
};
exports.g5 = (req, res, next) => {
  if (req.gallery.g5.data) {
    res.set('Content-Type', req.gallery.g5.contentType);
    return res.send(req.gallery.g5.data);
  }
  next();
};
exports.g6 = (req, res, next) => {
  if (req.gallery.g6.data) {
    res.set('Content-Type', req.gallery.g6.contentType);
    return res.send(req.gallery.g6.data);
  }
  next();
};

exports.g7 = (req, res, next) => {
  if (req.gallery.g7.data) {
    res.set('Content-Type', req.gallery.g7.contentType);
    return res.send(req.gallery.g7.data);
  }
  next();
};
exports.g8 = (req, res, next) => {
  if (req.gallery.g8.data) {
    res.set('Content-Type', req.gallery.g8.contentType);
    return res.send(req.gallery.g8.data);
  }
  next();
};
