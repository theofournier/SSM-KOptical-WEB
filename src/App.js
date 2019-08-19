import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';

import { CssBaseline } from '@material-ui/core';
import Axios from 'axios';
import Alert from './components/common/Alert';

import store from './store';
import theme from './theme';
import IntlGlobalProvider from './translations/IntlGlobalProvider';
import englishTranslation from './translations/en.json';
import frenchTranslation from './translations/fr.json';
import Navbar from './components/navbar/Navbar';

import { setCurrentUser } from './actions/authActions';
import { getLocalStorage, keyCurrentUser } from './utils/localStorages';
import Routes from './routes';

const translations = {
  en: englishTranslation,
  fr: frenchTranslation,
};
const userLanguage = (navigator.language || navigator.userLanguage).includes(
  'fr',
)
  ? 'fr'
  : 'en';

// Axios header
Axios.defaults.headers.Authorization = process.env.REACT_APP_API_KEY;
Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

const App = () => {
  const [language, setLanguage] = useState(userLanguage);
  const [translation, setTranslation] = useState(translations[userLanguage]);

  useEffect(() => {
    const currentUser = getLocalStorage(keyCurrentUser);
    if (currentUser) {
      store.dispatch(setCurrentUser(currentUser));
    }
  }, []);

  const changeLanguage = () => {
    if (language === 'en') {
      setLanguage('fr');
      setTranslation(frenchTranslation);
    } else if (language === 'fr') {
      setLanguage('en');
      setTranslation(englishTranslation);
    }
  };

  return (
    <Provider store={store}>
      <IntlProvider
        locale={language}
        messages={translation}
      >
        <IntlGlobalProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
              <CssBaseline />
              <Alert />
              <Navbar />
              <Routes />
            </BrowserRouter>
          </ThemeProvider>
        </IntlGlobalProvider>
      </IntlProvider>
    </Provider>
  );
};

export default App;
