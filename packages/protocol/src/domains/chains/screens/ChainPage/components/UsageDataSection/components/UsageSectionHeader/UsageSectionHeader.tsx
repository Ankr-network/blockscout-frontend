import { Typography } from '@mui/material';
import { NavBarAnalytics } from '@ankr.com/ui';
import React from 'react';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { ChainSelectorContent } from 'modules/common/components/ChainSelectorContent';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { NavLink } from 'uiKit/NavLink';
import { DashboardRoutesConfig } from 'domains/dashboard/routes';

import { TimeframeSection } from '../TimeframeSection';
import { useDataUsageSectionStyles } from '../../UsageDataSectionStyles';
import { usageDataSectionTranslation } from '../../translation';

interface IUsageSectionHeaderProps {
  chainSelectorProps: React.ComponentProps<typeof ChainSelectorContent>;
  timeframeTabs: React.ComponentProps<typeof TimeframeSection>['tabs'];
  timeframe: React.ComponentProps<typeof TimeframeSection>['timeframe'];
  isDisabledTimeframeSwitcher?: boolean;
  isSecondLevelSelectorsHidden?: boolean;
  isMultichain?: boolean;
}

export const UsageSectionHeader = ({
  chainSelectorProps,
  isDisabledTimeframeSwitcher,
  isMultichain,
  isSecondLevelSelectorsHidden,
  timeframe,
  timeframeTabs,
}: IUsageSectionHeaderProps) => {
  const { classes, cx } = useDataUsageSectionStyles();

  const { keys, t } = useTranslation(usageDataSectionTranslation);

  return (
    <div
      className={cx(
        classes.usageSectionTitle,
        classes.privateUsageSectionTitle,
      )}
    >
      <div className={classes.usageSectionHeader}>
        <Typography variant="subtitle1">{t(keys.statistics)}</Typography>
        <TimeframeSection
          className={classes.timeframeSection}
          tabs={timeframeTabs}
          timeframe={timeframe}
          size={TabSize.Smallest}
          isDisabled={isDisabledTimeframeSwitcher}
        />
        <NavLink
          startIcon={<NavBarAnalytics className={classes.icon} />}
          variant="outlined"
          className={classes.button}
          size="small"
          href={DashboardRoutesConfig.dashboard.generatePath()}
        >
          {t(keys.statistics)}
        </NavLink>
      </div>
      {!isMultichain && (
        <ChainSelectorContent
          className={classes.subchainSelectorControls}
          isSecondLevelSelectorsHidden={isSecondLevelSelectorsHidden}
          {...chainSelectorProps}
        />
      )}
    </div>
  );
};
