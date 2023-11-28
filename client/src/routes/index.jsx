import MainLayout from '@layouts/MainLayout';
import CreateQuiz from '@pages/CreateQuiz';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Map from '@pages/Map'
import IndonesiaMap from '@pages/IndonesiaMap'

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/worldMap',
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
    path: '/quiz/create',
    name: 'CreateQuiz',
    protected: false,
    component: CreateQuiz,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
