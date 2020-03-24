import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './../action/auth';
import Rating from 'react-rating';
import u1 from '../img/Untitled-1.jpg';
import u2 from '../img/esley1.jpg';
import u3 from '../img/esley2.jpg';
import emptyStar from '../icon/paws-love-gray.png';
import fullStar from '../icon/paws-love-danger.png';
import Star from './../const/star';
import { addComment } from '../action/professional';

const ProReview = ({ name, professionalId, comments, handleAddReview }) => {
  const [newReview, setNewReview] = useState(false);
  const [values, setValues] = useState({
    text: '',
    score: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user, token } = isAuthenticated();
  const { score, text } = values;

  const handleAddReviewDiv = () => {
    if (newReview) {
      setNewReview(false);
    } else {
      setNewReview(true);
    }
  };

  const showError = () => <div>{error ? <p>{error}</p> : null}</div>;

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError(false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!text) {
      setError('היי, שכחתם להגיד כמה מילים');
    } else if (score === 0) {
      setError('היי, שכחתם לדרג');
    } else {
      setLoading({ loading: true });
      const data = await addComment(
        user._id,
        token,
        professionalId,
        text,
        score
      );
      if (data.error) {
        setError(data.error);
      } else {
        setError(false);
        setValues({ text: '', score: 0 });
        handleAddReview(true);
      }
    }
  };

  const handleRating = e => {
    setValues({ ...values, score: e });
    setError(false);
  };

  const handleDate = d => {
    let x = new Date(d);
    let year = x.getFullYear();
    let month = x.getMonth() + 1;
    let day = x.getDate();
    return (
      <p>
        נוסף בתאריך {day}.{month}.{year}
      </p>
    );
  };

  return (
    <Fragment>
      <div className="headline-review">
        <h2>חוות דעת</h2>
        <div className="add-review-btn" onClick={handleAddReviewDiv}>
          <h3>+ הוספת חוות דעת</h3>
        </div>
      </div>
      {newReview ? (
        isAuthenticated() ? (
          <div className="add-review">
            <div className="add-review-container">
              <p>
                אז מה דעתכם על {name}, שווה ליטוף או נביחה? הביעו את דעתכם ודרגו
                בלבבות!{' '}
              </p>
              <form className="addPro-form" onSubmit={e => onSubmit(e)}>
                <div className="add-review-row">
                  <textarea
                    rows="7"
                    cols="80"
                    name="text"
                    placeholder=""
                    value={text}
                    onChange={e => onChange(e)}
                  ></textarea>
                  <div className="rating-paws-love">
                    <Rating
                      initialRating={values.score}
                      className="paws-love"
                      direction={'rtl'}
                      emptySymbol={
                        <img src={emptyStar} className="icon-paw-love" />
                      }
                      fullSymbol={
                        <img src={fullStar} className="icon-paw-love" />
                      }
                      onChange={e => handleRating(e)}
                    />
                  </div>
                </div>
                <div className="add-review-btn">
                  <button type="submit" className="add-review-submit">
                    שליחה
                  </button>
                  {showError()}
                </div>
                <hr></hr>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <p>בשביל לכתוב חוות דעת עליך להתחבר</p>
            <Link to="/login">לחץ כאן להתחברות</Link>
          </div>
        )
      ) : null}
      <section className="users-review">
        <div className="review-container">
          {!comments ? (
            <p>תהיה הראשון שכותב בקורת לבעל מקצוע זה</p>
          ) : (
            comments.map((c, i) => (
              <div className="user-review" key={i}>
                <div className="user-img">
                  {!c.imageUrl && typeof c.imageUrl === 'undefined' ? (
                    <img src={u2} alt="user" />
                  ) : (
                    <img src={c.imageUrl} alt="user" />
                  )}
                </div>
                <div className="wrap-user-review">
                  <div className="user-opinion">
                    <h2>{c.name}</h2>
                    <p>{c.text}</p>
                  </div>
                  <div className="points">
                    {handleDate(c.date)}
                    <div className="stars">
                      <Rating
                        initialRating={c.score}
                        direction={'rtl'}
                        emptySymbol={
                          <img src={emptyStar} className="icon-paw-love" />
                        }
                        fullSymbol={
                          <img src={fullStar} className="icon-paw-love" />
                        }
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default ProReview;
