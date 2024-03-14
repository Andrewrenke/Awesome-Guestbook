import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EF5742',
    },
    secondary: {
      main: '#9C27B0',
    },
    warning: {
      main: '#EF6C00',
    },
    success: {
      main: '#0288D1',
    },
    info: {
      main: '#2196F3',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
