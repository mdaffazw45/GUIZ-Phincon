/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddAPhoto } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { createStructuredSelector } from 'reselect';

import BackButton from '@components/BackButton';
import { getUserById } from '@containers/Client/actions';
import { selectToken, selectUser } from '@containers/Client/selectors';

import classes from './style.module.scss';
import { updateProfile } from './action';

const UpdateProfile = ({ token, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    avatar: user?.avatar || '',
    username: user?.username || '',
    email: user?.email || '',
  });
  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(getUserById(token));
  }, [dispatch, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = () => {
    try {
      const newFormData = new FormData();
      if (fileInputRef.current?.files[0]) {
        newFormData.append('avatar', fileInputRef.current.files[0]);
      }
      newFormData.append('username', formData.username);
      newFormData.append('email', formData.email);

      dispatch(
        updateProfile(newFormData, token, (response) => {
          navigate(`/profile/${response.username}`);
        })
      );
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__back}>
        <BackButton />
      </div>
      <div className={classes.container__header}>
        <div className={classes.content}>
          <div className={classes.title}>
            <FormattedMessage id="app_profile_edit" />
          </div>
          <div className={classes.body}>
            <div className={classes.body__left}>
              <div className={classes.avatarContainer} onClick={handleAvatarClick}>
                {formData.avatar ? (
                  <img
                    src={
                      formData.avatar.startsWith('blob')
                        ? formData.avatar
                        : `${import.meta.env.VITE_API_BASE_URL}${formData.avatar}`
                    }
                    alt="Avatar"
                    className={classes.avatar}
                  />
                ) : (
                  <IconButton className={classes.avatarIcon}>
                    <AddAPhoto className={classes.addPhotoIcon} />
                  </IconButton>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </div>
            </div>
            <div className={classes.body__right}>
              <div className={classes.username}>
                <FormattedMessage id="app_username" />
              </div>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />

              <div className={classes.email}>
                <FormattedMessage id="app_email" />
              </div>
              <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div className={classes.save}>
            <button onClick={handleSubmit}>
              <FormattedMessage id="app_save" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateProfile.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  token: selectToken,
});

export default connect(mapStateToProps)(UpdateProfile);
