import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Logo from '@components/Logo';

import classes from './style.module.scss';

const GameLayout = ({ children, intl: { formatMessage } }) => (
  <div>
    <div className={classes.logo}>
      <Logo title={formatMessage({ id: 'app_title_header' })} />
    </div>
    {children}
  </div>
);

GameLayout.propTypes = {
  children: PropTypes.element.isRequired,
  intl: PropTypes.object,
};

export default injectIntl(GameLayout);
