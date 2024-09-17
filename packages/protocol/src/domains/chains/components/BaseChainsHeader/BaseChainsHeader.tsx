import { ESortChainsType } from 'modules/chains/types';
import { Search } from 'modules/common/components/Search';
import { ChainsSortSelect } from 'modules/chains/components/ChainsSortSelect';
import { Tab } from 'modules/common/hooks/useTabs';
import { GuardResolution } from 'modules/common/components/GuardResolution';

import { useBaseChainsHeaderStyles } from './useBaseChainsHeaderStyles';
import {
  ChainViewSelector,
  EChainView,
} from '../../screens/ChainsListPage/components/ChainViewSelector';

interface IBaseChainsHeader {
  sortType: ESortChainsType;
  setSortType: (type: ESortChainsType) => void;
  searchContent: string;
  setSearchContent: (searchContent: string) => void;
  chainsViewTabs?: Tab<EChainView>[];
  selectedChainsViewTab?: Tab<EChainView>;
}

export const BaseChainsHeader = ({
  chainsViewTabs,
  searchContent,
  selectedChainsViewTab,
  setSearchContent,
  setSortType,
  sortType,
}: IBaseChainsHeader) => {
  const { classes } = useBaseChainsHeaderStyles();

  return (
    <div className={classes.root}>
      <div className={classes.first}>
        <Search
          className={classes.chainsListSearch}
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

      {chainsViewTabs && selectedChainsViewTab && (
        <GuardResolution protectedResolution="smDown">
          <ChainViewSelector
            chainsViewTabs={chainsViewTabs}
            selectedChainsViewTab={selectedChainsViewTab}
          />
        </GuardResolution>
      )}
    </div>
  );
};
