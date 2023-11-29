import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { connect, useDispatch } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate, useParams } from 'react-router-dom';
import questions from './question.json';

import { selectQuiz } from './selectors';
import classes from './style.module.scss';
import { getQuizById } from './actions';

const MySwal = withReactContent(Swal);

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Map = ({ quiz }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getQuizById(id));
    }
  }, [id, dispatch]);

  const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(true);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const resetQuiz = () => {
    setScore(0);
    setIsQuizFinished(false);

    setShuffledQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
  };

  const handleGeographyClick = (geo) => {
    if (isQuizFinished || !quiz.questions) {
      return;
    }
    
    const currentQuestion = quiz.questions[currentQuestionIndex];
    console.log(currentQuestion, 'Current Question')
    if (!currentQuestion) {
      return;
    }
  
    const { answer, question } = currentQuestion;
    const countryName = geo.properties.name;
    console.log(countryName , 'Nama Negara')
    if (countryName === answer) {
      // Correct answer
      setScore((prevScore) => prevScore + 1);
      toast.success(`Correct! The country with the question "${quiz?.questions && quiz?.questions[currentQuestionIndex]?.content}" is ${countryName}.`);
    } else {
      // Incorrect answer
      toast.error(`Incorrect. The correct answer is ${answer}.`);
    }
  
    const nextQuestionIndex = currentQuestionIndex + 1;
  
    if (nextQuestionIndex < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      finishQuiz();
    }
  };
  
  
  const updateScoreAndDisplayToast = (isCorrect, question, countryName) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      toast.success(`Correct! The country with the question "${quiz?.questions && quiz?.questions[currentQuestionIndex]?.content}" is ${countryName}.`);
    } else {
      toast.error(`Incorrect. The correct answer is ${question.country}.`);
    }
  };
  
  const finishQuiz = () => {
    setIsQuizFinished(true);
    MySwal.fire({
      title: 'Congratulations!',
      text: `You've completed the quiz with a score of ${score}!`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Back to Home',
      cancelButtonText: 'Reset Game',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        resetQuiz();
      }
    });
  };


  console.log(quiz?.questions && quiz?.questions[0], 'quiz?.questions[currentQuestionIndex]');
  return (
    <div className={classes.mainContainer}>
      <div className={classes.questionContainer}>
        <h1>World Map Quiz</h1>
        <p>Score: {score}</p>
        <p>{quiz?.questions && quiz?.questions[currentQuestionIndex]?.content}?</p>
      </div>
      <div className={classes.mapContainer}>
        <ComposableMap width={800} height={600} projectionConfig={{ scale: 130 }} className={classes.mapStyle}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleGeographyClick(geo)}
                  className={classes.geography}
                  style={{
                    default: {
                      fill: 'yellow',
                      stroke: '#000',
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: 'orange',
                      stroke: '#DDD',
                      strokeWidth: 0.75,
                    },
                    pressed: {
                      fill: 'green',
                      stroke: '#DDD',
                      strokeWidth: 0.75,
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

Map.propTypes = {
  quiz: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  quiz: selectQuiz,
});

export default injectIntl(connect(mapStateToProps)(Map));
