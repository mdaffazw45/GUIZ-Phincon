import PropTypes from 'prop-types';

import { useState } from 'react';
import { AddCommentOutlined, Clear, Quiz } from '@mui/icons-material';
import BackButton from '@components/BackButton';

import classes from './style.module.scss';

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    questions: [],
  });

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
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][name] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch quizData and token
    console.log(quizData);
  };

  return (
    <div className={classes.page}>
      <BackButton />
      <div className={classes.container}>
        <div className={classes.container__header}>Create a quiz</div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={`${classes.form__title} ${classes.form_item}`}>
            <label htmlFor="title" className={classes.form_label}>
              Title
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
              Description
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
            <Quiz /> Questions
          </div>
          {quizData.questions.map((question, index) => (
            <div key={index} className={classes.question__item}>
              <div className={`${classes.form_item_wrapper}`}>
                <div className={`${classes.form_item}`}>
                  <label htmlFor={`content${index}`} className={classes.form_label}>
                    Question {index + 1}
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
                    Answer
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
            <AddCommentOutlined /> <div className={classes.form__add__text}>Add Question</div>
          </div>
          <button className={classes.form__create} type="submit">
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
