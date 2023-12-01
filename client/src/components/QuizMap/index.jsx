import PropTypes from 'prop-types';

import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

import classes from './style.module.scss';

const QuizMap = ({
  geoUrl,
  mapPosition,
  handleGeographyClick,
  selectedCountryName,
  quizStarted,
  setHoveredCountry,
}) => (
  <ComposableMap
    className={quizStarted ? `${classes.mapStart}  ${classes.mapStyle}` : `${classes.mapStyle}`}
    projection="geoMercator"
  >
    <ZoomableGroup zoom={mapPosition.zoom} center={mapPosition.center}>
      <Geographies geography={geoUrl} className={classes.geographies}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const isCountrySelected = geo.properties.name === selectedCountryName;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const countryName = geo.properties.name;
                  setHoveredCountry(countryName);
                }}
                onMouseLeave={() => {
                  setHoveredCountry('');
                }}
                onClick={() => handleGeographyClick(geo)}
                className={classes.geography}
                style={{
                  default: {
                    fill: isCountrySelected ? 'darkgreen' : 'forestgreen',
                    stroke: isCountrySelected ? 'yellow' : '#000',
                    strokeWidth: isCountrySelected ? 1 : 0.2,
                  },
                  hover: {
                    fill: isCountrySelected ? 'darkgreen' : 'green',
                    stroke: isCountrySelected ? 'yellow' : '#DDD',
                    strokeWidth: isCountrySelected ? 1 : 0.75,
                  },
                  pressed: {
                    fill: 'green',
                    stroke: 'yellow',
                    strokeWidth: 1,
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ZoomableGroup>
  </ComposableMap>
);

QuizMap.propTypes = {
  geoUrl: PropTypes.string.isRequired,
  mapPosition: PropTypes.object.isRequired,
  handleGeographyClick: PropTypes.func.isRequired,
  selectedCountryName: PropTypes.string.isRequired,
  quizStarted: PropTypes.bool.isRequired,
  setHoveredCountry: PropTypes.func.isRequired,
};

export default QuizMap;
