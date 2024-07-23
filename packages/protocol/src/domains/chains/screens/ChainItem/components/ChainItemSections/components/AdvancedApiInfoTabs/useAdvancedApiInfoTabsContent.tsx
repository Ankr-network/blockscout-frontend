import { useMemo } from 'react';

import { PrimaryTab } from 'modules/common/components/PrimaryTab';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { useUniformHeight } from 'modules/common/hooks/useUniformHeight';

import { AdvancedApiAboutContent } from '../AdvancedApiAboutContent';
import { AdvancedApiSupportedNetworks } from '../AdvancedApiSupportedNetworks';
import { useAdvancedApiInfoTabsStyles } from './useAdvancedApiInfoTabsStyles';
import { AdvancedApiPricingTable } from '../AdvancedApiPricingTable';
import { advancedApiInfoTabs } from './translation';

const TAB_CONTENT_SELECTOR = 'tab-content';

export const useAdvancedApiInfoTabsContent = () => {
  const { classes } = useAdvancedApiInfoTabsStyles();

  const { keys, t } = useTranslation(advancedApiInfoTabs);

  const maxHeight = useUniformHeight(`.${TAB_CONTENT_SELECTOR}`);

  return useMemo(
    () => [
      {
        id: 'about',
        title: (isSelected: boolean) => (
          <PrimaryTab
            className={classes.advancedApiPrimaryTab}
            isSelected={isSelected}
            label={t(keys.about)}
          />
        ),
        content: (
          <div
            style={{ minHeight: `${maxHeight}px` }}
            className={TAB_CONTENT_SELECTOR}
          >
            <AdvancedApiAboutContent />
          </div>
        ),
      },
      {
        id: 'networks',
        title: (isSelected: boolean) => (
          <PrimaryTab
            className={classes.advancedApiPrimaryTab}
            isSelected={isSelected}
            label={t(keys.networks)}
          />
        ),
        content: (
          <div
            style={{ minHeight: `${maxHeight}px` }}
            className={TAB_CONTENT_SELECTOR}
          >
            <AdvancedApiSupportedNetworks />
          </div>
        ),
      },
      {
        id: 'pricing',
        title: (isSelected: boolean) => (
          <PrimaryTab
            className={classes.advancedApiPrimaryTab}
            isSelected={isSelected}
            label={t(keys.pricing)}
          />
        ),
        content: (
          <div
            style={{ minHeight: `${maxHeight}px` }}
            className={TAB_CONTENT_SELECTOR}
          >
            <AdvancedApiPricingTable />
          </div>
        ),
      },
    ],
    [
      classes.advancedApiPrimaryTab,
      keys.about,
      keys.networks,
      keys.pricing,
      maxHeight,
      t,
    ],
  );
};
