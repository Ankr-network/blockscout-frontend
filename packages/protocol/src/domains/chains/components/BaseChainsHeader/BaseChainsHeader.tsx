import { ESortChainsType } from 'modules/chains/types';
import { Search } from 'modules/common/components/Search';
import { ChainsSortSelect } from 'modules/chains/components/ChainsSortSelect';

import { useBaseChainsHeaderStyles } from './useBaseChainsHeaderStyles';

interface IBaseChainsHeader {
  sortType: ESortChainsType;
  setSortType: (type: ESortChainsType) => void;
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
        <Search
          searchContent={searchContent}
          setSearchContent={setSearchContent}
        />
        <ChainsSortSelect
          className={classes.chainsSortSelect}
          sortType={sortType}
          setSortType={setSortType}
          isDisabled={false}
        />
      </div>
    </div>
  );
};
