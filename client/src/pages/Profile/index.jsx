/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';

import { createStructuredSelector } from 'reselect';
import { selectUser } from '@containers/Client/selectors';
import { Edit, Key } from '@mui/icons-material';

import { useEffect } from 'react';
import { getUserById } from '@containers/Client/actions';
import { getUserByUsername } from './action';

import classes from './style.module.scss';

const Profile = ({ user }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [dispatch, username]);

  const navigateUpdate = () => {
    navigate('/profile/update');
  };

  const navigateChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__header}>
        <div className={classes.content}>
          <Avatar className={classes.img} src={`${import.meta.env.VITE_API_BASE_URL}${user?.avatar}`} />
          <div className={classes.info}>
            <div className={classes.info__username}> {user?.username} </div>
            <div className={classes.info__email}> {user?.email} </div>
          </div>
          <div className={classes.button}>
            <button onClick={navigateUpdate}>
              <div className={classes.updateUser}>
                <Edit className={classes.edit} />
                <FormattedMessage id="app_profile_edit" />
              </div>
            </button>
            <button onClick={navigateChangePassword}>
              <div className={classes.changePassword}>
                <Key className={classes.password} />
                <FormattedMessage id="app_profile_change" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(Profile);
