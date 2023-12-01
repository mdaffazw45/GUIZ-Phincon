/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Lock } from '@mui/icons-material';

import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';
import { changeRequest } from './actions';

const ChangePassword = ({ token, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    const data = {
      currentPassword,
      newPassword,
    };
    dispatch(changeRequest(data, token));
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__hero} />
      <div className={classes.container__body}>
        <div className={classes.form}>
          <div className={classes.form__title}>
            <div className={classes.title1}>
              <FormattedMessage id="app_change_password_title" />
            </div>
            <div className={classes.subTitle}>
              <FormattedMessage id="app_change_password_subTitle" />
            </div>
          </div>
          <div className={classes.form__body}>
            {/* Current Password */}
            <div className={classes.formCurrentPass}>
              <div className={classes.currentPassword}>
                <FormattedMessage id="app_change_password_current" />
              </div>
              <div className={classes.inputWithIcon}>
                <Lock />
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder={formatMessage({ id: 'app_placeholder_password' })}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>

            {/* New Password */}
            <div className={classes.formNewPass}>
              <div className={classes.newPassword}>
                <FormattedMessage id="app_change_password_new" />
              </div>
              <div className={classes.inputWithIcon}>
                <Lock />
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder={formatMessage({ id: 'app_placeholder_password' })}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <button className={classes.button} onClick={handleChangePassword}>
              <FormattedMessage id="app_change_password_save" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(ChangePassword));
