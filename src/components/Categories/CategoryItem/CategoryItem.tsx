import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

import { Category } from '../../../utils/commonTypes';
import CustomizedSwitches from '../../common/Switch/Switch';

type CategoryItemProps = {
  category: Category;
  setCategoriesArr: (value: any) => void;
  setIdToDelete: (value: string) => void;
  setOpenDeleteModal: (value: boolean) => void;
};

const CategoryItem = (props: CategoryItemProps) => {
  const { category, setCategoriesArr, setIdToDelete, setOpenDeleteModal } = props;

  const [categoryValue, setCategoryValue] = useState('');

  const handleDelete = (id: string) => {
    setIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleAddCategory = () => {
    setCategoriesArr((prev: Category[]) => {
      const index = prev.findIndex(item => item.id === category.id);
      prev.splice(index, 1, { ...category, name: categoryValue, newCategory: false });
      return [...prev];
    });
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
        <input
          type='text'
          placeholder={'Enter Category Name'}
          value={categoryValue}
          onChange={event => setCategoryValue(event.target.value)}
          style={{ background: 'transparent', border: 0, outline: 'none', color: '#FFFFFF' }}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleAddCategory();
            }
          }}
          onBlur={event => {
            event.preventDefault();
            handleAddCategory();
          }}
        />
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
          <DeleteIcon style={{ color: '#9B9D9F', width: '20px', height: '18px' }} />
        </IconButton>
        <IconButton>
          <DragIndicatorIcon style={{ color: '#9B9D9F' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CategoryItem;
