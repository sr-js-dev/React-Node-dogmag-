import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfession } from '../action/profession';
import ShowImage from '../const/showImage';

const ProfessionalsType = ({ handleChecked }) => {
  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState(false);
  const [active, setActive] = useState('');

  const init = () => {
    getProfession().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProfessions(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleType = p => () => {
    if (p._id === active) {
      handleChecked('empty');
      setActive('');
    } else {
      handleChecked(p);
      setActive(p._id);
    }
  };

  return (
    <section className="choose-professionals">
      <div className="container-choose-professionals">
        <h2>בחירת בעלי מקצוע</h2>
        <div className="wrap-professionals-icon">
          {professions.map((p, i) => (
            <div className="professionals-icon" key={i} onClick={handleType(p)}>
              {p._id === active ? (
                <Link to="#">
                  <ShowImage id={p._id} url="profession/photo" />
                  <h3>{p.professionName}</h3>
                </Link>
              ) : (
                <Link to="#">
                  <ShowImage id={p._id} url="profession/photog" />
                  <h3 className="hgray">{p.professionName}</h3>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsType;
