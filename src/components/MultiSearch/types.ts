export interface SearchParam {
  key: string;
  value: string;
}

export interface Filter {
  filterKey: SelectOption;
  filterOptions: SelectOption[];
  filterType?: 'SELECT' | 'INPUT' | 'DATE' | 'DATE_RANGE';
}

export interface FilteredBy {
  filterKey: string;
  filterValue: string;
}

export interface SelectOption {
  key: string;
  value: string;
}

export interface SearchedBy {
  searchKey: string;
  searchValue: string;
}
