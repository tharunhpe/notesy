import React from 'react'
import { Route, IndexRoute } from 'react-router'
import LoginContainer from '../modules/login/components/login-container'
import UserContainer from '../modules/user/components/user-container'
import EditNoteContainer from '../modules/user/components/edit-note-container'
import DashboardContainer from '../modules/dashboard/components/dashboard-container'
import RegisterContainer from '../modules/register/components/register-container'
import { RouteHandler } from 'react-router'
import requireAuth from './require-auth';

export default (
  <Route>
    <Route path="/" component={LoginContainer} />
    <Route path="/register" component={RegisterContainer} />
    <Route path="/login" component={LoginContainer} />
    <Route component={DashboardContainer} onEnter={requireAuth}>
       <Route path='user' component={UserContainer} />
       <Route
        path='user/:id'
        component={EditNoteContainer}
       />
     </Route>
  </Route>
);
