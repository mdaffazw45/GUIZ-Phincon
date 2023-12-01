/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Email } from '@mui/icons-material';

import classes from './style.module.scss';
import { forgotRequest } from './actions';

const ForgotPassword = ({ intl: { formatMessage } }) => {
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
            <div className={classes.formForgot}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button className={classes.button} onClick={handleSendPassword}>
              <FormattedMessage id="app_forgot_password_send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(ForgotPassword);
