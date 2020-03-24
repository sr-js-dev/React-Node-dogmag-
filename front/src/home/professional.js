import React from 'react';
import { Link } from 'react-router-dom';

import dogTraining from '../icon/dog-trainingOrange.png';
import fingers from '../img/fingers.jpg';
import petShop from '../icon/pet-shopOrange.png';
import veterinarian from '../icon/veterinarianOrange.png';
import dogHouse from '../icon/dog-houseOrange.png';
import dogWalking from '../icon/walking-with-dogOrange.png';
import dogScissors from '../icon/scissorsOrange.png';

const BestProfessional = () => (
  <section className="professional">
    <div className="container-professional">
      <div className="search-professional">
        <div className="search-professional-center">
          <p>רקסי לך תביא...</p>
          <select>
            <option value="notrh">וטרינרים</option>
            <option value="saab">מאלפי כלבים</option>
            <option value="mercedes">פנסיונים</option>
            <option value="audi">דוגווקרים</option>
            <option value="audi">מספרות</option>
            <option value="audi">חנויות</option>
          </select>
          <select>
            <option value="notrh">צפון</option>
            <option value="saab">חיפה</option>
            <option value="mercedes">תל אביב</option>
            <option value="audi">ירושלים</option>
            <option value="audi">דרום</option>
          </select>
          <button className="search-btn">רוץ!</button>
        </div>
      </div>
      <div className="best-professional">
        <div className="professional-section1">
          <div className="trainer">
            <div className="icon-professional">
              <img src={dogTraining} alt="dog training" />
            </div>
            <div className="wrap-professional">
              <div className="professional-headline">
                <p>מאלפים מומלצים</p>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link href="#">סר רוברט האמיץ</Link>
                  <p>חיפה, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link href="#">ד"ר סנדה פושפוש</Link>
                  <p>בית לחם הגלילית, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link href="#">ג'וני עכבר המעבדה</Link>
                  <p>ת"א עיר מסריחה</p>
                </div>
              </div>
              <div className="professional-links-more">
                <div className="professional-links-more">
                  <Link href="#">לכל המאלפים &raquo;</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="trainer">
            <div className="icon-professional">
              <img src={veterinarian} alt="dog veterinarian" />
            </div>
            <div className="wrap-professional">
              <div className="professional-headline">
                <p>וטרינרים מומלצים</p>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link href="#">סר רוברט האמיץ</Link>
                  <p>חיפה, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link href="#">ד"ר סנדה פושפוש</Link>
                  <p>בית לחם הגלילית, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link href="#">ג'וני עכבר המעבדה</Link>
                  <p>ת"א עיר מסריחה</p>
                </div>
              </div>
              <div className="professional-links-more">
                <div className="professional-links-more">
                  <Link href="#">לכל הוטרינרים &raquo;</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="professional-section2">
          <div className="trainer">
            <div className="icon-professional">
              <img src={dogHouse} alt="dog home" />
            </div>
            <div className="wrap-professional">
              <div className="professional-headline">
                <p>פנסיונים מומלצים</p>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link href="#">סר רוברט האמיץ</Link>
                  <p>חיפה, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link href="#">ד"ר סנדה פושפוש</Link>
                  <p>בית לחם הגלילית, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link href="#">ג'וני עכבר המעבדה</Link>
                  <p>ת"א עיר מסריחה</p>
                </div>
              </div>
              <div className="professional-links-more">
                <div className="professional-links-more">
                  <Link href="#">עוד &raquo;</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="trainer">
            <div className="icon-professional">
              <img src={dogWalking} alt="dog walking" />
            </div>
            <div className="wrap-professional">
              <div className="professional-headline">
                <p>דוגווקרים מומלצים</p>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link to="#">סר רוברט האמיץ</Link>
                  <p>חיפה, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link to="#">ד"ר סנדה פושפוש</Link>
                  <p>בית לחם הגלילית, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link to="#">ג'וני עכבר המעבדה</Link>
                  <p>ת"א עיר מסריחה</p>
                </div>
              </div>
              <div className="professional-links-more">
                <div className="professional-links-more">
                  <Link to="#">עוד &raquo;</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="professional-section3">
          <div className="trainer">
            <div className="icon-professional">
              <img src={dogScissors} alt="dog scissors" />
            </div>
            <div className="wrap-professional">
              <div className="professional-headline">
                <p>מספרות מומלצות</p>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link to="#">סר רוברט האמיץ</Link>
                  <p>חיפה, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link to="#">ד"ר סנדה פושפוש</Link>
                  <p>בית לחם הגלילית, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link to="#">ג'וני עכבר המעבדה</Link>
                  <p>ת"א עיר מסריחה</p>
                </div>
              </div>
              <div className="professional-links-more">
                <div className="professional-links-more">
                  <Link to="#">עוד &raquo;</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="trainer">
            <div className="icon-professional">
              <img src={petShop} alt="dog shop" />
            </div>
            <div className="wrap-professional">
              <div className="professional-headline">
                <p>חנויות מומלצות</p>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link to="#">סר רוברט האמיץ</Link>
                  <p>חיפה, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link to="#">ד"ר סנדה פושפוש</Link>
                  <p>בית לחם הגלילית, קריות</p>
                </div>
              </div>
              <div className="professional-links">
                <div className="professional-links-img">
                  <img src={fingers} alt="professional" />
                </div>
                <div className="professional-links-details">
                  <Link to="#">ג'וני עכבר המעבדה</Link>
                  <p>ת"א עיר מסריחה</p>
                </div>
              </div>
              <div className="professional-links-more">
                <div className="professional-links-more">
                  <Link to="#">עוד &raquo;</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BestProfessional;
