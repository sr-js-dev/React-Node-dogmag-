const Calendar = require('../models/calendar');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.calendarById = async (req, res, next, professionalId) => {
  const calendar = await Calendar.findOne({
    professional: professionalId
  });
  if (!calendar)
    return res.status(400).json({
      error: 'לבעל המקצוע אין לוח שעות פעילות'
    });

  req.calendar = calendar;
  next();
};

exports.createAndUpdate = async (req, res) => {
  const user = req.profile;
  const calendar = req.calendar;
  let newcalendar = {};
  if (calendar) newcalendar = calendar;

  const { workingHours } = req.body;
  const {
    sundayopena,
    sundayopenb,
    sundayclosea,
    sundaycloseb,
    mondayopena,
    mondayclosea,
    mondayopenb,
    mondaycloseb,
    tuesdayopena,
    tuesdayclosea,
    tuesdayopenb,
    tuesdaycloseb,
    wednesdayopena,
    wednesdayopenb,
    wednesdayclosea,
    wednesdaycloseb,
    thursdayopena,
    thursdayopenb,
    thursdayclosea,
    thursdaycloseb,
    fridayopena,
    fridayopenb,
    fridayclosea,
    fridaycloseb,
    saturdayopena,
    saturdayopenb,
    saturdayclosea,
    saturdaycloseb
  } = workingHours;

  if (
    calendar &&
    user.role === 2 &&
    calendar.professional.toString() !== user.id.toString()
  ) {
    return res.status(403).json({
      error: 'Professional Private resourse! Access denied'
    });
  }

  const handleHour = hour => {
    let n = hour.indexOf(':');
    let firstStr = hour.substring(0, n);
    let secondStr = hour.substring(n + 1, hour.length);
    return firstStr + secondStr;
  };

  const sunday = {};
  if (sundayopena) {
    sunday.openA = sundayopena;
    sunday.openCalcA = handleHour(sundayopena);
  }
  if (sundayclosea) {
    sunday.closeA = sundayclosea;
    sunday.closeCalcA = handleHour(sundayclosea);
  }
  if (sundayopenb) {
    sunday.openB = sundayopenb;
    sunday.openCalcB = handleHour(sundayopenb);
  }
  if (sundaycloseb) {
    sunday.closeB = sundaycloseb;
    sunday.closeCalcB = handleHour(sundaycloseb);
  }

  const monday = {};
  if (mondayopena) {
    monday.openA = mondayopena;
    monday.openCalcA = handleHour(mondayopena);
  }
  if (mondayclosea) {
    monday.closeA = mondayclosea;
    monday.closeCalcA = handleHour(mondayclosea);
  }
  if (mondayopenb) {
    monday.openB = mondayopenb;
    monday.openCalcB = handleHour(mondayopenb);
  }
  if (mondaycloseb) {
    monday.closeB = mondaycloseb;
    monday.closeCalcB = handleHour(mondaycloseb);
  }

  const tuesday = {};
  if (tuesdayopena) {
    tuesday.openA = tuesdayopena;
    tuesday.openCalcA = handleHour(tuesdayopena);
  }
  if (tuesdayclosea) {
    tuesday.closeA = tuesdayclosea;
    tuesday.closeCalcA = handleHour(tuesdayclosea);
  }
  if (tuesdayopenb) {
    tuesday.openB = tuesdayopenb;
    tuesday.openCalcB = handleHour(tuesdayopenb);
  }
  if (tuesdaycloseb) {
    tuesday.closeB = tuesdaycloseb;
    tuesday.closeCalcB = handleHour(tuesdaycloseb);
  }

  const wednesday = {};
  if (wednesdayopena) {
    wednesday.openA = wednesdayopena;
    wednesday.openCalcA = handleHour(wednesdayopena);
  }
  if (wednesdayclosea) {
    wednesday.closeA = wednesdayclosea;
    wednesday.closeCalcA = handleHour(wednesdayclosea);
  }
  if (wednesdayopenb) {
    wednesday.openB = wednesdayopenb;
    wednesday.openCalcB = handleHour(wednesdayopenb);
  }
  if (wednesdaycloseb) {
    wednesday.closeB = wednesdaycloseb;
    wednesday.closeCalcB = handleHour(wednesdaycloseb);
  }

  const thursday = {};
  if (thursdayopena) {
    thursday.openA = thursdayopena;
    thursday.openCalcA = handleHour(thursdayopena);
  }
  if (thursdayclosea) {
    thursday.closeA = thursdayclosea;
    thursday.closeCalcA = handleHour(thursdayclosea);
  }
  if (thursdayopenb) {
    thursday.openB = thursdayopenb;
    thursday.openCalcB = handleHour(thursdayopenb);
  }
  if (thursdaycloseb) {
    thursday.closeB = thursdaycloseb;
    thursday.closeCalcB = handleHour(thursdaycloseb);
  }

  const friday = {};
  if (fridayopena) {
    friday.openA = fridayopena;
    friday.openCalcA = handleHour(fridayopena);
  }
  if (fridayclosea) {
    friday.closeA = fridayclosea;
    friday.closeCalcA = handleHour(fridayclosea);
  }
  if (fridayopenb) {
    friday.openB = fridayopenb;
    friday.openCalcB = handleHour(fridayopenb);
  }
  if (fridaycloseb) {
    friday.closeB = fridaycloseb;
    friday.closeCalcB = handleHour(fridaycloseb);
  }

  const saturday = {};
  if (saturdayopena) {
    saturday.openA = saturdayopena;
    saturday.openCalcA = handleHour(saturdayopena);
  }
  if (saturdayclosea) {
    saturday.closeA = saturdayclosea;
    saturday.closeCalcA = handleHour(saturdayclosea);
  }
  if (saturdayopenb) {
    saturday.openB = saturdayopenb;
    saturday.openCalcB = handleHour(saturdayopenb);
  }
  if (saturdaycloseb) {
    saturday.closeB = saturdaycloseb;
    saturday.closeCalcB = handleHour(saturdaycloseb);
  }

  if (Object.keys(sunday).length > 0) {
    newcalendar.sunday = sunday;
  }
  if (Object.keys(monday).length > 0) {
    newcalendar.monday = monday;
  }

  if (Object.keys(tuesday).length > 0) {
    newcalendar.tuesday = tuesday;
  }
  if (Object.keys(wednesday).length > 0) {
    newcalendar.wednesday = wednesday;
  }
  if (Object.keys(thursday).length > 0) {
    newcalendar.thursday = thursday;
  }
  if (Object.keys(friday).length > 0) {
    newcalendar.friday = friday;
  }
  if (Object.keys(saturday).length > 0) {
    newcalendar.saturday = saturday;
  }

  let check;
  if (calendar) {
    check = await newcalendar.save();
  } else {
    newcalendar.professional = user._id;

    const temp = new Calendar(newcalendar);

    check = await temp.save();
  }

  if (check) {
    return res.json(check);
  } else {
    return res.status(400).json({
      error: errorHandler(err)
    });
  }
};

exports.read = (req, res) => {
  return res.json(req.calendar);
};

exports.checkSaturday = (req, res) => {
  const calendar = req.calendar;
  if (
    calendar &&
    calendar.saturday &&
    Number(calendar.saturday.openCalcA) >= 0 &&
    Number(calendar.saturday.closeCalcA) <= 2400
  )
    return res.json(true);
  return res.json(false);
};

exports.checkNight = (req, res) => {
  const calendar = req.calendar;

  if (
    calendar.sunday &&
    (Number(calendar.sunday.closeCalcA) > 2200 ||
      Number(calendar.sunday.openCalcA) < 1)
  ) {
    return res.json(true);
  } else if (
    calendar.sunday &&
    calendar.sunday.closeCalcB &&
    Number(calendar.sunday.closeCalcB) > 2200
  ) {
    return res.json(true);
  }

  if (
    calendar.monday &&
    (Number(calendar.monday.closeCalcA) > 2200 ||
      Number(calendar.monday.openCalcA) < 1)
  ) {
    return res.json(true);
  } else if (
    calendar.monday &&
    calendar.monday.closeCalcB &&
    Number(calendar.monday.closeCalcB) > 2200
  ) {
    return res.json(true);
  }
  if (
    calendar.tuesday &&
    (Number(calendar.tuesday.closeCalcA) > 2200 ||
      Number(calendar.tuesday.openCalcA) < 1)
  ) {
    return res.json(true);
  } else if (
    calendar.tuesday &&
    calendar.tuesday.closeCalcB &&
    Number(calendar.tuesday.closeCalcB) > 2200
  ) {
    return res.json(true);
  }
  if (
    calendar.wednesday &&
    (Number(calendar.wednesday.closeCalcA) > 2200 ||
      Number(calendar.wednesday.openCalcA) < 1)
  ) {
    return res.json(true);
  } else if (
    calendar.wednesday &&
    calendar.wednesday.closeCalcB &&
    Number(calendar.wednesday.closeCalcB) > 2200
  ) {
    return res.json(true);
  }
  if (
    calendar.thursday &&
    (Number(calendar.thursday.closeCalcA) > 2200 ||
      Number(calendar.thursday.openCalcA) < 1)
  ) {
    return res.json(true);
  } else if (
    calendar.thursday &&
    calendar.thursday.closeCalcB &&
    Number(calendar.thursday.closeCalcB) > 2200
  ) {
    return res.json(true);
  }
  if (
    calendar.friday &&
    (Number(calendar.friday.closeCalcA) > 2200 ||
      Number(calendar.friday.openCalcA) < 1)
  ) {
    return res.json(true);
  } else if (
    calendar.friday &&
    calendar.friday.closeCalcB &&
    Number(calendar.friday.closeCalcB) > 2200
  ) {
    return res.json(true);
  }
  if (
    calendar.saturday &&
    (Number(calendar.saturday.closeCalcA) > 2200 ||
      Number(calendar.saturday.openCalcA) < 1)
  ) {
    return res.json(true);
  } else if (
    calendar.saturday &&
    calendar.saturday.closeCalcB &&
    Number(calendar.saturday.closeCalcB) > 2200
  ) {
    return res.json(true);
  }
  return res.json(false);
};

exports.checkOpen = (req, res) => {
  const calendar = req.calendar;
  let d = new Date();
  let day = d.getDay();
  let h = d.getHours();
  let m = d.getMinutes();
  let str;

  //convert to string
  if (m.length === 1) {
    str = h.toString() + '0' + m.toString();
  } else {
    str = h.toString() + m.toString();
  }

  if (day === 0) {
    if (
      calendar.sunday.openCalcA &&
      calendar.sunday.closeCalcA &&
      Number(calendar.sunday.openCalcA) < Number(str) &&
      Number(str) < Number(calendar.sunday.closeCalcA)
    ) {
      return res.json(true);
    }

    if (
      calendar.sunday.openCalcB &&
      calendar.sunday.closeCalcB &&
      Number(calendar.sunday.openCalcB) < Number(str) &&
      Number(str) < Number(calendar.sunday.closeCalcB)
    )
      return res.json(true);
    return res.json(false);
  } else if (day === 1) {
    if (
      calendar.monday.openCalcA &&
      calendar.monday.closeCalcA &&
      Number(calendar.monday.openCalcA) < Number(str) &&
      Number(str) < Number(calendar.monday.closeCalcA)
    ) {
      return res.json(true);
    }

    if (
      calendar.monday.openCalcB &&
      calendar.monday.closeCalcB &&
      Number(calendar.monday.openCalcB) < Number(str) &&
      Number(str) < Number(calendar.monday.closeCalcB)
    )
      return res.json(true);
    return res.json(false);
  } else if (day === 2) {
    if (
      calendar.tuesday.openCalcA &&
      calendar.tuesday.closeCalcA &&
      Number(calendar.tuesday.openCalcA) < Number(str) &&
      Number(str) < Number(calendar.tuesday.closeCalcA)
    ) {
      return res.json(true);
    }

    if (
      calendar.tuesday.openCalcB &&
      calendar.tuesday.closeCalcB &&
      Number(calendar.tuesday.openCalcB) < Number(str) &&
      Number(str) < Number(calendar.tuesday.closeCalcB)
    )
      return res.json(true);
    return res.json(false);
  } else if (day === 3) {
    if (
      calendar.wednesday.openCalcA &&
      calendar.wednesday.closeCalcA &&
      Number(calendar.wednesday.openCalcA) < Number(str) &&
      Number(str) < Number(calendar.wednesday.closeCalcA)
    ) {
      return res.json(true);
    }

    if (
      calendar.wednesday.openCalcB &&
      calendar.wednesday.closeCalcB &&
      Number(calendar.wednesday.openCalcB) < Number(str) &&
      Number(str) < Number(calendar.wednesday.closeCalcB)
    )
      return res.json(true);
    return res.json(false);
  } else if (day === 4) {
    if (
      calendar.thursday.openCalcA &&
      calendar.thursday.closeCalcA &&
      Number(calendar.thursday.openCalcA) < Number(str) &&
      Number(str) < Number(calendar.thursday.closeCalcA)
    ) {
      return res.json(true);
    }

    if (
      calendar.thursday.openCalcB &&
      calendar.thursday.closeCalcB &&
      Number(calendar.thursday.openCalcB) < Number(str) &&
      Number(str) < Number(calendar.thursday.closeCalcB)
    )
      return res.json(true);
    return res.json(false);
  } else if (day === 5) {
    if (
      calendar.friday.openCalcA &&
      calendar.friday.closeCalcA &&
      Number(calendar.friday.openCalcA) < Number(str) &&
      Number(str) < Number(calendar.friday.closeCalcA)
    ) {
      return res.json(true);
    }

    if (
      calendar.friday.openCalcB &&
      calendar.friday.closeCalcB &&
      Number(calendar.friday.openCalcB) < Number(str) &&
      Number(str) < Number(calendar.friday.closeCalcB)
    )
      return res.json(true);
    return res.json(false);
  } else if (day === 6) {
    if (
      calendar.saturday.openCalcA &&
      calendar.saturday.closeCalcA &&
      Number(calendar.saturday.openCalcA) < Number(str) &&
      Number(str) < Number(calendar.saturday.closeCalcA)
    ) {
      return res.json(true);
    }

    if (
      calendar.saturday.openCalcB &&
      calendar.saturday.closeCalcB &&
      Number(calendar.saturday.openCalcB) < Number(str) &&
      Number(str) < Number(calendar.saturday.closeCalcB)
    )
      return res.json(true);
    return res.json(false);
  }
};

exports.remove = (req, res) => {
  const calendar = req.calendar;
  calendar.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: 'calendar deleted'
    });
  });
};

exports.list = (req, res) => {
  Calendar.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};
