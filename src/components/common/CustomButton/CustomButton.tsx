import { Button, SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';

type ButtonProps = {
  text: string;
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'text' | 'contained' | 'outlined';
  gradient?: boolean;
  loading?: boolean;
  disabled?: boolean;
  styles?: SxProps<Theme>;
};
const CustomButton = (props: ButtonProps) => {
  const {
    text,
    type = 'submit',
    onClick,
    color = 'primary',
    variant = 'contained',
    gradient,
    loading,
    disabled,
    styles,
  } = props;
  return (
    <Box sx={styles ? styles : { position: 'relative' }}>
      <Button
        type={type}
        fullWidth
        color={color}
        variant={variant}
        disabled={loading || disabled}
        onClick={onClick}
        style={
          gradient
            ? {
                position: 'relative',
                background: 'linear-gradient(104.43deg, #A139FD 11.26%, #50BDFC 90.79%)',
                backdropFilter: 'blur(20px)',
                borderRadius: '4px',
                textTransform: 'none',
              }
            : { textTransform: 'none' }
        }
      >
        {text}
      </Button>
    </Box>
  );
};

export default CustomButton;
