import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import { Star } from '@mui/icons-material';

import ProfileIcon from '@static/images/profile.svg';

import classes from './style.module.scss';

const LeaderboardItem = ({ userWithTotalScore }) => (
  <div className={`${classes.item} ${userWithTotalScore.rankClass}`}>
    <div className={classes.item__left}>
      <div className={classes.rank}>{userWithTotalScore?.rank}</div>
      <div className={classes.user}>
        <Avatar src={ProfileIcon} className={classes.user__avatar} />
        <div className={classes.user__name}>{userWithTotalScore?.user?.username}</div>
      </div>
    </div>
    <div className={classes.score}>
      <Star />
      {userWithTotalScore?.totalScore}
    </div>
  </div>
);

LeaderboardItem.propTypes = {
  userWithTotalScore: PropTypes.object,
};

export default LeaderboardItem;
