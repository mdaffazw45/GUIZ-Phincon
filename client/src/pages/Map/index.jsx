import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { connect, useDispatch } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate, useParams } from 'react-router-dom';
import { SportsScore } from '@mui/icons-material';

import { finishQuiz, resetQuiz, startQuiz } from '@utils/quizLogic';
import CountryInfo from '@components/CountryInfo';
import Sidebar from '@components/Sidebar';
import QuizMap from '@components/QuizMap';

import { fetchCountryData } from '@domain/countriesApi';
import { selectToken } from '@containers/Client/selectors';
import { selectQuiz } from './selectors';
import { getQuizById } from './actions';

import classes from './style.module.scss';

const MySwal = withReactContent(Swal);

const Map = ({ quiz, token, intl: { formatMessage } }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [quizStarted, setQuizStarted] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoadingCountryData, setIsLoadingCountryData] = useState(false);
  const [selectedCountryName, setSelectedCountryName] = useState(null);
  const [mapPosition, setMapPosition] = useState({
    zoom: 1,
    center: [20, 0],
  });
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(0);

  const questions = quiz?.questions;

  useEffect(() => {
    if (id) {
      dispatch(getQuizById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    let interval;
    if (quizStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [quizStarted]);

  const handleReset = () => {
    resetQuiz(setScore, setQuizStarted, setCurrentQuestionIndex, setMapPosition, toast);
    setTimer(0);
  };

  const handleStart = () => {
    startQuiz(setQuizStarted, setScore);
    setStartTime(Date.now());
    setTimer(0);
    const interval = setInterval(() => {
      if (quizStarted) {
        const endTime = Date.now();
        const elapsed = (endTime - startTime) / 1000;
        setElapsedTime(elapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleFinish = (finalScore) => {
    const endTime = Date.now();
    const elapsed = (endTime - startTime) / 1000;
    setElapsedTime(elapsed);
    finishQuiz(
      setQuizStarted,
      setCurrentQuestionIndex,
      MySwal,
      navigate,
      dispatch,
      quiz?.id,
      finalScore,
      questions.length,
      token,
      formatMessage
    );
    setStartTime(null);
  };

  const fetchAndSetCountryData = async (countryName) => {
    setIsLoadingCountryData(true);

    try {
      const response = await fetchCountryData(countryName);
      const countryData = response[0];

      if (countryData) {
        setSelectedCountry({
          name: countryData?.name?.common,
          flag: countryData?.flags?.svg,
          capital: countryData?.capital[0],
          population: countryData?.population,
          area: countryData?.area,
        });
      }
    } catch (error) {
      toast.error(`${formatMessage({ id: 'app_country_not_found' })} ${countryName}`);
      setSelectedCountry(null);
    } finally {
      setIsLoadingCountryData(false);
    }
  };

  const updateScoreAndCheckFinish = (isCorrect, isLastQuestion, nextQuestionIndex, countryName) => {
    if (isCorrect) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        toast.success(`Correct! It is ${countryName}.`);
        if (isLastQuestion) handleFinish(newScore);
        return newScore;
      });
    } else {
      toast.error(
        `${formatMessage({ id: 'app_incorrect' })} ${questions[currentQuestionIndex].answer}. ${formatMessage({
          id: 'app_you_selected',
        })} ${countryName}`
      );
      if (isLastQuestion) {
        handleFinish(score);
      }
    }

    if (!isLastQuestion) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const handleQuizInteraction = (countryName) => {
    if (!quizStarted || !questions) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const { answer } = currentQuestion;
    const nextQuestionIndex = currentQuestionIndex + 1;
    const isLastQuestion = nextQuestionIndex >= questions.length;

    const isCorrectAnswer = countryName.toLowerCase() === answer.toLowerCase();

    if (isCorrectAnswer) {
      updateScoreAndCheckFinish(true, isLastQuestion, nextQuestionIndex, countryName);
    } else {
      updateScoreAndCheckFinish(false, isLastQuestion, nextQuestionIndex, countryName);
    }
  };

  const handleCountrySelection = (countryName) => {
    if (countryName === selectedCountryName) {
      setSelectedCountryName(null);
      setSelectedCountry(null);
    } else {
      setSelectedCountryName(countryName);
      fetchAndSetCountryData(countryName);
    }
  };

  const handleGeographyClick = async (geo) => {
    const countryName = geo.properties.name;
    handleCountrySelection(countryName);
    handleQuizInteraction(countryName);
  };

  return (
    <div className={classes.mainContainer}>
      {!quizStarted && selectedCountry && <CountryInfo isLoading={isLoadingCountryData} country={selectedCountry} />}
      {questions && (
        <>
          <Sidebar
            score={score}
            totalQuestions={questions.length}
            resetQuiz={handleReset}
            hoveredCountry={hoveredCountry}
            quizStarted={quizStarted}
            currentQuestionIndex={currentQuestionIndex}
            elapsedTime={elapsedTime}
            timer={timer}
          />

          <div className={classes.questionContainer}>
            {quizStarted ? (
              <div>{questions[currentQuestionIndex]?.content}</div>
            ) : (
              <div className={classes.startButton} onClick={handleStart}>
                <SportsScore /> <FormattedMessage id="app_start_quiz" />
              </div>
            )}
          </div>

          <div className={classes.mapContainer}>
            <QuizMap
              geoUrl={geoUrl}
              handleGeographyClick={handleGeographyClick}
              mapPosition={mapPosition}
              quizStarted={quizStarted}
              selectedCountryName={selectedCountryName}
              setHoveredCountry={setHoveredCountry}
            />
          </div>
        </>
      )}
    </div>
  );
};

Map.propTypes = {
  quiz: PropTypes.object,
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  quiz: selectQuiz,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(Map));
