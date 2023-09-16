import React, { useState, useCallback } from 'react';
import {
  Button,
  FormControl,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { FilterButton, FilterContainer } from './index.styles';
import { Filter, FilteredBy, SelectOption } from '../types';

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
    (event: SelectChangeEvent): void => {
      const selectedValue = event.target.value;
      const selectedFilter = filters.find(({ filterKey }) => filterKey.value === selectedValue);
      setSelectedFilter(selectedFilter || null);
    },
    [filters],
  );

  const handleFilterValueChange = useCallback((event: SelectChangeEvent): void => {
    setFilterValue(event.target.value);
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
      >
        <FilterContainer>
          <Typography variant='body1'>Filter results with</Typography>

          <FormControl sx={{ mt: 1 }} size='small'>
            <Select
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
            </Select>
          </FormControl>

          <FormControl size='small'>
            <Select
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
            </Select>
          </FormControl>

          <Button variant='contained' size='small' onClick={handleOnFilterByClick}>
            Apply filter
          </Button>
        </FilterContainer>
      </Popover>
    </>
  );
};

export default FilterBy;
