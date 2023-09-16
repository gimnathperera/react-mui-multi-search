import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';

export const FilterButton = styled(IconButton)(() => ({
  padding: '8px',
  borderRadius: '12px',
}));

export const FilterContainer = styled(Box)(() => ({
  padding: 16,
  minWidth: '187px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));
