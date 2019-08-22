import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { typeCodeSA, typeCodeA } from '../../utils/config';

const PrivateRouteAdmin = ({ component: Component, auth, ...rest }) => {
  if (auth.isAuthenticated && [typeCodeSA, typeCodeA].includes(auth.currentUser.type.typeCode)) {
    return (
      <Route
        {...rest}
        render={(props) => <Component {...props} />}
      />
    );
  }
  if (auth.isAuthenticated) {
    return (
      <Route
        {...rest}
        render={(props) => <Redirect
          to={{
            pathname: '/',
          }}
        />}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={(props) => <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />}
    />
  );
};

PrivateRouteAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
