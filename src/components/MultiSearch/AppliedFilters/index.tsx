import React from 'react';
import { SearchParam } from '../types';
import { ChipContainer, FilterChip } from './index.styles';

interface Props {
  searchParams: SearchParam[];
  onDelete: (searchParam: SearchParam) => void;
}

const AppliedFilters: React.FC<Props> = ({ searchParams, onDelete }) => {
  return (
    <ChipContainer>
      {searchParams.map(({ key, value }) => (
        <FilterChip
          label={`${key}: ${value}`}
          variant='outlined'
          onDelete={(): void => onDelete({ key, value })}
          key={`${key}-${value}`}
        />
      ))}
    </ChipContainer>
  );
};

export default AppliedFilters;
