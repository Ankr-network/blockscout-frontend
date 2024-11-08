import { Edit, OverlaySpinner } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo, useState } from 'react';
import { Timeframe, ESortChainsType } from '@ankr.com/chains-list';

import { Placeholder } from 'modules/common/components/Placeholder';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { TimeframeTabs } from 'domains/chains/screens/ChainPage/components/TimeframeTabs';
import { useTimeframe } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useTimeframe';
import { USAGE_SHORT_TIMEFRAME_LIST } from 'domains/chains/constants/timeframes';
import { SearchInput } from 'modules/chains/components/SearchInput';
import { ChainsSortSelect } from 'modules/chains/components/ChainsSortSelect';

import { useProjectEndpointsStyles } from './useProjectEndpointsStyles';
import { PaperBlock } from '../PaperBlock';
import { ConfigureChainsButton } from '../ProjectChainsTabs/components/ConfigureChainsButton';
import { ProjectChainsAccordion } from '../ProjectChainsAccordion';
import { useAddChainsButtonStyles } from './useAddChainsButtonStyles';
import { useProjectChainsAccordion } from '../ProjectChainsAccordion/hooks/useProjectChainsAccordion';

export interface ProjectChainsProps {
  className?: string;
  userEndpointToken?: string;
}

export const ProjectChains = ({
  className,
  userEndpointToken,
}: ProjectChainsProps) => {
  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes: USAGE_SHORT_TIMEFRAME_LIST,
  });

  const { classes, cx } = useProjectEndpointsStyles();
  const { classes: classNames } = useAddChainsButtonStyles();

  const [searchValue, setSearchValue] = useState('');
  const [sortType, setSortType] = useState(ESortChainsType.Trending);

  const projectChainsAccordionProps = useMemo(
    () => ({
      searchValue,
      sortType,
      timeframe,
      userEndpointToken,
    }),
    [searchValue, sortType, timeframe, userEndpointToken],
  );

  const { isLoading, visibleChains } = useProjectChainsAccordion(
    projectChainsAccordionProps,
  );

  return (
    <div className={cx(classes.root, className)}>
      <PaperBlock>
        <div className={classes.sectionTitle}>
          <Typography color="textSecondary" variant="subtitle2">
            {t('project.endpoints.title')}
          </Typography>
          <TimeframeTabs
            className={classes.timeframe}
            tabClassName={classes.tab}
            tabs={timeframeTabs}
            timeframe={timeframe}
            size={TabSize.ExtraSmall}
          />
        </div>
        <Placeholder
          hasPlaceholder={isLoading}
          placeholder={<OverlaySpinner />}
        >
          <div className={classes.chainsHeader}>
            <SearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />

            <ChainsSortSelect
              sortType={sortType}
              setSortType={setSortType}
              isDisabled={!visibleChains || visibleChains.length <= 1}
            />

            <ConfigureChainsButton
              classNames={classNames}
              buttonProps={{
                color: 'primary',
                variant: 'contained',
                startIcon: <Edit />,
                size: 'small',
              }}
              buttonText={t('project.endpoints.edit-chains-button')}
            />
          </div>

          <ProjectChainsAccordion {...projectChainsAccordionProps} />
        </Placeholder>
      </PaperBlock>
    </div>
  );
};
