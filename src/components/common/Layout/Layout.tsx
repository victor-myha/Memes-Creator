import { ThemeProvider, createTheme } from '@mui/material';

import Header from '../../Header/Header';
import styles from './Layout.module.scss';

type LayoutProps = {
  isAuthenticated?: boolean;
  children: JSX.Element;
  setIsAuthenticated: (value: boolean) => void;
};

const theme = createTheme({
  typography: {
    fontFamily: 'Satoshi',
  },
  palette: {
    primary: { main: '#323443' },
  },
});

const Layout = ({ children, isAuthenticated, setIsAuthenticated }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.layoutWrapper}>
        <Header isAuthenticated={!!isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
