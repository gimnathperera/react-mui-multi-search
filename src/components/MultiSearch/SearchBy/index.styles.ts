import InputBase from '@mui/material/InputBase';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

export const SearchInput = styled(InputBase)(() => ({
  marginLeft: '2px',
  flex: 1,
}));

export const StyledIconButton = styled(IconButton)(() => ({
  padding: '8px',
  borderRadius: '12px',
}));
