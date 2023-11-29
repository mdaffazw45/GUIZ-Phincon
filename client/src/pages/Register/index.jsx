/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { registerRequest } from '@containers/Client/actions';

import classes from './style.module.scss';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = () => {
    dispatch(registerRequest(formData));
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__hero} />
      <div className={classes.container__body}>
        <div className={classes.form}>
          {/* <div className={classes.form__img}> Gambar GUIZ </div> */}
          <div className={classes.form__title}>
            <div className={classes.title1}>
              <FormattedMessage id="app_register_title" />
            </div>
            <div className={classes.subTitle}>
              <FormattedMessage id="app_register_subTitle" />
            </div>
          </div>
          <div className={classes.form__body}>
            <div className={classes.username}>
              <FormattedMessage id="app_register_username" />
            </div>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleInput} />

            <div className={classes.email}>
              <FormattedMessage id="app_register_email" />
            </div>
            <input type="text" id="email" name="email" value={formData.email} onChange={handleInput} />

            <div className={classes.password}>
              <FormattedMessage id="app_register_password" />
            </div>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInput} />

            <button className={classes.button} onClick={handleRegister}>
              <FormattedMessage id="app_register_button" />
            </button>

            <div className={classes.account}>
              <div className={classes.account__have}>
                <FormattedMessage id="app_register_already" />
              </div>
              <div>
                <FormattedMessage id="app_register_login" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
