import MainLayout from '@layouts/MainLayout';
import CreateQuiz from '@pages/CreateQuiz';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/quiz/create',
    name: 'CreateQuiz',
    protected: false,
    component: CreateQuiz,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
