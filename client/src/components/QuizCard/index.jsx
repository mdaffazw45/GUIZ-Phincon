import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Quiz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';

import classes from './style.module.scss';

const QuizCard = ({ quiz, token, intl: { formatMessage } }) => {
  const navigate = useNavigate();

  const handleQuizCardClick = () => {
    if (token) {
      navigate(`/map/${quiz.id}`);
    } else {
      toast.error(formatMessage({ id: 'app_need_login' }));
    }
  };

  return (
    <div className={classes.card}>
      <div className={classes.upper}>
        <div className={classes.upper__title}>{quiz?.title}</div>
        <div className={classes.upper__description}>{quiz?.description}</div>
      </div>
      <div className={classes.lower}>
        <div className={classes.lower__question_number}>
          <Quiz /> {quiz?.noOfQuestions} <FormattedMessage id="app_questions" />
        </div>
        <button type="button" className={classes.lower__button} onClick={handleQuizCardClick}>
          <FormattedMessage id="app_quiz_card_button" />
        </button>
      </div>
    </div>
  );
};

QuizCard.propTypes = {
  quiz: PropTypes.object,
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(QuizCard));
