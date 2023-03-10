import { TextField } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import { CSSProperties, ChangeEvent } from 'react';

import styles from './CustomField.module.scss';

const CustomTextField = withStyles((theme: Theme) => ({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#323443',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#323443',
    },
    '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#323443',
    },
    '& label.Mui-focused': {
      color: '#9B9D9F',
    },
    '& label': {
      color: '#9B9D9F',
    },
  },
}))(TextField);

type FieldProps = {
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
  id?: string;
  fullWidth?: boolean;
  label?: string;
  name?: string;
  type?: string;
  error?: boolean;
  helperText?: string | false | undefined;
  className?: string;
  style?: CSSProperties;
  inputProps?: any;
};

const CustomField = (props: FieldProps) => {
  const {
    value,
    onChange,
    name,
    className,
    style,
    label,
    id,
    fullWidth,
    type,
    helperText,
    error,
    inputProps,
  } = props;
  return (
    <CustomTextField
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      className={className ? className : styles.field}
      label={label}
      fullWidth={fullWidth}
      variant='outlined'
      type={type}
      helperText={helperText}
      error={error}
      style={style}
      InputProps={inputProps}
    />
  );
};

export default CustomField;
