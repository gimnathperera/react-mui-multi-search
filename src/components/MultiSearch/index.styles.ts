import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';

export const SearchBarContainer = styled(Paper)(() => ({
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  padding: '6px',
  boxShadow: 'none',
  backgroundColor: '#F5F5F5',
}));

export const StyledIconButton = styled(IconButton)(() => ({
  padding: '8px',
  borderRadius: '12px',
}));

export const StyledDivider = styled(Divider)(() => ({
  height: 28,
  margin: '6px',
}));
