const ProfessionalProfile = require('../models/professionalProfile');
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const fs = require('fs');
const District = require('../models/district');
const Profession = require('../models/profession');
const Calendar = require('../models/calendar');
const https = require('https');
const request = require('request');
const axios = require('axios');

exports.professionalById = async (req, res, next, professionalId) => {
  const profile = await ProfessionalProfile.findOne({
    user: professionalId
  });

  if (!profile)
    return res.status(400).json({
      error: 'professional dont have profile'
    });
  req.professionalprofile = profile;
  next();
};

exports.create = async (req, res) => {
  const { companyId, companyName, professionsSelected } = req.body;
  const { professions } = professionsSelected;

  //check if company have a profile
  const exist = await ProfessionalProfile.findOne({ user: companyId });
  if (exist)
    return res.status(401).json({
      error: 'user have already profile'
    });

  //change user to professional
  const u = await User.findById(companyId);
  console.log('user:', u);
  if (u) {
    u.role = 2;
    await u.save();
  } else {
    return res.status(400).json({
      error: 'wrong professioanl id'
    });
  }
  console.log('build profile');
  //build profile object
  let profileFields = {};
  profileFields.user = companyId;
  console.log('new profile companyid: ', profileFields);
  profileFields.companyName = companyName;
  console.log('new profile companyname: ', profileFields);

  const profile = new ProfessionalProfile(profileFields);
  console.log('new profile: ', profile);
  professions.map(pro => {
    profile.companyProfession.unshift(pro);
  });
  console.log('add profession', profile);
  const newProfile = await profile.save();
  if (newProfile) {
    return res.json({ newProfile });
  } else {
    return res.status(400).json({
      error: errorHandler(err)
    });
  }
};

exports.addArea = async (req, res) => {
  try {
    const profile = req.professionalprofile;
    const user = req.profile;

    if (user.role === 2 && profile.user.toString() !== user.id.toString()) {
      return res.status(403).json({
        error: 'Professional Private resourse! Access denied'
      });
    }
    const { areaSelected } = req.body;
    const { a } = areaSelected;

    a.map(d => {
      profile.worksArea.unshift(d);
    });

    console.log('profile', profile);

    await profile.save();
    res.json(profile.worksArea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.removeArea = async (req, res) => {
  try {
    const profile = req.professionalprofile;
    const areaId = req.params.district_id;
    const user = req.profile;

    if (user.role === 2 && profile.user.toString() !== user.id.toString()) {
      return res.status(403).json({
        error: 'Professional Private resourse! Access denied'
      });
    }

    const removeIndex = profile.worksArea
      .map(area => area.id.toString())
      .indexOf(areaId);
    profile.worksArea.splice(removeIndex, 1);
    await profile.save();
    res.json(profile.worksArea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addComment = async (req, res) => {
  try {
    const profile = req.professionalprofile;
    const user = req.profile;

    const { comment, score } = req.body;

    const newComment = {
      text: comment,
      name: user.name,
      user: user.id,
      score: score,
      imageUrl: user.imageUrl
    };

    console.log('professional:', profile);
    console.log('user: ', user);

    //check if the user comment before on this profile
    if (profile.comments && profile.comments.length) {
      let checkUser = false;

      for (let i = 0; i < profile.comments.length; i++) {
        if (profile.comments[i].user.toString() === user._id.toString())
          checkUser = true;
      }

      if (checkUser) {
        return res.status(403).json({
          error: 'משתמש יכול להגיב רק פעם אחת לבעל מקצוע'
        });
      }
    }

    const starTotal = 5;
    profile.comments.unshift(newComment);
    if (profile.comments.length === 1) {
      profile.avgRating = score;
      profile.numOfComments++;
    } else {
      const avg =
        (profile.avgRating * profile.numOfComments + score) /
        (profile.numOfComments + 1);
      const avgPercentage = (avg / starTotal) * 100;
      const avgPercentageRounded = `${Math.round(avgPercentage / 10) * 10}`;
      const avgSmall = avgPercentageRounded / 20;
      profile.avgRating = avgSmall;

      profile.numOfComments++;
    }

    await profile.save();
    res.json(profile.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.removeComment = async (req, res) => {
  try {
    const profile = req.professionalprofile;
    const user = req.profile;
    const commentId = req.params.comment_id;

    const comment = profile.comments.find(comment => comment.id === commentId);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== user.id.toString()) {
      return res.status(404).json({ msg: 'User not authorized' });
    }

    const removeIndex = profile.comments
      .map(comment => comment.user.toString())
      .indexOf(user.id);
    profile.comments.splice(removeIndex, 1);
    await profile.save();
    res.json(profile.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.logo = (req, res, next) => {
  if (req.professionalprofile.mainPhoto.data) {
    res.set('Content-Type', req.professionalprofile.mainPhoto.contentType);
    return res.send(req.professionalprofile.mainPhoto.data);
  }
  next();
};

exports.read = (req, res) => {
  return res.json(req.professionalprofile);
};

exports.update = async (req, res) => {
  try {
    const profile = req.professionalprofile;
    const user = req.profile;

    if (user.role === 2 && profile.user.toString() !== user.id.toString()) {
      return res.status(403).json({
        error: 'Professional Private resourse! Access denied'
      });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not be uploaded'
        });
      }

      const {
        companyName,
        profession,
        phone,
        city,
        street,
        number,
        zipcode,
        website,
        rexipro
      } = fields;

      if (companyName) profile.companyName = companyName;
      if (profession) profile.profession = profession;
      if (phone) profile.phone = phone;
      if (website) profile.website = website;
      if (rexipro) profile.rexiPro = rexipro;

      let key = '&key=AIzaSyCJKkq5fQdA0OWZuWit11ppWltRJiH2ozk';

      //location object
      if (city) profile.location.city = city;
      if (street) profile.location.street = street;
      if (number) profile.location.number = number;
      if (zipcode) profile.location.zipcode = zipcode;

      let uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${street},+${city}+${key}`;
      let latlongdata = await axios.get(encodeURI(uri));
      let latitude = latlongdata.data.results[0].geometry.location.lat;
      let longitude = latlongdata.data.results[0].geometry.location.lng;

      if (longitude) {
        console.log(
          'profile.location.geo.coordinates[0] ',
          profile.location.geo.coordinates[0]
        );
        if (profile.location.geo.coordinates[0]) {
          profile.location.geo.coordinates[0] = longitude;
        } else {
          profile.location.geo.coordinates.push(longitude);
        }

        profile.location.geo.type = 'Point';
      }
      if (latitude) {
        console.log(
          'profile.location.geo.coordinates[1] ',
          profile.location.geo.coordinates[1]
        );
        if (profile.location.geo.coordinates[1]) {
          profile.location.geo.coordinates[1] = latitude;
        } else {
          profile.location.geo.coordinates.push(latitude);
        }
      }
      //update logo
      if (files.mainPhoto) {
        if (files.mainPhoto.size > 1000000) {
          return res.status(400).json({
            error: 'Image should be less than 1mb in size'
          });
        }
        profile.mainPhoto.data = fs.readFileSync(files.mainPhoto.path);
        profile.mainPhoto.contentType = files.mainPhoto.type;
      }

      const updateProfile = profile.save();

      if (updateProfile) res.json({ data: profile, status: 200 });
      else res.json({ message: 'not update', status: 400 });
    });
  } catch (err) {
    console.error(err.message);
    res.send({ message: 'Server Error', status: 500 });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const profile = req.professionalprofile;
    const user = req.profile;

    if (user.role === 2 && profile.user.toString() !== user.id.toString()) {
      return res.status(403).json({
        error: 'Professional Private resourse! Access denied'
      });
    }

    const { about, facebook, Arabic, English, Handicap } = req.body;

    if (about) profile.about = about;
    if (facebook) profile.facebook = facebook;
    if (Arabic) profile.Arabic = Arabic;
    if (English) profile.English = English;
    if (Handicap) profile.Handicap = Handicap;

    const updateProfile = profile.save();

    if (updateProfile) res.json({ data: profile, status: 200 });
    else res.json({ message: 'not update', status: 400 });
  } catch (err) {
    console.error(err.message);
    res.send({ message: 'Server Error', status: 500 });
  }
};

exports.remove = (req, res) => {
  const pro = req.professional;
  pro.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: 'professional deleted'
    });
  });
};

exports.list = (req, res) => {
  ProfessionalProfile.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

const handleUserFilterRexiPro = (data, filter) => {
  let newData;
  if (filter.rexiPro) {
    newData = data.filter(d => d.rexiPro === true);
    return newData;
  }
  return data;
};

const handleUserFilterArabic = (data, filter) => {
  console.log('data: ', data, ' filter: ', filter);
  let newData;
  if (filter.arabic) {
    newData = data.filter(d => d.Arabic === true);
    console.log('new data rexi pro: ', newData);
    return newData;
  }
  return data;
};

const handleUserFilterEnglish = (data, filter) => {
  console.log('data: ', data, ' filter: ', filter);
  let newData;
  if (filter.english) {
    newData = data.filter(d => d.English === true);
    console.log('new data rexi pro: ', newData);
    return newData;
  }
  return data;
};

const handleUserFilterHandicap = (data, filter) => {
  console.log('data: ', data, ' filter: ', filter);
  let newData;
  if (filter.handicap) {
    newData = data.filter(d => d.Handicap === true);
    console.log('new data rexi pro: ', newData);
    return newData;
  }
  return data;
};

const handleUserFilterComment = (data, filter) => {
  console.log('data: ', data, ' filter: ', filter);
  let newData;

  if (filter.comment) {
    newData = data.filter(d => d.comments.length > 0);
    console.log('new data comment: ', newData);
    return newData;
  }

  return data;
};

const handleUserFilterNight = async (data, filter) => {
  console.log('data: ', data, ' filter: ', filter);
  let newData = [];
  if (filter.openAtNight) {
    for (let i = 0; i < data.length; i++) {
      console.log('user id: ', data[i].user);
      let userCalender = await Calendar.findOne({
        professional: data[i].user
      });
      console.log('user calendar:', userCalender);
      if (
        userCalender.sunday &&
        (Number(userCalender.sunday.closeCalcA) > 2200 ||
          Number(userCalender.sunday.openCalcA) < 1)
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.sunday &&
        userCalender.sunday.closeCalcB &&
        Number(userCalender.sunday.closeCalcB) > 2200
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.monday &&
        (Number(userCalender.monday.closeCalcA) > 2200 ||
          Number(userCalender.monday.openCalcA) < 1)
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.monday &&
        userCalender.monday.closeCalcB &&
        Number(userCalender.monday.closeCalcB) > 2200
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.tuesday &&
        (Number(userCalender.tuesday.closeCalcA) > 2200 ||
          Number(userCalender.tuesday.openCalcA) < 1)
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.tuesday &&
        userCalender.tuesday.closeCalcB &&
        Number(userCalender.tuesday.closeCalcB) > 2200
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.wednesday &&
        (Number(userCalender.wednesday.closeCalcA) > 2200 ||
          Number(userCalender.wednesday.openCalcA) < 1)
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.wednesday &&
        userCalender.wednesday.closeCalcB &&
        Number(userCalender.wednesday.closeCalcB) > 2200
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.thursday &&
        (Number(userCalender.thursday.closeCalcA) > 2200 ||
          Number(userCalender.thursday.openCalcA) < 1)
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.thursday &&
        userCalender.thursday.closeCalcB &&
        Number(userCalender.thursday.closeCalcB) > 2200
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.friday &&
        (Number(userCalender.friday.closeCalcA) > 2200 ||
          Number(userCalender.friday.openCalcA) < 1)
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.friday &&
        userCalender.friday.closeCalcB &&
        Number(userCalender.friday.closeCalcB) > 2200
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.saturday &&
        (Number(userCalender.saturday.closeCalcA) > 2200 ||
          Number(userCalender.saturday.openCalcA) < 1)
      ) {
        newData.unshift(data[i]);
      } else if (
        userCalender.saturday &&
        userCalender.saturday.closeCalcB &&
        Number(userCalender.saturday.closeCalcB) > 2200
      ) {
        newData.unshift(data[i]);
      }
    }
    return newData;
  }
  return data;
};

const handleUserFilterSaturday = async (data, filter) => {
  let newData = [];
  if (filter.openOnSaturday) {
    for (let i = 0; i < data.length; i++) {
      console.log('user id: ', data[i].user);
      let userCalender = await Calendar.findOne({
        professional: data[i].user
      });
      if (
        userCalender.saturday &&
        Number(userCalender.saturday.openCalcA) >= 0 &&
        Number(userCalender.saturday.closeCalcA) <= 2400
      ) {
        newData.unshift(data[i]);
      }
    }
    return newData;
  }
  return data;
};

exports.listBySearch = async (req, res) => {
  let data = [];

  console.log('1');
  console.log('body:', req.body);
  console.log('check: ', req.body.companyProfession);
  console.log('check1', req.body.worksArea);
  console.log('check2', req.body.rexiPro);
  console.log('check3', req.body.comment);
  console.log('check4', req.body.openAtNight);
  console.log('check5', req.body.openOnSaturday);
  console.log('check6', req.body.arabic);
  console.log('check7', req.body.english);
  console.log('check8', req.body.handicap);

  //if we don't have a district filter and profession type
  if (
    (!req.body.companyProfession && !req.body.worksArea) ||
    (Object.keys(req.body.companyProfession).length == 0 &&
      req.body.worksArea.length === 0)
  ) {
    data = await ProfessionalProfile.find({})
      .select('-mainPhoto')
      .select('-g1')
      .select('-g2')
      .select('-g3')
      .select('-g4')
      .select('-g5')
      .select('-g6');

    console.log('all: ', data);
    let checkdata;
    if (req.body.rexiPro && typeof req.body.rexiPro !== 'undefined') {
      checkdata = handleUserFilterRexiPro(data, req.body);
      console.log('return data from function rexi pro: ', checkdata);
      data = checkdata;
    }

    if (req.body.comment && typeof req.body.comment !== 'undefined') {
      checkdata = handleUserFilterComment(data, req.body);
      console.log('return data from function comment: ', checkdata);
      data = checkdata;
    }

    if (req.body.openAtNight && typeof req.body.openAtNight !== 'undefined') {
      checkdata = await handleUserFilterNight(data, req.body);
      console.log('return data from function open at night: ', checkdata);
      data = checkdata;
    }

    if (
      req.body.openOnSaturday &&
      typeof req.body.openOnSaturday !== 'undefined'
    ) {
      checkdata = await handleUserFilterSaturday(data, req.body);
      console.log('return data from function saturday: ', checkdata);
      data = checkdata;
    }

    if (req.body.english && typeof req.body.english !== 'undefined') {
      checkdata = handleUserFilterEnglish(data, req.body);
      console.log('return data from function rexi pro: ', checkdata);
      data = checkdata;
    }

    if (req.body.arabic && typeof req.body.arabic !== 'undefined') {
      checkdata = handleUserFilterArabic(data, req.body);
      console.log('return data from function rexi pro: ', checkdata);
      data = checkdata;
    }

    if (req.body.handicap && typeof req.body.handicap !== 'undefined') {
      checkdata = handleUserFilterHandicap(data, req.body);
      console.log('return data from function rexi pro: ', checkdata);
      data = checkdata;
    }

    return res.json({
      data
    });
  }

  console.log('req.body.companyProfession: ', req.body.companyProfession);
  let companyProfession = {};
  if (
    typeof req.body.companyProfession !== 'undefined' &&
    req.body.companyProfession !== 'null'
  ) {
    if (Object.keys(req.body.companyProfession).length !== 0) {
      companyProfession = new Profession();
      companyProfession._id = req.body.companyProfession;
    }
  }

  let dArray = [];
  let district;
  for (let i in req.body.worksArea) {
    if (req.body.worksArea[i].length > 0) {
      district = new District();
      district._id = req.body.worksArea[i];
      dArray.unshift(district);
    }
  }
  let newData = {};

  for (let key in dArray) {
    let profiles = await ProfessionalProfile.find({
      worksArea: dArray[key]
    })
      .select('-mainPhoto')
      .populate('district');
    newData[dArray[key]] = profiles;
  }
  //check for douplicate data only if we have district filter
  let temp = {};

  for (let key in newData) {
    for (let i in newData[key]) {
      if (!temp[newData[key][i].user]) {
        //check for profession type
        if (Object.keys(req.body.companyProfession).length !== 0) {
          let flag = false;
          for (let j in newData[key][i].companyProfession) {
            if (
              companyProfession._id.toString() ===
              newData[key][i].companyProfession[j]._id.toString()
            ) {
              flag = true;
            }
          }
          if (flag) {
            temp[newData[key][i].user] = newData[key][i];
            data.unshift(newData[key][i]);
          }
        } else {
          temp[newData[key][i].user] = newData[key][i];
          data.unshift(newData[key][i]);
        }
      }
    }
  }
  //if we don't have a district filter
  if (Object.keys(newData).length === 0) {
    let profilesForCompany = await ProfessionalProfile.find({
      companyProfession
    }).select('-mainPhoto');
    console.log(
      'profession: ',
      companyProfession,
      ' data: ',
      profilesForCompany
    );
    data = profilesForCompany;
  }
  let tempdata;
  if (req.body.rexiPro && typeof req.body.rexiPro !== 'undefined') {
    tempdata = handleUserFilterRexiPro(data, req.body);
    console.log('return data from function rexipro 2: ', tempdata);
    data = tempdata;
  }

  if (req.body.comment && typeof req.body.comment !== 'undefined') {
    tempdata = handleUserFilterComment(data, req.body);
    console.log('return data from function comment 2: ', tempdata);
    data = tempdata;
  }

  if (req.body.openAtNight && typeof req.body.openAtNight !== 'undefined') {
    tempdata = await handleUserFilterNight(data, req.body);
    console.log('return data from function open at night 2: ', tempdata);
    data = tempdata;
  }

  if (
    req.body.openOnSaturday &&
    typeof req.body.openOnSaturday !== 'undefined'
  ) {
    tempdata = await handleUserFilterSaturday(data, req.body);
    console.log('return data from function saturday 2: ', tempdata);
    data = tempdata;
  }

  if (req.body.arabic && typeof req.body.arabic !== 'undefined') {
    tempdata = handleUserFilterArabic(data, req.body);
    console.log('return data from function rexipro 2: ', tempdata);
    data = tempdata;
  }

  if (req.body.english && typeof req.body.english !== 'undefined') {
    tempdata = handleUserFilterEnglish(data, req.body);
    console.log('return data from function rexipro 2: ', tempdata);
    data = tempdata;
  }

  if (req.body.handicap && typeof req.body.handicap !== 'undefined') {
    tempdata = handleUserFilterHandicap(data, req.body);
    console.log('return data from function rexipro 2: ', tempdata);
    data = tempdata;
  }

  res.json({
    data
  });
};

exports.filteredProfessionalProfilelist = (req, res) => {
  console.log(req.params, 'params');
  if (req.params.query == {}) {
    ProfessionalProfile.find(req.params.query)
      .sort({ companyName: -1 })
      .exec((err, data) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: errorHandler(err)
          });
        }
        res.json(data);
      });
  }
  ProfessionalProfile.find(req.params.query).exec((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};
