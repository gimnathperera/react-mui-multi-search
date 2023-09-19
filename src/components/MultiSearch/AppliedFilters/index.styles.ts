import styled from '@emotion/styled';
import { Box, Chip } from '@mui/material';

export const ChipContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
}));

export const FilterChip = styled(Chip)(() => ({
  background: '#fff',
  borderRadius: '1rem',
  border: '0.0625rem solid #DEEEFF',
  color: '#001F3D',
}));
