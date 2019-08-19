import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { typeCodeSA, typeCodeA } from '../../utils/config';

const PrivateRouteAdmin = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (auth.isAuthenticated && [typeCodeSA, typeCodeA].includes(auth.user.type.typeCode) ? (
      <Component {...props} />
    ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location, fromAdmin: true },
          }}
        />
    ))
    }
  />
);

PrivateRouteAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
