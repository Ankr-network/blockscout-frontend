import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { Search } from 'modules/common/components/Search';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';

import { useChainStepStyles } from './useChainStepStyles';
import { ChainsTable } from './ChainsTable';

export const ChainStep = () => {
  const { classes } = useChainStepStyles();

  const [searchContent, setSearchContent] = useSearch();

  return (
    <div className={classes.chainsRoot}>
      <div className={classes.chainsHeader}>
        <div className={classes.chainTitleWrapper}>
          <Typography className={classes.title} variant="h6">
            {t('projects.new-project.step-2.title')}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            component="p"
          >
            {t('projects.new-project.step-2.description')}
          </Typography>
        </div>
        <Search
          searchContent={searchContent}
          className={classes.search}
          setSearchContent={setSearchContent}
        />
      </div>

      <ChainsTable searchContent={searchContent} />
    </div>
  );
};
