import MainLayout from '@layouts/MainLayout';
import CreateQuiz from '@pages/CreateQuiz';
import EditQuiz from '@pages/EditQuiz';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
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
