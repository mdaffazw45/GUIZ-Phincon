import MainLayout from '@layouts/MainLayout';
import CreateQuiz from '@pages/CreateQuiz';
import EditQuiz from '@pages/EditQuiz';
import ForgotPassword from '@pages/ForgotPassword';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Map from '@pages/Map';
import Register from '@pages/Register';
import ChangePassword from '@pages/ChangePassword';
import GameLayout from '@layouts/GameLayout';
import Leaderboard from '@pages/Leaderboard';
import Profile from '@pages/Profile';
import UpdateProfile from '@pages/UpdateProfile';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/map/:id',
    name: 'Map',
    protected: false,
    component: Map,
    layout: GameLayout,
  },
  // {
  //   path: '/IndonesiaMap',
  //   name: 'IndonesiaMap',
  //   protected: false,
  //   component: IndonesiaMap,
  //   layout: MainLayout,
  // },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    protected: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/profile/update',
    name: 'UpdateProfile',
    protected: true,
    component: UpdateProfile,
    layout: MainLayout,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    protected: false,
    component: ForgotPassword,
    layout: MainLayout,
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    protected: true,
    component: ChangePassword,
    layout: MainLayout,
  },
  {
    path: '/quiz/create',
    name: 'CreateQuiz',
    protected: true,
    component: CreateQuiz,
    layout: MainLayout,
  },
  {
    path: '/quiz/edit/:quizId',
    name: 'EditQuiz',
    protected: true,
    component: EditQuiz,
    layout: MainLayout,
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    protected: true,
    component: Leaderboard,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
