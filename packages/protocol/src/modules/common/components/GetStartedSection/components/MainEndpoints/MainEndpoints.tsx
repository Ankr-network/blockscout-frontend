import { Typography } from '@mui/material';

import { ChainID } from 'modules/chains/types';
import { FLARE_TESTNETS_GROUPS_LIST } from 'modules/endpoints/types';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { useAppSelector } from 'store/useAppSelector';
import { selectHasFreemium } from 'domains/auth/store';

import { Endpoint } from '../Endpoint';
import { EndpointsHeader } from '../EndpointsHeader';
import { MainEndpointsProps } from './types';
import { Placeholder } from './components/Placeholder';
import { useMainEndpoints } from './hooks/useMainEndpoints';
import { useMainEndpointsStyles } from './MainEndpointsStyles';
import { renderFlareTitle } from './utils/renderFlareTitle';
import { mainEndpointsTranslation } from './translation';

export const MainEndpoints = ({
  chainSubType,
  feature,
  group,
  hasConnectWalletMessage,
  hasPremium,
  hasPrivateAccess,
  isFreemiumLabelHidden,
  isPremiumLabelHidden,
  onCopyEndpoint,
  publicChain,
}: MainEndpointsProps) => {
  const { flattenURLs, hasFeature, hasPlaceholder, title } = useMainEndpoints({
    feature,
    chainSubType,
    group,
    hasPrivateAccess,
    publicChain,
    hasPremium,
  });

  const isFreePremium = useAppSelector(selectHasFreemium);

  const { classes } = useMainEndpointsStyles();

  const endpointsHeader = (
    <EndpointsHeader
      isPremiumLabelHidden={isPremiumLabelHidden}
      hasPremium={hasPremium}
      title={title}
    />
  );

  const { keys, t } = useTranslation(mainEndpointsTranslation);

  if (!hasFeature) {
    return null;
  }

  if (hasPlaceholder) {
    return <Placeholder title={endpointsHeader} />;
  }

  const isFlareTestnetEndpoints =
    publicChain.id === ChainID.FLARE &&
    FLARE_TESTNETS_GROUPS_LIST.includes(group.id);

  if (isFlareTestnetEndpoints) {
    return (
      <>
        {flattenURLs.map(url => (
          <div className={classes.root} key={url}>
            <EndpointsHeader
              isPremiumLabelHidden={isPremiumLabelHidden}
              hasPremium={hasPremium}
              title={renderFlareTitle(url)}
            />
            <Endpoint
              hasConnectWalletMessage={hasConnectWalletMessage}
              key={url}
              onCopy={onCopyEndpoint}
              url={url!}
            />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className={classes.root}>
      {endpointsHeader}
      {flattenURLs.map(url => (
        <>
          <Endpoint
            hasConnectWalletMessage={hasConnectWalletMessage}
            key={url}
            onCopy={onCopyEndpoint}
            url={url!}
          />
          {!isFreePremium && !hasPrivateAccess && (
            <Typography variant="body3" color="textSecondary">
              {t('chain-item.get-started.endpoints.rate-limits')}
            </Typography>
          )}
        </>
      ))}
      {isFreePremium && !isFreemiumLabelHidden && (
        <Typography variant="body3" color="textSecondary">
          {t(keys.premiumCaption)}
        </Typography>
      )}
    </div>
  );
};
