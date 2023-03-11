import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';

import { Category } from '../../../utils/commonTypes';
import { generateValidationSchema } from '../../../utils/helpers';
import CustomizedSwitches from '../../common/Switch/Switch';

interface FormValues {
  categoryName: string;
}

const initialValues: FormValues = {
  categoryName: '',
};

type CategoryItemProps = {
  category: Category;
  setIdToDelete: (value: string) => void;
  setOpenDeleteModal: (value: boolean) => void;
};

const CategoryItem = (props: CategoryItemProps) => {
  const { category, setIdToDelete, setOpenDeleteModal } = props;

  const formik = useFormik({
    initialValues,
    validationSchema: generateValidationSchema(['name'], ['categoryName']),
    onSubmit: ({ categoryName }, actions) => {
      console.log('categoryName', categoryName);
      actions.resetForm();
    },
  });

  const handleDelete = (id: string) => {
    setIdToDelete(id);
    setOpenDeleteModal(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxHeight: '12px',
        maxWidth: '595px',
        padding: '17px 20px',
        background: '#24252E',
        border: '2px solid #323443',
        borderRadius: '4px',
        marginTop: '12px',
      }}
    >
      {category.newCategory ? (
        <form onSubmit={formik.handleSubmit}>
          {/*<CustomField*/}
          {/*  fullWidth*/}
          {/*  hiddenLabel*/}
          {/*  id='categoryName'*/}
          {/*  name='categoryName'*/}
          {/*  label='categoryName'*/}
          {/*  value={formik.values.categoryName}*/}
          {/*  onChange={formik.handleChange}*/}
          {/*  error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}*/}
          {/*  helperText={formik.touched.categoryName && formik.errors.categoryName}*/}
          {/*  style={{}}*/}
          {/*/>*/}
          <TextField
            hiddenLabel
            id='categoryName'
            name='categoryName'
            variant='filled'
            value={formik.values.categoryName}
            onChange={formik.handleChange}
            onKeyDown={event => {
              if (event.key === 'enter') {
                event.preventDefault();
              }
            }}
          />
        </form>
      ) : (
        <div
          style={{
            ...(category.status === 'on' ? { color: '#FFFFFF' } : { color: '#696969' }),
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '12px',
          }}
        >
          {category.name}
        </div>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '12px',
            ...(category.status === 'on' ? { color: '#9B9D9F' } : { color: '#696969' }),
            marginRight: '20px',
          }}
        >
          {category.counter}
        </div>
        <CustomizedSwitches checked={category.status === 'on'} />
        <IconButton onClick={() => handleDelete(category.id)}>
          <DeleteIcon style={{ color: '#9B9D9F' }} />
        </IconButton>
        <IconButton>
          <DragIndicatorIcon style={{ color: '#9B9D9F' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CategoryItem;
