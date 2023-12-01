import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Skeleton } from '@mui/material';

import classes from './style.module.scss';

const CountryInfo = ({ isLoading, country }) => (
  <div className={classes.countryInfo}>
    {isLoading ? (
      <div className={classes.skeletonContainer}>
        <Skeleton animation="wave" variant="rectangular" className={classes.skeleton} />
        <Skeleton animation="wave" width="40%" className={classes.skeletonChild} />
        <Skeleton animation="wave" width="80%" className={classes.skeletonChild} />
        <Skeleton animation="wave" width="90%" className={classes.skeletonChild} />
        <Skeleton animation="wave" width="80%" className={classes.skeletonChild} />
      </div>
    ) : (
      country && (
        <>
          <img src={country.flag} alt={`${country.name} flag`} />
          <div className={classes.countryDetails}>
            <div className={classes.countryName}>{country.name}</div>
            <div className={classes.countryAttributes}>
              <span>
                <FormattedMessage id="app_capital" />
              </span>{' '}
              {country.capital}
            </div>
            <div className={classes.countryAttributes}>
              <span>
                <FormattedMessage id="app_population" />
              </span>{' '}
              {country.population.toLocaleString()}
            </div>
            <div className={classes.countryAttributes}>
              <span>
                <FormattedMessage id="app_area" />
              </span>{' '}
              {country.area.toLocaleString()} km²
            </div>
          </div>
        </>
      )
    )}
  </div>
);

CountryInfo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  country: PropTypes.object,
};

export default CountryInfo;
