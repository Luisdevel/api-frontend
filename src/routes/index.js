import React from 'react';
import { Switch } from 'react-router-dom';

import Students from '../pages/Students';
import Student from '../pages/Student';
import Photos from '../pages/Photos';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import MyRoute from './MyRoutes';

function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Students} isClosed={false} />
      <MyRoute exact path="/student/:id/edit" component={Student} isClosed />
      <MyRoute exact path="/student/" component={Student} isClosed />
      <MyRoute exact path="/photos/:id" component={Photos} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="*" component={Page404} />
    </Switch>
  );
}

export default Routes;
