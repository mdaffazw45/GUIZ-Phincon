import { Quiz } from '@mui/icons-material';
import classes from './style.module.scss';

const QuizCard = () => (
  <div className={classes.card}>
    <div className={classes.card__title}>Lorem ipsum dolor sit amet consectetur</div>
    <div className={classes.card__description}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nesciunt quaerat cupiditate nisi sunt officia
      nostrum ex debitis
    </div>
    <div className={classes.card__question_number}>
      <Quiz /> 10 questions
    </div>
    <button type="button" className={classes.card__button}>
      Start Quiz
    </button>
  </div>
);

export default QuizCard;
