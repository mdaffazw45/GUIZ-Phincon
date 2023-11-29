/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';
import { forgotRequest } from './actions';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleSendPassword = () => {
    dispatch(forgotRequest({ email }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__hero} />
      <div className={classes.container__body}>
        <div className={classes.form}>
          <div className={classes.form__title}>
            <div className={classes.title1}>
              <FormattedMessage id="app_forgot_password_title" />
            </div>
            <div className={classes.subTitle}>
              <FormattedMessage id="app_forgot_password_subTitle" />
            </div>
          </div>
          <div className={classes.form__body}>
            <div className={classes.email}>
              <FormattedMessage id="app_login_email" />
            </div>
            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button className={classes.button} onClick={handleSendPassword}>
              <FormattedMessage id="app_forgot_password_send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
