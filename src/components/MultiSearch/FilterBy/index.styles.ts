import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';

export const FilterButton = styled(IconButton)(() => ({
  padding: '0.5rem',
  borderRadius: '0.75rem',
}));

export const FilterContainer = styled(Box)(() => ({
  padding: '1rem',
  minWidth: '11.6875rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
}));
