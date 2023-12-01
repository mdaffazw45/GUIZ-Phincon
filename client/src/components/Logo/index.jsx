import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Public } from '@mui/icons-material';

import classes from './style.module.scss';

const Logo = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.logoImage} onClick={() => navigate('/')}>
      <div className={classes.title}>
        <Public />
        {title}
      </div>
    </div>
  );
};

Logo.propTypes = {
  title: PropTypes.string,
};
export default Logo;
