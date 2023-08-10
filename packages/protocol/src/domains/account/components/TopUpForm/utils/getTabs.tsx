import { Ankr, CreditCard } from '@ankr.com/ui';

import { Tab } from 'uiKit/TabsManager';
import { TrackTopUpSubmit } from 'domains/account/types';

import { AnkrForm } from '../components/AnkrForm';
import { Tab as Title } from '../components/Tab';
import { TopUpFormTabID } from '../constants';
import { UsdForm } from '../components/UsdForm/UsdForm';

export interface GetTabsParams {
  handleOpenEmailDialog: () => void;
  hasAnkrTab: boolean;
  hasEmailBound: boolean;
  trackSubmit: TrackTopUpSubmit;
  usdPriceId?: string;
}

export const getTabs = ({
  handleOpenEmailDialog,
  hasAnkrTab,
  hasEmailBound,
  trackSubmit,
  usdPriceId,
}: GetTabsParams) => {
  const usdTab: Tab<TopUpFormTabID> = {
    id: TopUpFormTabID.USD,
    content: (
      <UsdForm
        handleOpenEmailDialog={handleOpenEmailDialog}
        hasEmailBound={hasEmailBound}
        onBundleBannerClick={() => {}}
        trackSubmit={trackSubmit}
        priceId={usdPriceId}
      />
    ),
    title: (isSelected: boolean) => (
      <Title
        icon={<CreditCard />}
        isSelected={isSelected}
        label={TopUpFormTabID.USD}
      />
    ),
  };

  const ankrTab: Tab<TopUpFormTabID> = {
    id: TopUpFormTabID.ANKR,
    content: (
      <AnkrForm
        handleOpenEmailDialog={handleOpenEmailDialog}
        hasEmailBound={hasEmailBound}
        onBundleBannerClick={() => {}}
        trackSubmit={trackSubmit}
      />
    ),
    title: (isSelected: boolean) => (
      <Title
        icon={<Ankr />}
        isSelected={isSelected}
        label={TopUpFormTabID.ANKR}
      />
    ),
  };

  return hasAnkrTab ? [ankrTab, usdTab] : [usdTab];
};
