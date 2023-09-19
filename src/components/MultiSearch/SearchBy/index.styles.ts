import InputBase from '@mui/material/InputBase';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

export const SearchInput = styled(InputBase)(() => ({
  marginLeft: '0.125rem',
  flex: 1,
}));

export const StyledIconButton = styled(IconButton)(() => ({
  padding: '0.5rem',
  borderRadius: '0.75rem',
}));
