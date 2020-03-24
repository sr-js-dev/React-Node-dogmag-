import React, { useEffect, useState, useCallback } from 'react';
import DropZone, { useDropzone } from 'react-dropzone';
import { isAuthenticated } from './../action/auth';
import { getProfile } from '../action/professional';
import { updateGallery, addGallery, getGallery } from '../action/gallery';
import { Redirect } from 'react-router-dom';

const CreatePreview = file => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      resolve(dataURL);
    };
    reader.readAsDataURL(file);
  });
};

const AddGallery = () => {
  const [values, setValues] = useState({
    photo1: '',
    photo2: '',
    photo3: '',
    photo4: '',
    photo5: '',
    photo6: '',
    photo7: '',
    photo8: '',
    loading: false,
    redirectToProfile: false
  });

  const [photoPreview, setPhotoPreview] = useState({
    photo1: '',
    photo2: '',
    photo3: '',
    photo4: '',
    photo5: '',
    photo6: '',
    photo7: '',
    photo8: ''
  });

  const { loading, redirectToProfile } = values;
  let formData = new FormData();

  const { user, token } = isAuthenticated();

  const [error, setError] = useState(false);
  const [profile, setProfile] = useState();
  const [gallery, setGallery] = useState();

  const loadProfile = () => {
    getProfile(user._id).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProfile(data);
        setValues({ ...values });
      }
    });
  };

  const loadGallery = () => {
    getGallery(user._id).then(data => {
      if (data.error) {
        console.log('error', data);
        setError(data.error);
      } else {
        setGallery(data);
      }
    });
  };

  useEffect(() => {
    loadProfile();
    loadGallery();
  }, []);

  const showError = () => (
    <div>{error.error ? console.log('err:', error) : null}</div>
  );

  const showLoading = () =>
    loading && (
      <div className="show-loading">
        <h2>טוען...</h2>
      </div>
    );
  const redirectUser = () => {
    if (redirectToProfile) {
      return <Redirect to="/" />;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    setError({ error: '' });

    let totalFiles = 0;
    for (let fileIndex = 1; fileIndex <= 8; fileIndex++) {
      let photoName = `photo${fileIndex}`;
      if (values[photoName]) {
        formData.set(photoName, values[photoName]);
        totalFiles++;
      }
    }

    if (totalFiles <= 2) {
      setValues({ ...values, loading: false });
      setError({ error: 'בחר מינימום 3 קבצים.' });
      return true;
    }

    if (gallery) {
      updateGallery(profile.user, user._id, token, formData).then(data => {
        if (typeof data.error !== 'undefined' && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            photo1: '',
            photo2: '',
            photo3: '',
            photo4: '',
            photo5: '',
            photo6: '',
            photo7: '',
            photo8: '',
            loading: false,
            redirectToProfile: true
          });
        }
      });
    } else {
      addGallery(user._id, token, formData).then(data => {
        if (typeof data.error !== 'undefined' && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            photo1: '',
            photo2: '',
            photo3: '',
            photo4: '',
            photo5: '',
            photo6: '',
            photo7: '',
            photo8: '',
            loading: false,
            redirectToProfile: true
          });
        }
      });
    }
  };

  const onDrop = useCallback(async acceptedFiles => {
    setError({ error: '' });
    if (acceptedFiles.length > 8) {
      setError({
        error: 'you can only upload 8 photo other photos will be ignored.'
      });
    }

    let acceptedIndex = 0;
    let nsgPhotoValue = values;
    let nsgPhotoPreview = photoPreview;
    for (let fileIndex = 1; fileIndex <= 8; fileIndex++) {
      let photoName = `photo${fileIndex}`;
      let nsgFile = acceptedFiles[acceptedIndex];
      if (!values[photoName] && acceptedFiles[acceptedIndex]) {
        // formData.set(photoName, nsgFile);
        nsgPhotoValue[photoName] = nsgFile;
        acceptedIndex++;
        let nsgPreview = await CreatePreview(nsgFile);
        nsgPhotoPreview[photoName] = nsgPreview;
      }
    }
    setValues({ ...values, ...nsgPhotoValue });
    setPhotoPreview(nsgPhotoPreview);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 900000,
    accept: 'image/*'
  });

  let fileList = [];
  for (let fileIndex = 1; fileIndex <= 8; fileIndex++) {
    let photoName = `photo${fileIndex}`;
    let nsgPhoto = values[photoName];
    if (nsgPhoto) {
      fileList.push(
        <div>
          <img
            style={{ width: 200, height: 200 }}
            src={photoPreview[photoName]}
          />
          {nsgPhoto.name}
          <button
            type="button"
            onClick={() => {
              formData.set(photoName, '');
              setValues({ ...values, [photoName]: '' });
            }}
          >
            Remove
          </button>
        </div>
      );
    }
    // const element = array[fileIndex];
  }
  return (
    <section className="addPro">
      {showLoading()}
      {showError()}
      {error && <div>{error.error}</div>}
      <div className="addPro-container">
        <form className="addPro-form" onSubmit={e => onSubmit(e)}>
          {profile ? <h1> שם החברה: {profile.companyName} </h1> : 'שלום'}
          <h3>גלרית תמונות:</h3>

          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>גרור ושחרר קובץ לכאן, או לחץ כדי לבחור קובץ</p>
            <small>
              עליכם להעלות 3 תמונות מינימליות ויכולים לבחור 8 תמונות לכל היותר
            </small>
          </div>

          {fileList}

          <div className="addPro-row">
            <button type="submit" className="addPro-submit">
              עדכן
            </button>
          </div>
        </form>
      </div>
      {redirectUser()}
    </section>
  );
};

export default AddGallery;
