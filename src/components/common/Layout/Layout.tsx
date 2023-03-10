import Header from '../../Header/Header';
import styles from './Layout.module.scss';

type LayoutProps = {
  isAuthenticated?: boolean;
  children: JSX.Element;
};
const Layout = ({ children, isAuthenticated }: LayoutProps) => {
  return (
    <div className={styles.layoutWrapper}>
      <Header isAuthenticated={!!isAuthenticated} />
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
};

export default Layout;
