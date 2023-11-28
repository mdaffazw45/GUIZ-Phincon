import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import questions from './question.json'; // Import updated question.json
import classes from './style.module.scss';

const MySwal = withReactContent(Swal);

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Index = () => {
  const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(true);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    resetQuiz();
  }, []);

  const resetQuiz = () => {
    setScore(0);
    setIsQuizFinished(false);

    setShuffledQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
  };

  const handleGeographyClick = (geo) => {
    if (isQuizFinished) return;
  
    const question = questions[currentQuestionIndex];
    const countryName = geo.properties.name;
    const correctCountry = question.country;
  
    const isCorrectAnswer = countryName === correctCountry;
  
    updateScoreAndDisplayToast(isCorrectAnswer, question, countryName);
  
    const nextQuestionIndex = currentQuestionIndex + 1;
  
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      finishQuiz();
    }
  };
  
  const updateScoreAndDisplayToast = (isCorrect, question, countryName) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      toast.success(`Correct! The country with the question "${question.question}" is ${countryName}.`);
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
      cancelButtonText: 'Reset Game'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/'); // Navigate to home page
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        resetQuiz(); // Reset the game
      }
    });
  };

  return (
    <div className={classes.mainContainer}>
      <Toaster />
      <div className={classes.questionContainer}>
      <h1>World Map Quiz</h1>
      <p>Score: {score}</p>
      <p>{questions[currentQuestionIndex].question}?</p>
      </div>
      <div className={classes.mapContainer}>
      <ComposableMap
        width={800}
        height={600}
        projectionConfig={{ scale: 130 }}
        className={classes.mapStyle}
      >
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

export default Index;
