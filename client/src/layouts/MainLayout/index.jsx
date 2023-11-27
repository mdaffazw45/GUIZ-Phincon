import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale } from '@containers/App/selectors';

import Navbar from '@components/Navbar';

const MainLayout = ({ children, locale, intl: { formatMessage } }) => (
  <div>
    <Navbar title={formatMessage({ id: 'app_title_header' })} locale={locale} />
    {children}
  </div>
);

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  intl: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
