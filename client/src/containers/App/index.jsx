import PropTypes from 'prop-types';

import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { hidePopup } from '@containers/App/actions';
import { selectPopup, selectLoading } from '@containers/App/selectors';

import Loader from '@components/Loader';
import ClientRoutes from '@components/ClientRoutes';
import PopupMessage from '@components/PopupMessage/Dialog';

const App = ({ popup, loading }) => {
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(hidePopup());
  };

  return (
    <>
      <ClientRoutes />
      <Loader isLoading={loading} />
      <PopupMessage open={popup.open} title={popup.title} message={popup.message} onClose={closePopup} />
    </>
  );
};

App.propTypes = {
  popup: PropTypes.shape({
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  popup: selectPopup,
  loading: selectLoading,
});

export default connect(mapStateToProps)(App);
