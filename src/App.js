import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';

import { Typography, CssBaseline } from '@material-ui/core';
import Alert from './components/common/Alert';

import store from './store';
import theme from './theme';
import englishTranslation from './translations/en.json';
import frenchTranslation from './translations/fr.json';

const translations = {
  en: englishTranslation,
};
const userLanguage = (navigator.language || navigator.userLanguage).includes(
  'fr',
)
  ? 'fr'
  : 'en';

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
        messages={translations}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Alert />
          <Typography variant='h1'>
            CRM KOptical H1
            </Typography>
          <Typography variant='h2'>
            CRM KOptical H2
            </Typography>
          <Typography variant='h3'>
            CRM KOptical H3
            </Typography>
          <Typography variant='h4'>
            CRM KOptical H4
            </Typography>
          <Typography variant='h5'>
            CRM KOptical H5
            </Typography>
          <Typography variant='h6'>
            CRM KOptical H6
            </Typography>
          <Typography variant='subtitle1'>
            CRM KOptical Subtitle 1
            </Typography>
          <Typography variant='subtitle2'>
            CRM KOptical Subtitle 2
            </Typography>
          <Typography variant='body1'>
            CRM KOptical Body 1
            </Typography>
          <Typography variant='body2'>
            CRM KOptical Body 2
            </Typography>
          <Typography variant='button'>
            CRM KOptical Button
            </Typography>
          <Typography variant='caption'>
            CRM KOptical Caption
            </Typography>
          <Typography variant='overline'>
            CRM KOptical Overline
          </Typography>
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
};

export default App;
