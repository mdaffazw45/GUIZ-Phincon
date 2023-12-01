import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Logo from '@components/Logo';
import TranslateDropdown from '@components/TranslateDropdown';

import classes from './style.module.scss';

const GameLayout = ({ children, intl: { formatMessage } }) => (
  <div>
    <div className={classes.top}>
      <Logo title={formatMessage({ id: 'app_title_header' })} />
      <div className={classes.translate}>
        <TranslateDropdown />
      </div>
    </div>
    {children}
  </div>
);

GameLayout.propTypes = {
  children: PropTypes.element.isRequired,
  intl: PropTypes.object,
};

export default injectIntl(GameLayout);
