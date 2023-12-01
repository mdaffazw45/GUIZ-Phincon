import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import LeaderboardItem from '@components/LeaderboardItem';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { LeaderboardOutlined } from '@mui/icons-material';

import BackButton from '@components/BackButton';
import { selectToken } from '@containers/Client/selectors';
import { selectUsersWithTotalScore } from './selectors';
import { getAllUsersTotalScore } from './actions';

import classes from './style.module.scss';

const Leaderboard = ({ usersWithTotalScore, token, intl: { formatMessage } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      toast.error(formatMessage({ id: 'app_must_login' }));
    } else {
      dispatch(getAllUsersTotalScore());
    }
  }, [dispatch, formatMessage, token]);

  const getRankClass = (rank) => {
    if (rank === 1) {
      return classes.goldRank;
    }
    if (rank === 2) {
      return classes.silverRank;
    }
    if (rank === 3) {
      return classes.bronzeRank;
    }
    return '';
  };

  const sortedUsersWithRanks = usersWithTotalScore
    ?.slice()
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((userWithTotalScore, index) => ({
      ...userWithTotalScore,
      rank: index + 1,
      rankClass: getRankClass(index + 1),
    }));

  return (
    <div className={classes.container}>
      <div className={classes.back}>
        <BackButton />
      </div>

      <div className={classes.title}>
        <LeaderboardOutlined />
        <FormattedMessage id="app_leaderboard" />
      </div>
      <div className={classes.leaderboardContainer}>
        <div className={classes.leaderboard}>
          {sortedUsersWithRanks?.map((userWithTotalScore) => (
            <LeaderboardItem userWithTotalScore={userWithTotalScore} key={userWithTotalScore.userId} />
          ))}
        </div>
      </div>
    </div>
  );
};

Leaderboard.propTypes = {
  usersWithTotalScore: PropTypes.array,
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  usersWithTotalScore: selectUsersWithTotalScore,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(Leaderboard));
