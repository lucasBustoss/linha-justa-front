import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home/Home'
import Ranking from '../components/Ranking/Ranking'
import Leagues from '../components/Leagues/Leagues'

Vue.use(Router);

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'ranking',
    path: '/ranking',
    component: Ranking
  },
  {
    name: 'leagues',
    path: '/leagues',
    component: Leagues
  },
]

export default new Router({
  mode: 'history',
  routes
});