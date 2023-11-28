/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { loginRequest } from '@containers/Client/actions';

import classes from './style.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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

  const handleLogin = () => {
    dispatch(loginRequest(formData));
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__hero} />
      <div className={classes.container__body}>
        <div className={classes.form}>
          <div className={classes.form__title}>
            <div className={classes.title1}>
              <FormattedMessage id="app_login_title" />
            </div>
            <div className={classes.subTitle}>
              <FormattedMessage id="app_login_subTitle" />
            </div>
          </div>
          <div className={classes.form__body}>
            <div className={classes.email}>
              <FormattedMessage id="app_login_email" />
            </div>
            <input type="text" id="email" name="email" value={formData.email} onChange={handleInput} />

            <div className={classes.password}>
              <FormattedMessage id="app_login_password" />
            </div>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInput} />

            <button className={classes.button} onClick={handleLogin}>
              <FormattedMessage id="app_login_button" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
