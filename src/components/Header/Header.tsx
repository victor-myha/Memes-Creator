import SearchIcon from '@material-ui/icons/Search';
import { Button, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';

import logoSvg from '../../assets/img/logo.svg';
import { generateValidationSchema } from '../../utils/helpers';
import CustomButton from '../common/CustomButton/CustomButton';
import CustomField from '../common/CustomField/CustomField';
import styles from './Header.module.scss';

type HeaderProps = {
  isAuthenticated: boolean;
};

interface FormValues {
  searchMeme: string;
}

const initialValues: FormValues = {
  searchMeme: '',
};

const Header = ({ isAuthenticated }: HeaderProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema: generateValidationSchema(['name'], ['searchMeme']),
    onSubmit: ({ searchMeme }, actions) => {
      console.log('searchMeme', searchMeme);
      actions.resetForm();
    },
  });
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.leftContent}>
        <img src={logoSvg} alt='logo' />
        <div className={styles.logoText}>Memes</div>
      </div>

      {isAuthenticated && (
        <>
          <form onSubmit={formik.handleSubmit}>
            <CustomField
              fullWidth
              id='searchMeme'
              name='searchMeme'
              label='Search a meme'
              value={formik.values.searchMeme}
              onChange={formik.handleChange}
              error={formik.touched.searchMeme && Boolean(formik.errors.searchMeme)}
              helperText={formik.touched.searchMeme && formik.errors.searchMeme}
              style={{ width: '380px' }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon color={'disabled'} />
                  </InputAdornment>
                ),
              }}
            />
          </form>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomButton text={'Add a New Meme'} gradient />
            <Button
              variant='text'
              style={{ color: '#9B9D9F', textTransform: 'none', marginLeft: '24px' }}
            >
              Log Out
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default Header;
