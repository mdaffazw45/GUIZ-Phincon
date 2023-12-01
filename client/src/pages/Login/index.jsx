/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
// import { InputAdornment } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';

import { loginRequest } from '@containers/Client/actions';
import { selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Login = ({ token, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

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

  const handleToRegister = () => {
    navigate('/register');
  };

  const handleToResetPassword = () => {
    navigate('/forgot-password');
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
            {/* Email */}
            <div className={classes.formEmail}>
              <div className={classes.email}>
                <FormattedMessage id="app_login_email" />
              </div>
              <div className={classes.inputWithIcon}>
                <Email />
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder={formatMessage({ id: 'app_placeholder_email' })}
                  value={formData.email}
                  onChange={handleInput}
                />
              </div>
            </div>

            {/* Password */}
            <div className={classes.formPassword}>
              <div className={classes.password}>
                <FormattedMessage id="app_login_password" />
                <div className={classes.password__forgot} onClick={handleToResetPassword}>
                  <FormattedMessage id="app_login_forgot_password" />
                </div>
              </div>
              <div className={classes.inputWithIcon}>
                <Lock />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={formatMessage({ id: 'app_placeholder_password' })}
                  value={formData.password}
                  onChange={handleInput}
                />
              </div>
            </div>

            <button className={classes.button} onClick={handleLogin}>
              <FormattedMessage id="app_login_button" />
            </button>

            <div className={classes.account}>
              <div className={classes.account__have}>
                <FormattedMessage id="app_login_already" />
              </div>
              <div className={classes.account__register} onClick={handleToRegister}>
                <FormattedMessage id="app_login_register" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(Login));
