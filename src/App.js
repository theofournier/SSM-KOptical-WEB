import React from 'react';
import { Provider } from 'react-redux';
import Alert from './components/common/Alert';

import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Alert />
      <div>
        CRM KOptical
      </div>
    </Provider>
  );
};

export default App;
