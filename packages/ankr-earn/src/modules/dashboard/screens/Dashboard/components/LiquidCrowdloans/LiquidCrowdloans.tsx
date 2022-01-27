import { Typography } from '@material-ui/core';
import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { t } from 'modules/i18n/utils/intl';
import { useLiquidCrowdloanAsset } from './useLiquidCrowdloanAsset';
import { useLiquidCrowdloansStyles } from './useLiquidCrowdloansStyles';
import { LiquidCrowdloanAsset } from 'modules/dashboard/components/LiquidCrowdloanAsset';

const SKELETONS_COUNT = 1;

export const LiquidCrowdloans = () => {
  const asset = useLiquidCrowdloanAsset();
  const classes = useLiquidCrowdloansStyles();

  const showAsset = true;
  const isLoading = asset.isLoading;

  return (
    <>
      <Typography className={classes.title} variant="h3">
        {t('dashboard.assets-crowdloans')}
      </Typography>

      {isLoading ? (
        <AssetsList>
          {[...Array(SKELETONS_COUNT)].map((_, index) => (
            <LiquidCrowdloanAsset isLoading key={index} />
          ))}
        </AssetsList>
      ) : (
        <AssetsList noChildrenSlot={<NoAssets />}>
          {showAsset && (
            <LiquidCrowdloanAsset
              redeemDays={703}
              network={asset.network}
              token={asset.token}
              remaining={asset.remaining}
              claimable={asset.claimable}
              claimLink={asset.claimLink}
              isStakeLoading={asset.isLoading}
            />
          )}
        </AssetsList>
      )}
    </>
  );
};
