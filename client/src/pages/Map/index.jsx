import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { connect, useDispatch } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate, useParams } from 'react-router-dom';
// import questions from './question.json';

import { selectToken } from '@containers/Client/selectors';
import { selectQuiz } from './selectors';
import { finishQuizAction, getQuizById } from './actions';

import classes from './style.module.scss';

const MySwal = withReactContent(Swal);

// const shuffleArray = (array) => {
//   const shuffledArray = [...array];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// };

const Map = ({ quiz, token }) => {
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
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  // const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [mapPosition, setMapPosition] = useState({
    zoom: 1,
    center: [20, 0],
  });
  const questions = quiz?.questions;

  const resetQuiz = () => {
    setScore(0);
    setIsQuizFinished(false);

    // setShuffledQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
    setMapPosition({ zoom: 1, center: [0, 0] });
    toast('Quiz Reset', {
      icon: '🔄',
    });
  };
  const finishQuiz = (finalScore) => {
    setIsQuizFinished(true);
    MySwal.fire({
      title: 'Congratulations!',
      text: `You've completed the quiz with a score of ${finalScore}!`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Back to Home',
      cancelButtonText: 'Restart Game',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        resetQuiz();
      }
    });
    dispatch(finishQuizAction(quiz?.id, { score: finalScore }, token));
  };

  const handleGeographyClick = (geo) => {
    if (isQuizFinished || !questions) {
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      return;
    }

    const { answer } = currentQuestion;
    const countryName = geo.properties.name;

    const nextQuestionIndex = currentQuestionIndex + 1;
    const isLastQuestion = nextQuestionIndex >= questions.length;

    if (countryName === answer) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (isLastQuestion) {
          finishQuiz(newScore);
        }
        return newScore;
      });
      toast.success(`Correct! It is ${countryName}.`);
    } else {
      // Incorrect answer
      toast.error(`Incorrect. The correct answer is ${answer}. You selected ${countryName}`);
      if (isLastQuestion) {
        finishQuiz(score);
      }
    }

    if (!isLastQuestion) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };
  return (
    <div className={classes.mainContainer}>
      {questions && (
        <>
          <div className={classes.sidebar}>
            <div className={classes.score}>
              Score: {score}/{questions.length}
            </div>
            <div className={classes.reset} onClick={resetQuiz}>
              Reset
            </div>
          </div>
          <div className={classes.questionContainer}>
            <div>{questions[currentQuestionIndex]?.content}</div>
          </div>

          <div className={classes.mapContainer}>
            <ComposableMap className={classes.mapStyle} projection="geoMercator">
              <ZoomableGroup zoom={mapPosition.zoom} center={mapPosition.center}>
                <Geographies geography={geoUrl} className={classes.geographies}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleGeographyClick(geo)}
                        className={classes.geography}
                        style={{
                          default: {
                            fill: 'green',
                            stroke: '#000',
                            strokeWidth: 0.2,
                          },
                          hover: {
                            fill: 'darkgreen',
                            stroke: '#DDD',
                            strokeWidth: 0.75,
                          },
                          pressed: {
                            fill: 'greenyellow',
                            stroke: '#DDD',
                            strokeWidth: 0.75,
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </>
      )}
    </div>
  );
};

Map.propTypes = {
  quiz: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  quiz: selectQuiz,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(Map));
