import React, { Fragment, useEffect, useState } from 'react';
import { getProfile, addCalendar } from '../action/professional';
import { updateCalendar } from '../action/professional';
import { isAuthenticated } from '../action/auth';
import './professionalPanel.css';
import { Redirect } from 'react-router-dom';
import { getCalendar } from './../action/calendar';
import SideMenu from './sideMenu';
import TimeKeeper from 'react-timekeeper';

const AddCalendar = () => {
  const [sundayOpenHourA, setSundayOpenHourA] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [sundayCloseHourA, setSundayCloseHourA] = useState('');
  const [showTimeA, setShowTimeA] = useState(false);
  const [sundayOpenHourB, setSundayOpenHourB] = useState('');
  const [showTimeB, setShowTimeB] = useState(false);
  const [sundayCloseHourB, setSundayCloseHourB] = useState('');
  const [showTimeC, setShowTimeC] = useState(false);

  const [mondayOpenHourA, setMondayOpenHourA] = useState('');
  const [showTimeMonday, setShowTimeMonday] = useState(false);
  const [mondayCloseHourA, setMondayCloseHourA] = useState('');
  const [showTimeMondayA, setShowTimeMondayA] = useState(false);
  const [mondayOpenHourB, setMondayOpenHourB] = useState('');
  const [showTimeMondayB, setShowTimeMondayB] = useState(false);
  const [mondayCloseHourB, setMondayCloseHourB] = useState('');
  const [showTimeMondayC, setShowTimeMondayC] = useState(false);

  const [tuesdayOpenHourA, setTuesdayOpenHourA] = useState('');
  const [showTimeTuesday, setShowTimeTuesday] = useState(false);
  const [tuesdayCloseHourA, setTuesdayCloseHourA] = useState('');
  const [showTimeTuesdayA, setShowTimeTuesdayA] = useState(false);
  const [tuesdayOpenHourB, setTuesdayOpenHourB] = useState('');
  const [showTimeTuesdayB, setShowTimeTuesdayB] = useState(false);
  const [tuesdayCloseHourB, setTuesdayCloseHourB] = useState('');
  const [showTimeTuesdayC, setShowTimeTuesdayC] = useState(false);

  const [wednesdayOpenHourA, setWednesdayOpenHourA] = useState('');
  const [showTimeWednesday, setShowTimeWednesday] = useState(false);
  const [wednesdayCloseHourA, setWednesdayCloseHourA] = useState('');
  const [showTimeWednesdayA, setShowTimeWednesdayA] = useState(false);
  const [wednesdayOpenHourB, setWednesdayOpenHourB] = useState('');
  const [showTimeWednesdayB, setShowTimeWednesdayB] = useState(false);
  const [wednesdayCloseHourB, setWednesdayCloseHourB] = useState('');
  const [showTimeWednesdayC, setShowTimeWednesdayC] = useState(false);

  const [thursdayOpenHourA, setThursdayOpenHourA] = useState('');
  const [showTimeThursday, setShowTimeThursday] = useState(false);
  const [thursdayCloseHourA, setThursdayCloseHourA] = useState('');
  const [showTimeThursdayA, setShowTimeThursdayA] = useState(false);
  const [thursdayOpenHourB, setThursdayOpenHourB] = useState('');
  const [showTimeThursdayB, setShowTimeThursdayB] = useState(false);
  const [thursdayCloseHourB, setThursdayCloseHourB] = useState('');
  const [showTimeThursdayC, setShowTimeThursdayC] = useState(false);

  const [fridayOpenHourA, setFridayOpenHourA] = useState('');
  const [showTimeFriday, setShowTimeFriday] = useState(false);
  const [fridayCloseHourA, setFridayCloseHourA] = useState('');
  const [showTimeFridayA, setShowTimeFridayA] = useState(false);
  const [fridayOpenHourB, setFridayOpenHourB] = useState('');
  const [showTimeFridayB, setShowTimeFridayB] = useState(false);
  const [fridayCloseHourB, setFridayCloseHourB] = useState('');
  const [showTimeFridayC, setShowTimeFridayC] = useState(false);

  const [saturdayOpenHourA, setSaturdayOpenHourA] = useState('');
  const [showTimeSaturday, setShowTimeSaturday] = useState(false);
  const [saturdayCloseHourA, setSaturdayCloseHourA] = useState('');
  const [showTimeSaturdayA, setShowTimeSaturdayA] = useState(false);
  const [saturdayOpenHourB, setSaturdayOpenHourB] = useState('');
  const [showTimeSaturdayB, setShowTimeSaturdayB] = useState(false);
  const [saturdayCloseHourB, setSaturdayCloseHourB] = useState('');
  const [showTimeSaturdayC, setShowTimeSaturdayC] = useState(false);

  const [values, setValues] = useState({
    sundayopena: '',
    sundayopenb: '',
    sundayclosea: '',
    sundaycloseb: '',
    mondayopena: '',
    mondayopenb: '',
    mondayclosea: '',
    mondaycloseb: '',
    tuesdayopena: '',
    tuesdayopenb: '',
    tuesdayclosea: '',
    tuesdaycloseb: '',
    wednesdayopena: '',
    wednesdayopenb: '',
    wednesdayclosea: '',
    wednesdaycloseb: '',
    thursdayopena: '',
    thursdayopenb: '',
    thursdayclosea: '',
    thursdaycloseb: '',
    fridayopena: '',
    fridayopenb: '',
    fridayclosea: '',
    fridaycloseb: '',
    saturdayopena: '',
    saturdayopenb: '',
    saturdayclosea: '',
    saturdaycloseb: '',
    redirect: false
  });

  const { redirect } = values;

  const [error, setError] = useState(false);
  const [calendar, setCalendar] = useState();
  const [profile, setProfile] = useState();
  const [newSunday, setNewSunday] = useState(false);
  const [newMonday, setNewMonday] = useState(false);
  const [newTuesday, setNewTuesday] = useState(false);
  const [newWednesday, setNewWednesday] = useState(false);
  const [newThursday, setNewThursday] = useState(false);
  const [newFriday, setNewFriday] = useState(false);
  const [newSaturday, setNewSaturday] = useState(false);

  const { user, token } = isAuthenticated();

  const loadProfile = () => {
    getProfile(user._id).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProfile(data);
      }
    });
  };

  const redirectUser = () => {
    if (redirect) {
      return <Redirect to="/addgallery" />;
    }
  };
  const loadCalendar = () => {
    getCalendar(user._id).then(data => {
      if (data.error) {
        console.log('error', data);
        setError(data.error);
      } else {
        setCalendar(data);
      }
    });
  };

  useEffect(() => {
    loadProfile();
    loadCalendar();
  }, []);

  const showError = () => (
    <div>{error ? console.log('error: ', error) : null}</div>
  );

  const onSubmit = async e => {
    e.preventDefault();
    if (calendar) {
      updateCalendar(user._id, token, profile.user, values).then(data => {
        if (data.error) {
          setError({ error: data.error });
        } else {
          setValues({
            sundayopena: '',
            sundayopenb: '',
            sundayclosea: '',
            sundaycloseb: '',
            mondayopena: '',
            mondayopenb: '',
            mondayclosea: '',
            mondaycloseb: '',
            tuesdayopena: '',
            tuesdayopenb: '',
            tuesdayclosea: '',
            tuesdaycloseb: '',
            wednesdayopena: '',
            wednesdayopenb: '',
            wednesdayclosea: '',
            wednesdaycloseb: '',
            thursdayopena: '',
            thursdayopenb: '',
            thursdayclosea: '',
            thursdaycloseb: '',
            fridayopena: '',
            fridayopenb: '',
            fridayclosea: '',
            fridaycloseb: '',
            saturdayopena: '',
            saturdayopenb: '',
            saturdayclosea: '',
            saturdaycloseb: '',
            redirect: true
          });
        }
      });
    } else {
      addCalendar(user._id, token, profile.user, values).then(data => {
        if (data.error) {
          setError({ error: data.error });
        } else {
          setValues({
            sundayopena: '',
            sundayopenb: '',
            sundayclosea: '',
            sundaycloseb: '',
            mondayopena: '',
            mondayopenb: '',
            mondayclosea: '',
            mondaycloseb: '',
            tuesdayopena: '',
            tuesdayopenb: '',
            tuesdayclosea: '',
            tuesdaycloseb: '',
            wednesdayopena: '',
            wednesdayopenb: '',
            wednesdayclosea: '',
            wednesdaycloseb: '',
            thursdayopena: '',
            thursdayopenb: '',
            thursdayclosea: '',
            thursdaycloseb: '',
            fridayopena: '',
            fridayopenb: '',
            fridayclosea: '',
            fridaycloseb: '',
            saturdayopena: '',
            saturdayopenb: '',
            saturdayclosea: '',
            saturdaycloseb: '',
            redirect: true
          });
        }
      });
    }
  };

  const AddMoreShiftSunday = () => {
    if (newSunday) {
      setNewSunday(false);
    } else {
      setNewSunday(true);
    }
  };

  const AddMoreShiftMonday = () => {
    if (newMonday) {
      setNewMonday(false);
    } else {
      setNewMonday(true);
    }
  };

  const AddMoreShiftTuesday = () => {
    if (newTuesday) {
      setNewTuesday(false);
    } else {
      setNewTuesday(true);
    }
  };

  const AddMoreShiftWednesday = () => {
    if (newWednesday) {
      setNewWednesday(false);
    } else {
      setNewWednesday(true);
    }
  };

  const AddMoreShiftThursday = () => {
    if (newThursday) {
      setNewThursday(false);
    } else {
      setNewThursday(true);
    }
  };

  const AddMoreShiftFriday = () => {
    if (newFriday) {
      setNewFriday(false);
    } else {
      setNewFriday(true);
    }
  };

  const AddMoreShiftSaturday = () => {
    if (newSaturday) {
      setNewSaturday(false);
    } else {
      setNewSaturday(true);
    }
  };

  const handleChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <Fragment>
      <section className="add-professional-calendar">
        {showError()}
        <div className="add-professional-calendar-container">
          <SideMenu />
          <form className="addProCalendar-form" onSubmit={e => onSubmit(e)}>
            <h1>שעות פתיחה</h1>
            <div className="addPro-row">
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p className="p-day">יום ראשון</p>
              </label>

              <div className="calendarHours">
                <p className="calendar-firstshift">משעה</p>
                <div className="wrap-hour-div">
                  {showTime && (
                    <TimeKeeper
                      time={'12:30pm'}
                      hour24Mode
                      onChange={newTime =>
                        setSundayOpenHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTime(false);
                        handleChange(newTime.formatted24, 'sundayopena');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTime && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTime(true)}
                    >
                      {sundayOpenHourA}
                    </div>
                  )}
                </div>

                <p className="calendar-firstshift">עד</p>
                <div className="wrap-hour-div">
                  {showTimeA && (
                    <TimeKeeper
                      hour24Mode
                      time={'12:30pm'}
                      onChange={newTime =>
                        setSundayCloseHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeA(false);
                        handleChange(newTime.formatted24, 'sundayclosea');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeA && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeA(true)}
                    >
                      {sundayCloseHourA}
                    </div>
                  )}
                </div>
                <div onClick={AddMoreShiftSunday}>
                  <h3 className="plus">+</h3>
                </div>
              </div>
              {newSunday ? (
                <div className="calendar-moreHours">
                  <p>משעה</p>
                  <div className="wrap-hour-div">
                    {showTimeB && (
                      <TimeKeeper
                        time={'12:30pm'}
                        hour24Mode
                        onChange={newTime =>
                          setSundayOpenHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeB(false);
                          handleChange(newTime.formatted24, 'sundayopenb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeB && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeB(true)}
                      >
                        {sundayOpenHourB}
                      </div>
                    )}
                  </div>
                  <p> עד </p>
                  <div className="wrap-hour-div">
                    {showTimeC && (
                      <TimeKeeper
                        hour24Mode
                        time={'12:30pm'}
                        onChange={newTime =>
                          setSundayCloseHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeC(false);
                          handleChange(newTime.formatted24, 'sundaycloseb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeC && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeC(true)}
                      >
                        {sundayCloseHourB}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p>24 שעות</p>
              </label>
            </div>

            <div className="addPro-row">
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p className="p-day">יום שני</p>
              </label>

              <div className="calendarHours">
                <p className="calendar-firstshift">משעה</p>
                <div className="wrap-hour-div">
                  {showTimeMonday && (
                    <TimeKeeper
                      time={'12:30pm'}
                      hour24Mode
                      onChange={newTime =>
                        setMondayOpenHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeMonday(false);
                        handleChange(newTime.formatted24, 'mondayopena');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeMonday && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeMonday(true)}
                    >
                      {mondayOpenHourA}
                    </div>
                  )}
                </div>

                <p className="calendar-firstshift">עד</p>
                <div className="wrap-hour-div">
                  {showTimeMondayA && (
                    <TimeKeeper
                      hour24Mode
                      time={'12:30pm'}
                      onChange={newTime =>
                        setMondayCloseHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeMondayA(false);
                        handleChange(newTime.formatted24, 'mondayclosea');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeMondayA && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeMondayA(true)}
                    >
                      {mondayCloseHourA}
                    </div>
                  )}
                </div>
                <div onClick={AddMoreShiftMonday}>
                  <h3 className="plus">+</h3>
                </div>
              </div>
              {newMonday ? (
                <div className="calendar-moreHours">
                  <p>משעה</p>
                  <div className="wrap-hour-div">
                    {showTimeMondayB && (
                      <TimeKeeper
                        time={'12:30pm'}
                        hour24Mode
                        onChange={newTime =>
                          setMondayOpenHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeMondayB(false);
                          handleChange(newTime.formatted24, 'mondayopenb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeMondayB && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeMondayB(true)}
                      >
                        {mondayOpenHourB}
                      </div>
                    )}
                  </div>
                  <p> עד </p>
                  <div className="wrap-hour-div">
                    {showTimeMondayC && (
                      <TimeKeeper
                        hour24Mode
                        time={'12:30pm'}
                        onChange={newTime =>
                          setMondayCloseHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeMondayC(false);
                          handleChange(newTime.formatted24, 'mondaycloseb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeMondayC && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeMondayC(true)}
                      >
                        {mondayCloseHourB}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p>24 שעות</p>
              </label>
            </div>

            <div className="addPro-row">
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p className="p-day">יום שלישי</p>
              </label>

              <div className="calendarHours">
                <p className="calendar-firstshift">משעה</p>
                <div className="wrap-hour-div">
                  {showTimeTuesday && (
                    <TimeKeeper
                      time={'12:30pm'}
                      hour24Mode
                      onChange={newTime =>
                        setTuesdayOpenHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeTuesday(false);
                        handleChange(newTime.formatted24, 'tuesdayopena');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeTuesday && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeTuesday(true)}
                    >
                      {tuesdayOpenHourA}
                    </div>
                  )}
                </div>

                <p className="calendar-firstshift">עד</p>
                <div className="wrap-hour-div">
                  {showTimeTuesdayA && (
                    <TimeKeeper
                      hour24Mode
                      time={'12:30pm'}
                      onChange={newTime =>
                        setTuesdayCloseHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeTuesdayA(false);
                        handleChange(newTime.formatted24, 'tuesdayclosea');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeTuesdayA && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeTuesdayA(true)}
                    >
                      {tuesdayCloseHourA}
                    </div>
                  )}
                </div>
                <div onClick={AddMoreShiftTuesday}>
                  <h3 className="plus">+</h3>
                </div>
              </div>
              {newTuesday ? (
                <div className="calendar-moreHours">
                  <p>משעה</p>
                  <div className="wrap-hour-div">
                    {showTimeTuesdayB && (
                      <TimeKeeper
                        time={'12:30pm'}
                        hour24Mode
                        onChange={newTime =>
                          setTuesdayOpenHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeTuesdayB(false);
                          handleChange(newTime.formatted24, 'tuesdayopenb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeTuesdayB && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeTuesdayB(true)}
                      >
                        {tuesdayOpenHourB}
                      </div>
                    )}
                  </div>
                  <p> עד </p>
                  <div className="wrap-hour-div">
                    {showTimeTuesdayC && (
                      <TimeKeeper
                        hour24Mode
                        time={'12:30pm'}
                        onChange={newTime =>
                          setTuesdayCloseHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeTuesdayC(false);
                          handleChange(newTime.formatted24, 'tuesdaycloseb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeTuesdayC && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeTuesdayC(true)}
                      >
                        {tuesdayCloseHourB}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p>24 שעות</p>
              </label>
            </div>

            <div className="addPro-row">
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p className="p-day">יום רביעי</p>
              </label>

              <div className="calendarHours">
                <p className="calendar-firstshift">משעה</p>
                <div className="wrap-hour-div">
                  {showTimeWednesday && (
                    <TimeKeeper
                      time={'12:30pm'}
                      hour24Mode
                      onChange={newTime =>
                        setWednesdayOpenHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeWednesday(false);
                        handleChange(newTime.formatted24, 'wednesdayopena');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeWednesday && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeWednesday(true)}
                    >
                      {wednesdayOpenHourA}
                    </div>
                  )}
                </div>

                <p className="calendar-firstshift">עד</p>
                <div className="wrap-hour-div">
                  {showTimeWednesdayA && (
                    <TimeKeeper
                      hour24Mode
                      time={'12:30pm'}
                      onChange={newTime =>
                        setWednesdayCloseHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeWednesdayA(false);
                        handleChange(newTime.formatted24, 'wednesdayclosea');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeWednesdayA && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeWednesdayA(true)}
                    >
                      {wednesdayCloseHourA}
                    </div>
                  )}
                </div>
                <div onClick={AddMoreShiftWednesday}>
                  <h3 className="plus">+</h3>
                </div>
              </div>
              {newWednesday ? (
                <div className="calendar-moreHours">
                  <p>משעה</p>
                  <div className="wrap-hour-div">
                    {showTimeWednesdayB && (
                      <TimeKeeper
                        time={'12:30pm'}
                        hour24Mode
                        onChange={newTime =>
                          setWednesdayOpenHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeWednesdayB(false);
                          handleChange(newTime.formatted24, 'wednesdayopenb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeWednesdayB && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeWednesdayB(true)}
                      >
                        {wednesdayOpenHourB}
                      </div>
                    )}
                  </div>
                  <p> עד </p>
                  <div className="wrap-hour-div">
                    {showTimeWednesdayC && (
                      <TimeKeeper
                        hour24Mode
                        time={'12:30pm'}
                        onChange={newTime =>
                          setWednesdayCloseHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeWednesdayC(false);
                          handleChange(newTime.formatted24, 'wednesdaycloseb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeWednesdayC && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeWednesdayC(true)}
                      >
                        {wednesdayCloseHourB}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p>24 שעות</p>
              </label>
            </div>

            <div className="addPro-row">
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p className="p-day">יום חמישי</p>
              </label>

              <div className="calendarHours">
                <p className="calendar-firstshift">משעה</p>
                <div className="wrap-hour-div">
                  {showTimeThursday && (
                    <TimeKeeper
                      time={'12:30pm'}
                      hour24Mode
                      onChange={newTime =>
                        setThursdayOpenHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeThursday(false);
                        handleChange(newTime.formatted24, 'thursdayopena');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeThursday && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeThursday(true)}
                    >
                      {thursdayOpenHourA}
                    </div>
                  )}
                </div>

                <p className="calendar-firstshift">עד</p>
                <div className="wrap-hour-div">
                  {showTimeThursdayA && (
                    <TimeKeeper
                      hour24Mode
                      time={'12:30pm'}
                      onChange={newTime =>
                        setThursdayCloseHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeThursdayA(false);
                        handleChange(newTime.formatted24, 'thursdayclosea');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeThursdayA && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeThursdayA(true)}
                    >
                      {thursdayCloseHourA}
                    </div>
                  )}
                </div>
                <div onClick={AddMoreShiftThursday}>
                  <h3 className="plus">+</h3>
                </div>
              </div>
              {newThursday ? (
                <div className="calendar-moreHours">
                  <p>משעה</p>
                  <div className="wrap-hour-div">
                    {showTimeThursdayB && (
                      <TimeKeeper
                        time={'12:30pm'}
                        hour24Mode
                        onChange={newTime =>
                          setThursdayOpenHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeThursdayB(false);
                          handleChange(newTime.formatted24, 'thursdayopenb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeThursdayB && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeThursdayB(true)}
                      >
                        {thursdayOpenHourB}
                      </div>
                    )}
                  </div>
                  <p> עד </p>
                  <div className="wrap-hour-div">
                    {showTimeThursdayC && (
                      <TimeKeeper
                        hour24Mode
                        time={'12:30pm'}
                        onChange={newTime =>
                          setThursdayCloseHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeThursdayC(false);
                          handleChange(newTime.formatted24, 'thursdaycloseb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeThursdayC && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeThursdayC(true)}
                      >
                        {thursdayCloseHourB}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p>24 שעות</p>
              </label>
            </div>

            <div className="addPro-row">
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p className="p-day">יום שישי</p>
              </label>

              <div className="calendarHours">
                <p className="calendar-firstshift">משעה</p>
                <div className="wrap-hour-div">
                  {showTimeFriday && (
                    <TimeKeeper
                      time={'12:30pm'}
                      hour24Mode
                      onChange={newTime =>
                        setFridayOpenHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeFriday(false);
                        handleChange(newTime.formatted24, 'fridayopena');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeFriday && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeFriday(true)}
                    >
                      {fridayOpenHourA}
                    </div>
                  )}
                </div>

                <p className="calendar-firstshift">עד</p>
                <div className="wrap-hour-div">
                  {showTimeFridayA && (
                    <TimeKeeper
                      hour24Mode
                      time={'12:30pm'}
                      onChange={newTime =>
                        setFridayCloseHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeFridayA(false);
                        handleChange(newTime.formatted24, 'fridayclosea');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeFridayA && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeFridayA(true)}
                    >
                      {fridayCloseHourA}
                    </div>
                  )}
                </div>
                <div onClick={AddMoreShiftFriday}>
                  <h3 className="plus">+</h3>
                </div>
              </div>
              {newFriday ? (
                <div className="calendar-moreHours">
                  <p>משעה</p>
                  <div className="wrap-hour-div">
                    {showTimeFridayB && (
                      <TimeKeeper
                        time={'12:30pm'}
                        hour24Mode
                        onChange={newTime =>
                          setFridayOpenHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeFridayB(false);
                          handleChange(newTime.formatted24, 'fridayopenb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeFridayB && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeFridayB(true)}
                      >
                        {fridayOpenHourB}
                      </div>
                    )}
                  </div>
                  <p> עד </p>
                  <div className="wrap-hour-div">
                    {showTimeFridayC && (
                      <TimeKeeper
                        hour24Mode
                        time={'12:30pm'}
                        onChange={newTime =>
                          setFridayCloseHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeFridayC(false);
                          handleChange(newTime.formatted24, 'fridaycloseb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeFridayC && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeFridayC(true)}
                      >
                        {fridayCloseHourB}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p>24 שעות</p>
              </label>
            </div>

            <div className="addPro-row">
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p className="p-day">יום שבת</p>
              </label>

              <div className="calendarHours">
                <p className="calendar-firstshift">משעה</p>
                <div className="wrap-hour-div">
                  {showTimeSaturday && (
                    <TimeKeeper
                      time={'12:30pm'}
                      hour24Mode
                      onChange={newTime =>
                        setSaturdayOpenHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeSaturday(false);
                        handleChange(newTime.formatted24, 'saturdayopena');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeSaturday && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeSaturday(true)}
                    >
                      {saturdayOpenHourA}
                    </div>
                  )}
                </div>

                <p className="calendar-firstshift">עד</p>
                <div className="wrap-hour-div">
                  {showTimeSaturdayA && (
                    <TimeKeeper
                      hour24Mode
                      time={'12:30pm'}
                      onChange={newTime =>
                        setSaturdayCloseHourA(newTime.formatted24)
                      }
                      onDoneClick={newTime => {
                        setShowTimeSaturdayA(false);
                        handleChange(newTime.formatted24, 'saturdayclosea');
                      }}
                      switchToMinuteOnHourSelect
                    />
                  )}
                  {!showTimeSaturdayA && (
                    <div
                      className="btn-timepeeker"
                      onClick={() => setShowTimeSaturdayA(true)}
                    >
                      {saturdayCloseHourA}
                    </div>
                  )}
                </div>
                <div onClick={AddMoreShiftSaturday}>
                  <h3 className="plus">+</h3>
                </div>
              </div>
              {newSaturday ? (
                <div className="calendar-moreHours">
                  <p>משעה</p>
                  <div className="wrap-hour-div">
                    {showTimeSaturdayB && (
                      <TimeKeeper
                        time={'12:30pm'}
                        hour24Mode
                        onChange={newTime =>
                          setSaturdayOpenHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeSaturdayB(false);
                          handleChange(newTime.formatted24, 'saturdayopenb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeSaturdayB && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeSaturdayB(true)}
                      >
                        {saturdayOpenHourB}
                      </div>
                    )}
                  </div>
                  <p> עד </p>
                  <div className="wrap-hour-div">
                    {showTimeSaturdayC && (
                      <TimeKeeper
                        hour24Mode
                        time={'12:30pm'}
                        onChange={newTime =>
                          setSaturdayCloseHourB(newTime.formatted24)
                        }
                        onDoneClick={newTime => {
                          setShowTimeSaturdayC(false);
                          handleChange(newTime.formatted24, 'saturdaycloseb');
                        }}
                        switchToMinuteOnHourSelect
                      />
                    )}
                    {!showTimeSaturdayC && (
                      <div
                        className="btn-timepeeker"
                        onClick={() => setShowTimeSaturdayC(true)}
                      >
                        {saturdayCloseHourB}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <label className="container-checkbox">
                <input type="checkbox" />
                <span className="checkmarkDays"></span>
                <p>24 שעות</p>
              </label>
            </div>

            <div className="addProCalendar-row">
              <button type="submit" className="addPro-submit">
                שמירה
              </button>
            </div>
          </form>
        </div>
        {redirectUser()}
      </section>
    </Fragment>
  );
};

export default AddCalendar;
