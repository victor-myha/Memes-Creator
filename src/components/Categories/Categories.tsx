import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { CSSProperties, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Category } from '../../utils/commonTypes';
import { idGenerator } from '../../utils/helpers';
import CustomButton from '../common/CustomButton/CustomButton';
import CustomModal from '../common/CustomModal/CustomModal';
import Layout from '../common/Layout/Layout';
import './Categories.css';
import DraggableList from './DraggableList/DraggableList';

type CategoriesProps = {
  isAuthenticated: boolean;
};

const categories: Category[] = [
  {
    id: idGenerator(),
    name: 'Popular',
    counter: 93,
    status: 'on',
  },
  {
    id: idGenerator(),
    name: 'New',
    counter: 85,
    status: 'on',
  },
  {
    id: idGenerator(),
    name: 'NFT Paris',
    counter: 20,
    status: 'on',
  },
  {
    id: idGenerator(),
    name: 'NFT London',
    counter: 5,
    status: 'off',
  },
];

const Categories = ({ isAuthenticated }: CategoriesProps) => {
  const [categoriesArr, setCategoriesArr] = useState<Category[]>(categories);
  const [idToDelete, setIdToDelete] = useState<string>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCreateCategory = () => {
    const newCategory: Category = {
      id: idGenerator(),
      name: '',
      counter: 0,
      status: 'on',
      newCategory: true,
    };
    setCategoriesArr((prev: Category[]) => {
      prev.unshift(newCategory);
      console.log('prev', [...prev]);
      return [...prev];
    });
  };

  const handleDelete = () => {
    setCategoriesArr((prev: Category[]) => prev.filter(category => category.id !== idToDelete));
    setOpenDeleteModal(false);
  };

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <>
        <Box>
          <Button variant='text' style={buttonTextStyle}>
            Categories
          </Button>
          <Button
            variant='text'
            style={{ ...buttonTextStyle, color: '#9B9D9F', textDecoration: 'none' }}
          >
            Templates 8,520
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '28px',
          }}
        >
          <CustomButton
            text={'Create a Category'}
            boxStyles={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            buttonStyles={{
              width: '100%',
              maxWidth: '638px',
              height: '50px',
              background: '#884DFE',
            }}
            icon={<AddIcon style={{ marginRight: 7 }} />}
            onClick={handleCreateCategory}
          />

          <DndProvider backend={HTML5Backend}>
            <DraggableList
              categories={categoriesArr}
              setOpenDeleteModal={setOpenDeleteModal}
              setIdToDelete={setIdToDelete}
              setCategoriesArr={setCategoriesArr}
            />
          </DndProvider>
        </Box>

        <CustomModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          title={'Delete the Category?'}
          modalContent={
            <DeleteModalContent
              handleDelete={handleDelete}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          }
          modalStyle={{ maxWidth: '336px' }}
        />
      </>
    </Layout>
  );
};

const DeleteModalContent = ({
  handleDelete,
  setOpenDeleteModal,
}: {
  handleDelete: () => void;
  setOpenDeleteModal: (value: boolean) => void;
}) => {
  return (
    <Box>
      <div
        style={{
          color: '#9B9D9F',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '120%',
          margin: '24px 0',
          textAlign: 'center',
        }}
      >
        All templates in the category will be moved to the category "Other"
      </div>
      <CustomButton
        text={'Delete'}
        gradient={true}
        buttonStyles={{ height: '58px' }}
        icon={<DeleteIcon style={{ marginRight: 7, width: '14px' }} />}
        onClick={handleDelete}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant='text'
          style={{ color: '#FF5B5B', textTransform: 'none', marginTop: '10px' }}
          onClick={() => setOpenDeleteModal(false)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

const buttonTextStyle: CSSProperties = {
  color: '#884DFE',
  textTransform: 'none',
  textDecoration: 'underline',
  marginLeft: '24px',
  fontWeight: 700,
  fontSize: 24,
  lineHeight: '100%',
};

export default Categories;
