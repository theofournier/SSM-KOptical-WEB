import React from 'react';
import { connect } from 'react-redux';

import Home from './Home';
import Landing from './Landing';

const Main = ({ auth: { isAuthenticated } }) => {
  return (
    <div>
      {isAuthenticated ? <Home /> : <Landing />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Main);
