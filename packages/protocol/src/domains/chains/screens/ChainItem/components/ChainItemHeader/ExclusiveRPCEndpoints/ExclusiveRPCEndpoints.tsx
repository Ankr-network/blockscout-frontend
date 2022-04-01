import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { Link } from 'react-router-dom';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { Preloader } from 'uiKit/Preloader';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchPrivateChainDetails } from 'domains/chains/actions/fetchPrivateChainDetails';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './ExclusiveRPCEndpointsStyles';
import { RPCEndpointsTabsManager } from 'modules/common/components/RPCEndpointsTabManager';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { useProvider } from 'modules/auth/hooks/useProvider';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { PlanRoutesConfig } from 'domains/plan/Routes';

interface ExclusiveRPCEndpointsProps {
  chainId: string;
}

export const ExclusiveRPCEndpoints = ({
  chainId,
}: ExclusiveRPCEndpointsProps) => {
  const classes = useStyles();
  const { handleFetchProvider, providerData } = useProvider();

  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(fetchPrivateChainDetails(chainId));
    handleFetchProvider();
  });

  return (
    <Queries<ResponseData<typeof fetchPrivateChainDetails>>
      requestActions={[fetchPrivateChainDetails]}
      spinner={
        <div className={classes.preloaderWrapper}>
          <Preloader centered />
        </div>
      }
    >
      {({ data }) => {
        const { extenders, extensions, testnets, urls } = data;

        const mainnetURLs = [
          ...urls,
          ...(extensions || []).flatMap<IApiChainURL>(
            extension => extension.urls,
          ),
          ...(extenders || []).flatMap<IApiChainURL>(extender => extender.urls),
        ];
        const testnetURLs = (testnets || []).flatMap<IApiChainURL>(testnet => [
          ...testnet.urls,
          ...(testnet.extensions || []).flatMap<IApiChainURL>(
            extension => extension.urls,
          ),
        ]);

        const isTitlePlural =
          mainnetURLs.flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc]))
            .length > 1 || testnetURLs.length > 0;
        const title = (
          <Typography variant="body2" className={classes.title}>
            {t('chain-item.header.private-endpoints', {
              plural: isTitlePlural ? t('chain-item.header.plural') : '',
            })}
          </Typography>
        );

        const isNervos = data.id === 'nervos';
        const [root, section] = isNervos
          ? [classes.nervos, undefined]
          : [classes.root, classes.section];

        const mainnetEndpoints = (
          <div className={root}>
            {mainnetURLs.map(({ rpc, ws }) => (
              <div className={section} key={rpc + ws}>
                <CopyToClipIcon
                  className={classes.copyToClip}
                  message={t('common.copy-message')}
                  size="l"
                  text={rpc}
                  textColor="textPrimary"
                />
                {ws && (
                  <CopyToClipIcon
                    className={classes.copyToClip}
                    message={t('common.copy-message')}
                    size="l"
                    text={ws}
                    textColor="textPrimary"
                  />
                )}
              </div>
            ))}
          </div>
        );

        const testnetEndpoints =
          testnetURLs.length > 0 ? (
            <div className={root}>
              {testnetURLs.map(({ rpc, ws }) => (
                <div className={section} key={rpc + ws}>
                  <CopyToClipIcon
                    className={classes.copyToClip}
                    message={t('common.copy-message')}
                    size="l"
                    text={rpc}
                    textColor="textPrimary"
                  />
                  {ws && (
                    <CopyToClipIcon
                      className={classes.copyToClip}
                      message={t('common.copy-message')}
                      size="l"
                      text={ws}
                      textColor="textPrimary"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : null;

        const additionalContent = (
          <Button
            variant="text"
            disabled={!providerData}
            className={classes.button}
            component={Link}
            to={PlanRoutesConfig.endpoint.generatePath(chainId)}
          >
            {t('chain-item.header.settings-button')}
          </Button>
        );

        return (
          <RPCEndpointsTabsManager
            additionalContent={additionalContent}
            mainnetEndpoints={mainnetEndpoints}
            testnetEndpoints={testnetEndpoints}
            title={title}
          />
        );
      }}
    </Queries>
  );
};
