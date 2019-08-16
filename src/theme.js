import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';

export default responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      light: '#95ef75',
      main: '#62bc46',
      dark: '#2c8b13',
    },
    secondary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
    },
    error: {
      light: '#af3b2a',
      main: '#790000',
      dark: '#490000',
    },
    success: {
      main: '#81C784',
    },
    text: {
      primary: '#424242',
      secondary: '#4a724e',
    },
    background: {
      paper: '#FFFFFF',
      default: '#FAFAFA',
    },
    link: '#3366BB',
    border: {
      primary: 'rgba(212, 215, 216, 0.9)',
    },
    button: {
      accept: '#81C784',
      delete: '#790000',
    },
    snackbar: {
      info: '#347ac9',
      warning: amber[700],
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: "'PT Sans', Arial",
  },
  shape: {
    borderRadius: 3,
  },
  drawerWidth: 240,
}));
