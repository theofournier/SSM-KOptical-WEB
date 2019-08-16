import { intl } from '../translations/IntlGlobalProvider';

export default function errorMessageHandler(err, from) {
  let error = {};
  if (!err.response || !err.response.status) {
    error = { message: intl.formatMessage({ id: 'api.error.500' }), status: '500' };
  } else if (intl.messages()[`api.${from}.error.${err.response.status}`]) {
    error = {
      message: intl.formatMessage({ id: `api.${from}.error.${err.response.status}` }),
      status: err.response.status,
    };
  } else if (err.response.status === 500) {
    error = {
      message: intl.formatMessage({ id: 'api.error.500' }),
      status: '500',
    };
  } else {
    error = { message: err.response.data.message, status: err.response.status };
  }
  console.log(error);
  return error;
}
