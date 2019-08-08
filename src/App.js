import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import Alert from './components/common/Alert';

import store from './store';
import IntlGlobalProvider from './translations/IntlGlobalProvider';
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
        locale={this.state.language}
        messages={this.state.translations}
      >
        <IntlGlobalProvider>
          <Alert />
          <div>
            CRM KOptical
          </div>
        </IntlGlobalProvider>

      </IntlProvider>
    </Provider>
  );
};

export default App;
