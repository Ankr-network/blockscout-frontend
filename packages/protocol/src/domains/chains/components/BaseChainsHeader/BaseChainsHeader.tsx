import { t } from '@ankr.com/common';

import { PageHeader } from 'modules/common/components/PageHeader';
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
  sortType,
  setSortType,
  searchContent,
  setSearchContent,
}: IBaseChainsHeader) => {
  const { classes } = useBaseChainsHeaderStyles();

  return (
    <div className={classes.root}>
      <div className={classes.first}>
        <PageHeader
          title={t('chains.title')}
          select={
            <ChainsSortSelect sortType={sortType} onSelect={setSortType} />
          }
        />
      </div>
      <Search
        searchContent={searchContent}
        setSearchContent={setSearchContent}
      />
    </div>
  );
};
