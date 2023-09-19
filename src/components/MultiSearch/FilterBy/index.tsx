import React, { useState, useCallback } from 'react';
import { FormControl, MenuItem, Popover, SelectChangeEvent, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { FilterButton, FilterContainer } from './index.styles';
import { Filter, FilteredBy, SelectOption } from '../types';
import { StyledButton, StyledSelect } from '../index.styles';

interface Props {
  filters: Filter[];
  onFilterBy: (filterBy: FilteredBy) => void;
}

const FilterBy: React.FC<Props> = ({ filters, onFilterBy }) => {
  const [showFilterPopup, setShowFilterPopup] = useState<HTMLButtonElement | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const [filterValue, setFilterValue] = useState<string>('');

  const open = Boolean(showFilterPopup);
  const id = open ? 'filter-popover' : undefined;

  const handleFilterClick = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
    setShowFilterPopup(event.currentTarget);
  }, []);

  const handleFilterClose = useCallback((): void => {
    setShowFilterPopup(null);
    resetFilter();
  }, []);

  const handleFilterKeyChange = useCallback(
    (event: SelectChangeEvent<unknown>): void => {
      const selectedValue = event.target.value;
      const selectedFilter = filters.find(({ filterKey }) => filterKey.value === selectedValue);
      setSelectedFilter(selectedFilter || null);
    },
    [filters],
  );

  const handleFilterValueChange = useCallback((event: SelectChangeEvent<unknown>): void => {
    const selectedValue = event.target.value;

    setFilterValue(String(selectedValue));
  }, []);

  const handleOnFilterByClick = useCallback((): void => {
    if (selectedFilter) {
      onFilterBy({ filterKey: selectedFilter.filterKey.value, filterValue });
      handleFilterClose();
      resetFilter();
    }
  }, [selectedFilter, filterValue, onFilterBy, handleFilterClose]);

  const resetFilter = useCallback((): void => {
    setSelectedFilter(filters[0] || null);
    setFilterValue('');
  }, [filters]);

  return (
    <>
      <FilterButton onClick={handleFilterClick}>
        <TuneIcon />
      </FilterButton>

      <Popover
        id={id}
        open={open}
        anchorEl={showFilterPopup}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            marginTop: '8px',
            border: '1px solid #DEEEFF',
            borderRadius: 16,
            boxShadow: '3px -5px 40px rgba(59, 59, 63, 0.09151)',
          },
        }}
      >
        <FilterContainer>
          <Typography variant='body1'>Filter results with</Typography>

          <FormControl sx={{ mt: 1 }} size='small'>
            <StyledSelect
              labelId='filter-key-label'
              id='filter-key-select'
              value={selectedFilter ? selectedFilter.filterKey.value : ''}
              onChange={handleFilterKeyChange}
            >
              {filters.map(({ filterKey }) => (
                <MenuItem value={filterKey.value} key={filterKey.key}>
                  {filterKey.key}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>

          <FormControl size='small'>
            <StyledSelect
              labelId='filter-value-label'
              id='filter-value-select'
              value={filterValue}
              onChange={handleFilterValueChange}
              disabled={!selectedFilter?.filterOptions?.length}
            >
              {selectedFilter?.filterOptions?.map(({ key, value }: SelectOption) => (
                <MenuItem value={value} key={key}>
                  {key}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>

          <StyledButton variant='contained' size='small' onClick={handleOnFilterByClick}>
            Apply filter
          </StyledButton>
        </FilterContainer>
      </Popover>
    </>
  );
};

export default FilterBy;
