import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { East } from '@mui/icons-material';

import QuizCard from '@components/QuizCard';

import { selectQuizzes } from './selectors';
import { getAllQuizzes } from './actions';

import classes from './style.module.scss';

const Home = ({ quizzes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllQuizzes());
  }, [dispatch]);

  // Render for admin
  // return (
  //   <div className={classes.admin}>
  //     <button type="button" onClick={() => navigate('/quiz/create')}>
  //       Create Quiz
  //     </button>
  //   </div>
  // );

  return (
    <div className={classes.container}>
      <div className={classes.container__hero}>
        <div className={classes.content}>
          <div className={classes.content__title}>
            <FormattedMessage id="app_hero_title" />
          </div>
          <div className={classes.content__subtitle}>
            <FormattedMessage id="app_hero_subtitle" />
          </div>
          <div className={classes.content__button}>
            <span>
              <FormattedMessage id="app_hero_button" />
            </span>
            <East className={classes.content__button__icon} />
          </div>
        </div>
      </div>
      <div className={classes.container__section}>
        <div className={classes.header}>
          <div className={classes.header__title}>
            <FormattedMessage id="app_home_section_title" />
          </div>
          <div className={classes.header__subtitle}>
            <FormattedMessage id="app_home_section_subtitle" />
          </div>
        </div>
        <div className={classes.content}>
          {quizzes.map((quiz) => (
            <QuizCard key={quiz?.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  quizzes: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  quizzes: selectQuizzes,
});

export default connect(mapStateToProps)(Home);
