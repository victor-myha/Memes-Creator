import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const Switcher = styled(Switch)(({ theme }) => ({
  padding: 6,
  '& .MuiSwitch-track': {
    borderRadius: '99px',
    '&:before, &:after': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      content: '"On"',
      color: '#07D41B',
      fontWeight: 700,
      lineHeight: '12px',
      fontSize: '11px',
    },
    '&:after': {
      // content: '"Off"',
      left: '32px',
      fontSize: '11px',
      fontWeight: 700,
      lineHeight: '12px',
      color: '#07D41B',
    },
  },
  '& .MuiSwitch-thumb': {
    color: '#07D41B',
    boxShadow: 'none',
    width: 12,
    height: 12,
    margin: 4,
  },
}));

export default function CustomizedSwitches({ checked }: { checked: boolean }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switcher defaultChecked={checked} color={'success'} />}
        label=''
      />
    </FormGroup>
  );
}
