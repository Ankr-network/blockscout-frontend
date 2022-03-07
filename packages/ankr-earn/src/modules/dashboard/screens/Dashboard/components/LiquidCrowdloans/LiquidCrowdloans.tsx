import { Typography } from '@material-ui/core';
import { uid } from 'react-uid';

import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { LiquidCrowdloanAsset } from 'modules/dashboard/components/LiquidCrowdloanAsset';
import { t } from 'modules/i18n/utils/intl';

import { useLiquidCrowdloanAsset } from './useLiquidCrowdloanAsset';
import { useLiquidCrowdloansStyles } from './useLiquidCrowdloansStyles';

const SKELETONS_COUNT = 1;

export const LiquidCrowdloans = (): JSX.Element => {
  const asset = useLiquidCrowdloanAsset();
  const classes = useLiquidCrowdloansStyles();

  const showAsset = true;
  const { isLoading } = asset;

  return (
    <>
      <Typography className={classes.title} variant="h3">
        {t('dashboard.assets-crowdloans')}
      </Typography>

      {isLoading ? (
        <AssetsList>
          {[...Array(SKELETONS_COUNT)].map((_, index) => (
            <LiquidCrowdloanAsset key={uid(index)} isLoading />
          ))}
        </AssetsList>
      ) : (
        <AssetsList>
          {showAsset && (
            <LiquidCrowdloanAsset
              claimable={asset.claimable}
              claimLink={asset.claimLink}
              isStakeLoading={asset.isLoading}
              network={asset.network}
              redeemDays={703}
              remaining={asset.remaining}
              token={asset.token}
            />
          )}
        </AssetsList>
      )}
    </>
  );
};
