import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if(isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  return <Route { ...rest } component={Component} />;
};

MyRoute.defaultPrps = {
  isClosed: false,
};

MyRoute.propType = {
  component: PropTypes.oneOfType([
    PropTypes.element, PropTypes.func,
  ]).isRequired,
  isClosed: PropTypes.bool,
};

export default MyRoute;
