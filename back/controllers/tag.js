const Tag = require('../models/tag');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.tagById = (req, res, next, id) => {
  Tag.findById(id).exec((err, t) => {
    if (err || !t) {
      return res.status(400).json({
        error: 'Tag does not exist'
      });
    }
    req.tag = tag;
    next();
  });
};

exports.create = (req, res) => {
  const tag = new Tag(req.body);
  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.tag);
};

exports.update = (req, res) => {
  const tag = req.tag;
  tag.tagName = req.body.tagName;
  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const tag = req.tag;
  tag.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: 'Tag deleted'
    });
  });
};

exports.list = (req, res) => {
  Tag.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};
