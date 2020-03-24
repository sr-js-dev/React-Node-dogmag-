const District = require('../models/district');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.districtById = (req, res, next, id) => {
  District.findById(id).exec((err, district) => {
    if (err || !district) {
      return res.status(400).json({
        error: 'district does not exist'
      });
    }
    req.district = district;
    next();
  });
};

exports.create = (req, res) => {
  const district = new District(req.body);
  district.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.district);
};

exports.update = (req, res) => {
  const district = req.district;
  district.disName = req.body.disName;
  district.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const district = req.district;
  district.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: 'district deleted'
    });
  });
};

exports.list = (req, res) => {
  District.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};
