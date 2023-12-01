/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import BackButton from '@components/BackButton';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { selectHistory } from './selectors';
import { Edit, Key } from '@mui/icons-material';

import { useEffect } from 'react';
import { getUserByUsername  , getHistoryByUser } from './action';

import classes from './style.module.scss';

const Profile = ({ user, history , token }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(getHistoryByUser(token));

  }, [dispatch, token]);

  console.log(history , 'History')

  const navigateUpdate = () => {
    navigate('/profile/update');
  };

  const navigateChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className={classes.container}>
      <div className={classes.container__back}>
        <BackButton />
      </div>
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
      <div className={classes.quizHistory}>
        <h1>Quiz History</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quiz Title</TableCell>
                <TableCell align="center">No. of Questions</TableCell>
                <TableCell align="center">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.quiz.title}</TableCell>
                  <TableCell align="center">{item.quiz.noOfQuestions}</TableCell>
                  <TableCell align="center">{item.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  history : PropTypes.array,
  token : PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  history:selectHistory,
  token: selectToken
});

export default connect(mapStateToProps)(Profile);
