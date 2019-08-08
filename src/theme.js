import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#4A6572',
      main: '#344955',
      dark: '#232F34',
    },
    secondary: {
      main: '#F9AA33',
    },
    error: {
      main: '#B00020',
    },
    success: {
      main: '#81C784',
    },
    text: {
      primary: '#232F34',
      secondary: '#4A6572',
    },
    background: {
      paper: '#FFFFFF',
      default: '#ECEFF1',
    },
    link: '#3366BB',
    border: {
      primary: 'rgba(212, 215, 216, 0.9)',
    },
    button: {
      accept: '#81C784',
      delete: '#B00020',
    },
    cancelled: '#B00020',
    running: '#F9AA33',
    incoming: '#4472c4',
    done: '#81C784',
    endOfDay: '#00695c',
  },
  typography: {
    useNextVariants: true,
    fontFamily: "'Work Sans', sans-serif",
    h1: {
      fontWeight: 300,
      fontSize: '6rem',
      lineHeight: 1,
      letterSpacing: '-0.015625em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '3.75rem',
      lineHeight: 1,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 400,
      fontSize: '3rem',
      lineHeight: 1.04,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 700,
      fontSize: '2.125rem',
      lineHeight: 1.17,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.33,
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.009375em',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
      color: '#4A6572',
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 3,
  },
  drawerWidth: 240,
});
