import styled from '@emotion/styled';
import { Box, Chip } from '@mui/material';

export const ChipContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
}));

export const FilterChip = styled(Chip)(() => ({
  background: '#fff',
  borderRadius: 16,
  border: '1px solid #DADCE0',
  color: '#001F3D',
}));
