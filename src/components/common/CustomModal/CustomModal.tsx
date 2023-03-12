import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { CSSProperties } from 'react';

import { SetState } from '../../../utils/commonTypes';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#272934',
  color: '#FFFFFF',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

type CustomModalProps = {
  open: boolean;
  setOpen: SetState<boolean>;
  title: string;
  modalContent: JSX.Element;
  modalStyle?: CSSProperties;
};

export const CustomModal = (props: CustomModalProps) => {
  const { open, setOpen, title, modalContent, modalStyle } = props;

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ ...style, ...modalStyle }}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{ textAlign: 'center', fontWeight: 500, fontSize: '24px' }}
          >
            {title}
          </Typography>
          {modalContent}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
