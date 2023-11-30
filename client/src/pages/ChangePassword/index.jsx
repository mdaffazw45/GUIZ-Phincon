/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';
import { changeRequest } from './actions';

const ChangePassword = ({ token }) => {
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
            <div className={classes.currentPassword}>
              <FormattedMessage id="app_change_password_current" />
            </div>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <div className={classes.newPassword}>
              <FormattedMessage id="app_change_password_new" />
            </div>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

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
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(ChangePassword);
