import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Quiz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import classes from './style.module.scss';

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleQuizCardClick = () => {
    // Navigate to '/map/:id' where ':id' is the quiz id
    navigate(`/map/${quiz.id}`);
    console.log(quiz.id)
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
};

export default QuizCard;
