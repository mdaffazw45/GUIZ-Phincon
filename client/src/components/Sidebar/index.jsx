import PropTypes from 'prop-types';
import { Quiz, RestartAlt, Star, Timer } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const Sidebar = ({
  score,
  totalQuestions,
  resetQuiz,
  hoveredCountry,
  quizStarted,
  currentQuestionIndex,
  elapsedTime,
  timer,
}) => {
  let percentageScore = (score / totalQuestions) * 100;
  percentageScore = percentageScore % 1 === 0 ? percentageScore.toFixed(0) : percentageScore.toFixed(1);

  const getScoreColor = (percentage) => {
    const r = percentage < 50 ? 255 : Math.floor(255 - ((percentage * 2 - 100) * 255) / 100);
    const g = percentage > 50 ? 255 : Math.floor((percentage * 2 * 255) / 100);
    return `rgb(${r},${g},0)`;
  };

  const scoreColor = getScoreColor(percentageScore);

  return (
    <div className={classes.sidebar}>
      <div className={classes.country}>
        {!quizStarted && <div className={classes.country__name}>{hoveredCountry}</div>}
      </div>
      <div className={classes.elapsedTime}>
        <Timer />
        {quizStarted
          ? `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`
          : `${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toFixed(0).toString().padStart(2, '0')}`}
      </div>
      {quizStarted && (
        <div className={classes.question}>
          <Quiz /> <FormattedMessage id="app_question" /> {currentQuestionIndex + 1}/{totalQuestions}
        </div>
      )}
      <div className={classes.score}>
        <div className={classes.score__label}>
          <Star />
          <FormattedMessage id="app_score" />
        </div>
        <div className={classes.score__value} style={{ color: scoreColor }}>
          {percentageScore}%
        </div>
      </div>
      {quizStarted && (
        <div className={classes.reset} onClick={resetQuiz}>
          <RestartAlt /> <FormattedMessage id="app_reset" />
        </div>
      )}
    </div>
  );
};

Sidebar.propTypes = {
  score: PropTypes.number,
  totalQuestions: PropTypes.number,
  resetQuiz: PropTypes.func,
  hoveredCountry: PropTypes.string,
  quizStarted: PropTypes.bool,
  currentQuestionIndex: PropTypes.number,
  elapsedTime: PropTypes.number,
  timer: PropTypes.number,
};

export default Sidebar;
