import React, { useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import AppliedFilters from './AppliedFilters';
import FilterBy from './FilterBy';
import SearchBy from './SearchBy';
import { SearchBarContainer, StyledDivider, StyledIconButton } from './index.styles';
import { Filter, FilteredBy, SearchParam, SearchedBy, SelectOption } from './types';

interface Props {
  placeholder?: string;
  searchOptions: SelectOption[];
  filterOptions?: Filter[];
  onPrint?: () => void;
}

export const MultiSearch: React.FC<Props> = ({
  placeholder,
  searchOptions,
  filterOptions = [],
  onPrint,
}): JSX.Element => {
  const [searchParams, setSearchParams] = useState<SearchParam[]>([]);

  const handlePrintButtonClick = useCallback(() => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  }, [onPrint]);

  const handleAddFilterByParam = useCallback(({ filterKey, filterValue }: FilteredBy) => {
    setSearchParams(prevSearchParams => [
      ...prevSearchParams,
      { key: filterKey, value: filterValue },
    ]);
  }, []);

  const handleAddSearchByParam = useCallback(({ searchKey, searchValue }: SearchedBy) => {
    setSearchParams(prevSearchParams => [
      ...prevSearchParams,
      { key: searchKey, value: searchValue },
    ]);
  }, []);

  const handleRemoveSearchParam = useCallback((paramToRemove: SearchParam) => {
    setSearchParams(prevSearchParams =>
      prevSearchParams.filter(param => param.value !== paramToRemove.value),
    );
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBarContainer>
          {filterOptions.length > 0 && (
            <>
              <FilterBy filters={filterOptions} onFilterBy={handleAddFilterByParam} />
              <StyledDivider orientation='vertical' />
            </>
          )}

          <SearchBy
            searchOptions={searchOptions}
            placeholder={placeholder}
            onSearchBy={handleAddSearchByParam}
          />

          <StyledDivider orientation='vertical' />

          <StyledIconButton onClick={handlePrintButtonClick}>
            <IosShareOutlinedIcon />
          </StyledIconButton>
        </SearchBarContainer>
      </Grid>
      {searchParams.length > 0 && (
        <Grid item xs={12}>
          <AppliedFilters searchParams={searchParams} onDelete={handleRemoveSearchParam} />
        </Grid>
      )}
    </Grid>
  );
};
