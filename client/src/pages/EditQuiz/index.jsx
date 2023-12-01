import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';

import { AddCommentOutlined, Clear, Info, Quiz } from '@mui/icons-material';
import BackButton from '@components/BackButton';

import { selectRole, selectToken } from '@containers/Client/selectors';
import { getQuizById } from '@pages/Map/actions';
import { selectQuiz } from '@pages/Map/selectors';
import { selectActionSuccess } from '@pages/CreateQuiz/selectors';
import { resetActionSuccess } from '@pages/CreateQuiz/actions';
import { editQuizById } from './actions';

import classes from './style.module.scss';

const EditQuiz = ({ token, role, intl: { formatMessage }, quiz, actionSuccess }) => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    questions: [],
  });

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      toast.error(formatMessage({ id: 'app_access_denied' }));
    } else {
      dispatch(getQuizById(quizId));
    }
  }, [dispatch, formatMessage, navigate, quizId, role]);

  useEffect(() => {
    if (quiz) {
      setQuizData({
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions || [],
      });
    }
  }, [quiz]);

  useEffect(() => {
    if (actionSuccess) {
      navigate('/');
      dispatch(resetActionSuccess());
    }
  }, [actionSuccess, dispatch, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      content: '',
      answer: '',
    };
    setQuizData({ ...quizData, questions: [...quizData.questions, newQuestion] });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions.splice(index, 1);
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    setQuizData((prevQuizData) => {
      const updatedQuestions = prevQuizData.questions.map((question, idx) =>
        idx === index ? { ...question, [name]: value } : question
      );
      return { ...prevQuizData, questions: updatedQuestions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedQuestions = quizData.questions.map((question) => {
      question.id ? question : { ...question, id: null };
      const { id, content, answer } = question;
      return { id, content, answer };
    });
    dispatch(editQuizById(quizId, { ...quizData, questions: formattedQuestions }, token));
  };

  return (
    <div className={classes.page}>
      <BackButton />
      <div className={classes.container}>
        <div className={classes.container__header}>
          <FormattedMessage id="app_edit_quiz" />
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={`${classes.form__title} ${classes.form_item}`}>
            <label htmlFor="title" className={classes.form_label}>
              <FormattedMessage id="app_title" />
            </label>
            <input
              className={classes.input}
              type="text"
              id="title"
              name="title"
              value={quizData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${classes.form__description} ${classes.form_item}`}>
            <label htmlFor="description" className={classes.form_label}>
              <FormattedMessage id="app_description" />
            </label>
            <input
              className={classes.input}
              type="text"
              id="description"
              name="description"
              value={quizData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.question}>
            <Quiz /> <FormattedMessage id="app_questions" />
          </div>
          <div className={classes.info}>
            <Info /> <FormattedMessage id="app_note" />
          </div>
          {quizData.questions.map((question, index) => (
            <div key={index} className={classes.question__item}>
              <div className={`${classes.form_item_wrapper}`}>
                <div className={`${classes.form_item}`}>
                  <label htmlFor={`content${index}`} className={classes.form_label}>
                    <FormattedMessage id="app_question" /> {index + 1}
                  </label>
                  <input
                    className={classes.input}
                    type="text"
                    id={`content${index}`}
                    name="content"
                    value={question.content}
                    onChange={(e) => handleQuestionChange(index, e)}
                  />
                </div>
                <div className={`${classes.form_item}`}>
                  <label htmlFor={`answer${index}`} className={classes.form_label}>
                    <FormattedMessage id="app_answer" />
                  </label>
                  <input
                    className={classes.input}
                    type="text"
                    id={`answer${index}`}
                    name="answer"
                    value={question.answer}
                    onChange={(e) => handleQuestionChange(index, e)}
                  />
                </div>
              </div>
              <div className={classes.question__item__remove} onClick={() => handleRemoveQuestion(index)}>
                <Clear />
              </div>
            </div>
          ))}
          <div className={classes.form__add} onClick={handleAddQuestion}>
            <AddCommentOutlined />{' '}
            <div className={classes.form__add__text}>
              <FormattedMessage id="app_add_question" />
            </div>
          </div>
          <button className={classes.form__create} type="submit">
            <FormattedMessage id="app_save" />
          </button>
        </form>
      </div>
    </div>
  );
};

EditQuiz.propTypes = {
  token: PropTypes.string,
  role: PropTypes.string,
  intl: PropTypes.object,
  quiz: PropTypes.object,
  actionSuccess: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  role: selectRole,
  quiz: selectQuiz,
  actionSuccess: selectActionSuccess,
});

export default injectIntl(connect(mapStateToProps)(EditQuiz));
