import { SortType } from 'modules/chains/types';
import { Search } from 'modules/common/components/Search';

import { useBaseChainsHeaderStyles } from './useBaseChainsHeaderStyles';
import { ChainsSortSelect } from '../ChainsSortSelect';

interface IBaseChainsHeader {
  sortType: SortType;
  setSortType: (type: SortType) => void;
  searchContent: string;
  setSearchContent: (searchContent: string) => void;
}

export const BaseChainsHeader = ({
  searchContent,
  setSearchContent,
  setSortType,
  sortType,
}: IBaseChainsHeader) => {
  const { classes } = useBaseChainsHeaderStyles();

  return (
    <div className={classes.root}>
      <div className={classes.first}>
        <ChainsSortSelect sortType={sortType} onSelect={setSortType} />
      </div>
      <Search
        searchContent={searchContent}
        setSearchContent={setSearchContent}
      />
    </div>
  );
};
