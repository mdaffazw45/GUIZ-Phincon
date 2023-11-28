import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Delete, DeleteOutline, East, Edit, EditOutlined, Gavel } from '@mui/icons-material';

import QuizCard from '@components/QuizCard';
import ConfirmDeleteModal from '@components/ConfirmDeleteModal';

import { selectQuizzes } from './selectors';
import { getAllQuizzes } from './actions';

import classes from './style.module.scss';

const Home = ({ quizzes, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      username: 'lol',
      email: 'lol@gmail.com',
    },
    {
      id: 2,
      username: 'lel',
      email: 'lel@gmail.com',
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
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
    setUserToDelete(null);
  };

  const handleDeleteClick = (id, type) => {
    setUserToDelete(id);
    setDeleteType(type); // Set the type of deletion
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      if (deleteType === 'user') {
        console.log('Deleting user:', userToDelete);
        // Dispatch action to delete user
      } else if (deleteType === 'quiz') {
        console.log('Deleting quiz:', userToDelete);
        // Dispatch action to delete quiz
      }
    }
    setIsModalOpen(false);
    setUserToDelete(null);
    setDeleteType(null);
  };

  // Render for admin
  // return (
  //   <div className={classes.admin}>
  //     <div className={classes.tabs}>
  //       <button
  //         type="button"
  //         className={activeTab === 'quizzes' ? classes.activeTab : ''}
  //         onClick={() => selectTab('quizzes')}
  //       >
  //         Quizzes
  //       </button>
  //       <button
  //         type="button"
  //         className={activeTab === 'users' ? classes.activeTab : ''}
  //         onClick={() => selectTab('users')}
  //       >
  //         Users
  //       </button>
  //     </div>
  //     {activeTab === 'users' && (
  //       <table className={classes.table}>
  //         <thead>
  //           <tr>
  //             <th>
  //               <FormattedMessage id="app_username" />
  //             </th>
  //             <th>
  //               <FormattedMessage id="app_email" />
  //             </th>
  //             <th>
  //               <FormattedMessage id="app_actions" />
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {users.map((user) => (
  //             <tr key={user?.id}>
  //               <td>{user?.username}</td>
  //               <td>{user?.email}</td>
  //               <td>
  //                 {user?.role !== 1 && (
  //                   <Gavel className={classes.removeButton} onClick={() => handleDeleteClick(user?.id, 'user')} />
  //                 )}
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     )}
  //     {activeTab === 'quizzes' && (
  //       <div className={classes.wrapper}>
  //         <table className={classes.table}>
  //           <thead>
  //             <tr>
  //               <th>
  //                 <FormattedMessage id="app_title" />
  //               </th>
  //               <th>
  //                 <FormattedMessage id="app_description" />
  //               </th>
  //               <th>
  //                 <FormattedMessage id="app_actions" />
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {quizzes.map((quiz) => (
  //               <tr key={quiz?.id}>
  //                 <td>{quiz?.title}</td>
  //                 <td>{quiz?.description}</td>
  //                 <td>
  //                   <EditOutlined className={classes.editButton} />
  //                   <DeleteOutline
  //                     className={classes.removeButton}
  //                     onClick={() => handleDeleteClick(quiz?.id, 'quiz')}
  //                   />
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>

  //         <div className={classes.createButton} onClick={() => navigate('/quiz/create')}>
  //           Create Quiz
  //         </div>
  //       </div>
  //     )}
  //     <ConfirmDeleteModal
  //       isOpen={isModalOpen}
  //       onClose={handleModalClose}
  //       onConfirm={handleConfirmDelete}
  //       message={
  //         deleteType === 'user'
  //           ? formatMessage({ id: 'app_are_you_sure_delete_user' })
  //           : formatMessage({ id: 'app_are_you_sure_delete_quiz' })
  //       }
  //     />
  //   </div>
  // );

  return (
    <div className={classes.container}>
      <div className={classes.container__hero}>
        <div className={classes.content}>
          <div className={classes.content__title}>
            <FormattedMessage id="app_hero_title" />
          </div>
          <div className={classes.content__subtitle}>
            <FormattedMessage id="app_hero_subtitle" />
          </div>
          <div className={classes.content__button}>
            <span>
              <FormattedMessage id="app_hero_button" />
            </span>
            <East className={classes.content__button__icon} />
          </div>
        </div>
      </div>
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
          {quizzes.map((quiz) => (
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
};

const mapStateToProps = createStructuredSelector({
  quizzes: selectQuizzes,
});

export default injectIntl(connect(mapStateToProps)(Home));
