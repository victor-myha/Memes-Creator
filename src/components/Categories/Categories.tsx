import Layout from '../common/Layout/Layout';

type CategoriesProps = {
  isAuthenticated: boolean;
};
const Categories = ({ isAuthenticated }: CategoriesProps) => {
  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div>Categories</div>
    </Layout>
  );
};

export default Categories;
