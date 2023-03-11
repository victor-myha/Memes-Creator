import { useFormik } from 'formik';

import { generateValidationSchema } from '../../utils/helpers';
import CustomButton from '../common/CustomButton/CustomButton';
import CustomField from '../common/CustomField/CustomField';
import Layout from '../common/Layout/Layout';
import styles from './Auth.module.scss';

type AuthProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const Auth = (props: AuthProps) => {
  const { isAuthenticated, setIsAuthenticated } = props;

  const formik = useFormik({
    initialValues,
    validationSchema: generateValidationSchema(['email', 'password']),
    onSubmit: ({ email, password }, actions) => {
      setIsAuthenticated(true);
      actions.resetForm();
    },
  });

  return (
    <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <CustomField
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <CustomField
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={{ margin: '12px 0' }}
          />

          <CustomButton
            text={'Sign In'}
            gradient
            boxStyles={{ display: 'flex', justifyContent: 'center' }}
            buttonStyles={{ width: '179px' }}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Auth;
