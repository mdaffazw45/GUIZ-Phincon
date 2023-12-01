import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { DeleteOutline, East, EditOutlined, Gavel, ManageAccounts, PeopleAlt } from '@mui/icons-material';

import QuizCard from '@components/QuizCard';
import ConfirmDeleteModal from '@components/ConfirmDeleteModal';

import { selectRole, selectToken } from '@containers/Client/selectors';
import { selectAllUser, selectQuizzes } from './selectors';
import { deleteQuizById, deleteUserById, getAllQuizzes, getUser } from './actions';

import classes from './style.module.scss';

const Home = ({ quizzes, intl: { formatMessage }, token, role, users }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'admin') {
      dispatch(getUser(token));
    }
  }, [dispatch, role, token]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('quizzes');
  const [deleteType, setDeleteType] = useState(null);

  useEffect(() => {
    dispatch(getAllQuizzes());
  }, [dispatch]);

  const selectTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setDataToDelete(null);
  };

  const handleDeleteClick = (id, type) => {
    setDataToDelete(id);
    setDeleteType(type);
    setIsModalOpen(true);
  };

  const handleEditClick = (id) => {
    navigate(`/quiz/edit/${id}`);
  };

  const handleConfirmDelete = () => {
    if (dataToDelete) {
      if (deleteType === 'user') {
        dispatch(deleteUserById(dataToDelete, token));
      } else if (deleteType === 'quiz') {
        dispatch(deleteQuizById(dataToDelete, token));
      }
    }
    setIsModalOpen(false);
    setDataToDelete(null);
    setDeleteType(null);
  };

  if (role === 'admin') {
    return (
      <div className={classes.admin}>
        <div className={classes.tabs}>
          <button
            type="button"
            className={activeTab === 'quizzes' ? classes.activeTab : ''}
            onClick={() => selectTab('quizzes')}
          >
            <FormattedMessage id="app_quizzes" />
          </button>
          <button
            type="button"
            className={activeTab === 'users' ? classes.activeTab : ''}
            onClick={() => selectTab('users')}
          >
            <FormattedMessage id="app_users" />
          </button>
        </div>
        {activeTab === 'users' && (
          <table className={classes.table}>
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="app_username" />
                </th>
                <th>
                  <FormattedMessage id="app_email" />
                </th>
                <th>
                  <FormattedMessage id="app_role" />
                </th>
                <th>
                  <FormattedMessage id="app_actions" />
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user?.id}>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role === 'admin' ? <ManageAccounts /> : <PeopleAlt />}</td>
                  <td>
                    {user?.role !== 'admin' && (
                      <Gavel className={classes.removeButton} onClick={() => handleDeleteClick(user?.id, 'user')} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'quizzes' && (
          <div className={classes.wrapper}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="app_title" />
                  </th>
                  <th>
                    <FormattedMessage id="app_description" />
                  </th>
                  <th>
                    <FormattedMessage id="app_no_of_questions" />
                  </th>
                  <th>
                    <FormattedMessage id="app_actions" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz?.id}>
                    <td>{quiz?.title}</td>
                    <td>{quiz?.description}</td>
                    <td>{quiz?.noOfQuestions}</td>
                    <td>
                      <EditOutlined className={classes.editButton} onClick={() => handleEditClick(quiz?.id)} />
                      <DeleteOutline
                        className={classes.removeButton}
                        onClick={() => handleDeleteClick(quiz?.id, 'quiz')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={classes.createButton} onClick={() => navigate('/quiz/create')}>
              <FormattedMessage id="app_create_quiz" />
            </div>
          </div>
        )}
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleConfirmDelete}
          message={
            deleteType === 'user'
              ? formatMessage({ id: 'app_are_you_sure_delete_user' })
              : formatMessage({ id: 'app_are_you_sure_delete_quiz' })
          }
        />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {!token && (
        <div className={classes.container__hero}>
          <div className={classes.content}>
            <div className={classes.content__title}>
              <FormattedMessage id="app_hero_title" />
            </div>
            <div className={classes.content__subtitle}>
              <FormattedMessage id="app_hero_subtitle" />
            </div>
            <div className={classes.content__button} onClick={() => navigate('/register')}>
              <span>
                <FormattedMessage id="app_hero_button" />
              </span>
              <East className={classes.content__button__icon} />
            </div>
          </div>
        </div>
      )}

      <div className={classes.container__section}>
        <div className={classes.header}>
          <div className={classes.header__title}>
            <FormattedMessage id="app_home_section_title" />
          </div>
          <div className={classes.header__subtitle}>
            <FormattedMessage id="app_home_section_subtitle" />
          </div>
        </div>
        <div className={classes.content}>
          {quizzes?.map((quiz) => (
            <QuizCard key={quiz?.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  quizzes: PropTypes.array,
  intl: PropTypes.object,
  token: PropTypes.string,
  role: PropTypes.string,
  users: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  quizzes: selectQuizzes,
  token: selectToken,
  role: selectRole,
  users: selectAllUser,
});

export default injectIntl(connect(mapStateToProps)(Home));
