import React, { useState, useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { SearchInput, StyledIconButton } from './index.styles';
import { SearchedBy, SelectOption } from '../types';

interface Props {
  searchOptions: SelectOption[];
  onSearchBy: (searchBy: SearchedBy) => void;
  placeholder?: string;
}

const SearchBy: React.FC<Props> = ({ searchOptions, placeholder, onSearchBy }) => {
  const [selectedSearchKey, setSelectedSearchKey] = useState<string>(
    searchOptions?.[0]?.value || '',
  );
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchKeyChange = useCallback((event: SelectChangeEvent): void => {
    setSelectedSearchKey(event.target.value);
  }, []);

  const handleSearchValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchValue(event.target.value);
    },
    [],
  );

  const handleOnSearchByClick = useCallback((): void => {
    if (!selectedSearchKey || !searchValue) return;
    onSearchBy({ searchKey: selectedSearchKey, searchValue });
    resetSearchBy();
  }, [selectedSearchKey, searchValue, onSearchBy]);

  const resetSearchBy = useCallback((): void => {
    setSearchValue('');
    setSelectedSearchKey('');
  }, []);

  return (
    <>
      <StyledIconButton onClick={handleOnSearchByClick}>
        <SearchIcon />
      </StyledIconButton>

      <SearchInput
        placeholder={placeholder || 'Search'}
        onChange={handleSearchValueChange}
        value={searchValue}
      />

      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel id='search-select-label'>Search By</InputLabel>
        <Select
          labelId='search-select-label'
          value={selectedSearchKey}
          label='Search By'
          onChange={handleSearchKeyChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {searchOptions?.map(({ key, value }) => (
            <MenuItem value={value} key={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SearchBy;
