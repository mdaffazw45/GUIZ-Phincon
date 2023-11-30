import MainLayout from '@layouts/MainLayout';
import CreateQuiz from '@pages/CreateQuiz';
import EditQuiz from '@pages/EditQuiz';
import ForgotPassword from '@pages/ForgotPassword';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Map from '@pages/Map';
// import IndonesiaMap from '@pages/IndonesiaMap';
import Register from '@pages/Register';
import ChangePassword from '@pages/ChangePassword';

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
    layout: MainLayout,
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    protected: false,
    component: ForgotPassword,
    layout: MainLayout,
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    protected: false,
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
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
