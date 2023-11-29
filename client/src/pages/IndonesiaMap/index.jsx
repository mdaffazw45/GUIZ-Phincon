import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { toast, Toaster } from 'react-hot-toast';
import capitals from './capitals.json';

const Index = () => {
  // Update geoUrl to point to the Indonesian map JSON file
  const geoUrl = 'https://cdn.jsdelivr.net/npm/geojson-indonesia@1.0.1/geojson/gadm41_IDN_1.json';;

  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    resetQuiz();
  }, []);

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(Math.floor(Math.random() * capitals.length));
    setIsQuizFinished(false);
  };

  // const handleGeographyClick = (geo) => {
  //   if (isQuizFinished) return;

  //   const provinceName = geo.properties?.Propinsi; // Assuming the province name property is 'NAME_1'

  //   alert(`The province of Indonesia is ${provinceName}`);

  //   const currentCapital = capitals[currentQuestionIndex].capital;
  //   const correctCountry = capitals.find((c) => c.capital === currentCapital)?.country;

  //   if (provinceName === correctCountry) {
  //     setScore((prevScore) => prevScore + 1);
  //     toast.success(`Correct! The country with capital ${currentCapital} is ${provinceName}.`);
  //   } else {
  //     toast.error(`Incorrect. The correct answer is ${correctCountry}.`);
  //   }

  //   let nextQuestionIndex = currentQuestionIndex + 1;
  //   if (nextQuestionIndex < capitals.length) {
  //     setCurrentQuestionIndex(nextQuestionIndex);
  //   } else {
  //     setIsQuizFinished(true);
  //     toast.success("Congratulations, you've completed the quiz!");
  //   }
  // };

  const handleGeographyClick = (geo) => {
    if (isQuizFinished) return;

    // Displaying all properties of the geography in the console for debugging
    console.log('Geography properties:', geo.properties);

    const provinceName = geo.properties?.NAME_1; // Assuming the province name property is 'Propinsi'

    alert(`The province of Indonesia is ${provinceName}`);

    // const currentCapital = capitals[currentQuestionIndex].capital;
    // const correctCountry = capitals.find((c) => c.capital === currentCapital)?.country;

    // if (provinceName === correctCountry) {
    //   setScore((prevScore) => prevScore + 1);
    //   toast.success(`Correct! The country with capital ${currentCapital} is ${provinceName}.`);
    // } else {
    //   toast.error(`Incorrect. The correct answer is ${correctCountry}.`);
    // }

    // let nextQuestionIndex = currentQuestionIndex + 1;
    // if (nextQuestionIndex < capitals.length) {
    //   setCurrentQuestionIndex(nextQuestionIndex);
    // } else {
    //   setIsQuizFinished(true);
    //   toast.success("Congratulations, you've completed the quiz!");
    // }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Toaster />
    <div style={{ textAlign: 'center' }}>
      <h1>World Map Quiz</h1>
      <p>Score: {score}</p>
      {/* {!isQuizFinished ? (
        <p>Which country has the capital city of {capitals[currentQuestionIndex].capital}?</p>
      ) : (
        <div>
          <p>You have completed the quiz!</p>
          <button onClick={resetQuiz}>Start Over</button>
        </div>
      )} */}
      <ComposableMap
        width={1000}
        height={800}
        projectionConfig={{ scale: 140 }}
        style={{ maxWidth: '100%', maxHeight: '80vh', margin: '0 auto' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleGeographyClick(geo)}
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
      {isQuizFinished && (
        <button onClick={resetQuiz} style={{ marginTop: '10px' }}>
          Start Over
        </button>
      )}
    </div>
  </div>
  );
};

export default Index;
