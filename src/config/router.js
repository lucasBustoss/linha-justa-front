import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home/Home'
import Ranking from '../components/Ranking/Ranking'
import Leagues from '../components/Leagues/Leagues'
import FairLine from '../components/FairLine/FairLine'
import Matches from '../components/Matches/Matches'

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
  {
    name: 'lines',
    path: '/lines',
    component: FairLine,
    props: true,
  },
  {
    name: 'matches',
    path: '/matches',
    component: Matches
  },
]

export default new Router({
  mode: 'history',
  routes
});