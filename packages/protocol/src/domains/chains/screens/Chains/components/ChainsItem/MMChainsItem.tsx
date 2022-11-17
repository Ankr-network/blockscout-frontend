import { Button } from '@material-ui/core';
import { NavLink } from 'ui';

import { IApiChainURL } from 'domains/chains/api/queryChains';
import { ChainsRoutesConfig, INDEX_MM_PATH } from 'domains/chains/routes';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { RPCInfoFun } from 'uiKit/RPCInfoFunc/RPCInfoFunc';
import { useStyles } from './ChainsItemStyles';
import { ChainID } from 'modules/chains/types';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { ChainsItemProps } from './ChainsItemTypes';
import { useDispatch } from 'react-redux';
import { setOriginChainURL } from 'domains/chains/store/chainsSlice';
import { useCallback } from 'react';
import { getPublicUrl } from 'domains/chains/utils/chainsUtils';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const MMChainsItem = ({
  chain,
  description,
  isHighlighted = false,
  isLoading,
  logoSrc,
  name,
  period,
  publicChain,
  timeframe,
  totalRequests,
}: ChainsItemProps) => {
  const classes = useStyles(isHighlighted);

  const { credentials } = useAuth();

  const urls = [
    ...chain.urls,
    ...(chain.extensions || []).flatMap<IApiChainURL>(
      extension => extension.urls,
    ),
    ...(chain.extenders || []).flatMap<IApiChainURL>(extender => extender.urls),
  ];

  const isSuiTestnet = chain.id === ChainID.SUI_TESTNET;

  const [label, tooltip] = isSuiTestnet
    ? [t('chains.beta'), '']
    : [t('chains.archive'), tHTML('chains.archive-tooltip-text')];

  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setOriginChainURL(INDEX_MM_PATH));
  }, [dispatch]);

  return (
    <div role="button" tabIndex={0} onClick={handleClick}>
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
            {urls.length <= 1
              ? publicChain &&
                urls.map(({ rpc }) => (
                  <RPCInfoFun
                    key={rpc}
                    info={credentials ? getPublicUrl(rpc) : rpc}
                    publicChain={publicChain}
                  />
                ))
              : publicChain && (
                  <RPCInfoFun
                    info={credentials ? getPublicUrl(urls[0].rpc) : urls[0].rpc}
                    publicChain={publicChain}
                  />
                )}
          </div>
          <div className={classes.buttonsWrapper}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              {t('chains.more-details')}
            </Button>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
