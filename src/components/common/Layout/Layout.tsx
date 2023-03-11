import { ThemeProvider, createTheme } from '@mui/material';

import Header from '../../Header/Header';
import styles from './Layout.module.scss';

type LayoutProps = {
  isAuthenticated?: boolean;
  children: JSX.Element;
};

const theme = createTheme({
  typography: {
    fontFamily: 'Satoshi',
  },
});

const Layout = ({ children, isAuthenticated }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.layoutWrapper}>
        <Header isAuthenticated={!!isAuthenticated} />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
