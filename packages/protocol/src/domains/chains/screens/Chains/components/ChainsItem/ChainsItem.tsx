import { Button, Typography } from '@material-ui/core';
import { NavLink } from 'ui';

import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { ChainID } from 'modules/chains/types';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { ChainsItemProps } from './ChainsItemTypes';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './ChainsItemStyles';

const publicKey = 'chains.links.public';
const privateKey = 'chains.links.private';

export const ChainsItem = ({
  chain,
  description,
  isHighlighted = false,
  isLoading,
  isPremium,
  logoSrc,
  name,
  period,
  publicChain,
  timeframe,
  totalRequests,
}: ChainsItemProps) => {
  const classes = useStyles(isHighlighted);

  const urls = [
    ...chain.urls,
    ...(chain.extensions || []).flatMap<IApiChainURL>(
      extension => extension.urls,
    ),
    ...(chain.extenders || []).flatMap<IApiChainURL>(extender => extender.urls),
  ];

  const dummyMessage = t(isPremium ? privateKey : publicKey, {
    number: urls.length,
  });

  const isSuiTestnet = chain.id === ChainID.SUI_TESTNET;

  const [label, tooltip] = isSuiTestnet
    ? [t('chains.beta'), '']
    : [t('chains.archive'), tHTML('chains.archive-tooltip-text')];

  return (
    <NavLink
      isRouterLink
      href={ChainsRoutesConfig.chainDetails.generatePath(chain.id)}
      tabIndex={0}
      className={classes.root}
    >
      <ChainMainInfo
        className={classes.mainInfo}
        description={
          description && (
            <ChainRequestsLabel description={description} label={period} />
          )
        }
        isHighlighted={isHighlighted}
        isLoading={isLoading}
        label={
          (chain.isArchive || isSuiTestnet) && (
            <ChainLabel
              className={classes.archive}
              label={label}
              tooltip={tooltip}
            />
          )
        }
        logoSrc={logoSrc}
        name={name}
        timeframe={timeframe}
        totalRequests={totalRequests}
      />
      <div className={classes.bottom}>
        <div className={classes.links}>
          {urls.length <= 1 ? (
            urls.map(({ rpc }) => (
              <CopyToClipIcon
                text={rpc}
                message={t('common.copy-message')}
                key={rpc}
                className={classes.copyItem}
              />
            ))
          ) : (
            <Typography
              className={classes.dummy}
              variant="body2"
              noWrap
              color="textSecondary"
            >
              {dummyMessage}
            </Typography>
          )}
        </div>
        <div className={classes.buttonsWrapper}>
          {publicChain && (
            <AddNetworkButton
              publicChain={publicChain}
              size="medium"
              className={classes.buttonAddNetwork}
            />
          )}
          <Button variant="outlined" color="primary" className={classes.button}>
            {t('chains.more-details')}
          </Button>
        </div>
      </div>
    </NavLink>
  );
};
