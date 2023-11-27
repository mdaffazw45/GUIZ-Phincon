import { ArrowRight } from '@mui/icons-material';
import QuizCard from '@components/QuizCard';

import classes from './style.module.scss';

const Home = () => (
  <div className={classes.container}>
    <div className={classes.container__hero}>
      <div className={classes.content}>
        <div className={classes.content__title}>Explore the World, Challenge Your Mind.</div>
        <div className={classes.content__subtitle}>
          Embark on exciting geography quizzes and discover fascinating facts about our world!
        </div>
        <div className={classes.content__button}>
          <span>Explore Now</span>
          <ArrowRight className={classes.content__button__icon} />
        </div>
      </div>
    </div>
    <div className={classes.container__section}>
      <div className={classes.header}>
        <div className={classes.header__title}>Explore Quizzes</div>
        <div className={classes.header__subtitle}>Dive into Our Curated Geography Quizzes</div>
      </div>
      <div className={classes.content}>
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </div>
    </div>
  </div>
);

export default Home;
