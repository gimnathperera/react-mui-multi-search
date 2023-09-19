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
  onSearch?: (searchBy: SearchParam[]) => void;
}

export const MultiSearch: React.FC<Props> = ({
  placeholder,
  searchOptions,
  filterOptions = [],
  onPrint,
  onSearch,
}): JSX.Element => {
  const [searchParams, setSearchParams] = useState<SearchParam[]>([]);

  const handleOnPrint = useCallback(() => {
    if (onPrint) onPrint();
  }, [onPrint]);

  const handleAddFilterByParam = useCallback(({ filterKey, filterValue }: FilteredBy) => {
    const filterExists = searchParams.find(
      param => param.key === filterKey && param.value === filterValue,
    );
    if (filterExists) return;

    setSearchParams(prevSearchParams => [
      ...prevSearchParams,
      { key: filterKey, value: filterValue },
    ]);
  }, []);

  const handleAddSearchByParam = useCallback(({ searchKey, searchValue }: SearchedBy) => {
    const newSearchParams = [...searchParams, { key: searchKey, value: searchValue }];
    setSearchParams(newSearchParams);

    if (onSearch) onSearch(newSearchParams);
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
          {filterOptions?.length > 0 ? (
            <>
              <FilterBy filters={filterOptions} onFilterBy={handleAddFilterByParam} />
              <StyledDivider orientation='vertical' />
            </>
          ) : null}

          <SearchBy
            searchOptions={searchOptions}
            placeholder={placeholder}
            onSearchBy={handleAddSearchByParam}
          />

          {onPrint ? (
            <>
              <StyledDivider orientation='vertical' />

              <StyledIconButton onClick={handleOnPrint}>
                <IosShareOutlinedIcon />
              </StyledIconButton>
            </>
          ) : null}
        </SearchBarContainer>
      </Grid>
      {searchParams.length > 0 ? (
        <Grid item xs={12}>
          <AppliedFilters searchParams={searchParams} onDelete={handleRemoveSearchParam} />
        </Grid>
      ) : null}
    </Grid>
  );
};
