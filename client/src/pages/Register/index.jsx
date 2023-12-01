/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Email, Lock, Person } from '@mui/icons-material';

import { registerRequest } from '@containers/Client/actions';

import classes from './style.module.scss';

const Register = ({ intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleToLogin = () => {
    navigate('/login');
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
            {/* Username */}
            <div className={classes.formUsername}>
              <div className={classes.username}>
                <FormattedMessage id="app_register_username" />
              </div>
              <div className={classes.inputWithIcon}>
                <Person />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder={formatMessage({ id: 'app_placeholder_username' })}
                  value={formData.username}
                  onChange={handleInput}
                />
              </div>
            </div>

            {/* Email */}
            <div className={classes.formEmail}>
              <div className={classes.email}>
                <FormattedMessage id="app_register_email" />
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
                <FormattedMessage id="app_register_password" />
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

            <button className={classes.button} onClick={handleRegister}>
              <FormattedMessage id="app_register_button" />
            </button>

            <div className={classes.account}>
              <div className={classes.account__have}>
                <FormattedMessage id="app_register_already" />
              </div>
              <div className={classes.account__login} onClick={handleToLogin}>
                <FormattedMessage id="app_register_login" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(Register);
