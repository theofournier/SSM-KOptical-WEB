import React, { useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';

import { Typography, CssBaseline } from '@material-ui/core';
import Alert from './components/common/Alert';

import store from './store';
import theme from './theme';
import IntlGlobalProvider from './translations/IntlGlobalProvider';
import englishTranslation from './translations/en.json';
import frenchTranslation from './translations/fr.json';
import Navbar from './components/navbar/Navbar';
import setAuthToken from './utils/setAuthToken';

const translations = {
  en: englishTranslation,
  fr: frenchTranslation,
};
const userLanguage = (navigator.language || navigator.userLanguage).includes(
  'fr',
)
  ? 'fr'
  : 'en';

// Set API Key in Axios header
setAuthToken(process.env.REACT_APP_API_KEY);

const App = () => {
  const [language, setLanguage] = useState(userLanguage);
  const [translation, setTranslation] = useState(translations[userLanguage]);

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
            <BrowserRouter>
              <CssBaseline />
              <Alert />
              <Navbar />
            </BrowserRouter>
          </ThemeProvider>
        </IntlGlobalProvider>
      </IntlProvider>
    </Provider>
  );
};

export default App;
