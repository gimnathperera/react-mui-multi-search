import Paper, { PaperProps } from '@mui/material/Paper';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Divider, { DividerProps } from '@mui/material/Divider';
import Select, { SelectProps } from '@mui/material/Select';
import styled from '@emotion/styled';
import { Button, ButtonProps } from '@mui/material';

export const SearchBarContainer = styled(Paper)<PaperProps>(() => ({
  borderRadius: '1rem',
  display: 'flex',
  alignItems: 'center',
  padding: '0.375rem',
  boxShadow: 'none',
  border: '0.0625rem solid #DEEEFF', // 1px converted to rem
}));

export const StyledIconButton = styled(IconButton)<IconButtonProps>(() => ({
  padding: '0.5rem',
  borderRadius: '0.75rem',
}));

export const StyledDivider = styled(Divider)<DividerProps>(() => ({
  height: '1.75rem',
  margin: '0.375rem',
}));

export const StyledSelect = styled(Select)<SelectProps>(() => ({
  borderRadius: '0.75rem',
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#DEEEFF',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#DEEEFF',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#DEEEFF',
  },
  '.MuiSvgIcon-root ': {
    fill: '#BFD3E4 !important',
  },
}));

export const StyledButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: '0.75rem',
}));
