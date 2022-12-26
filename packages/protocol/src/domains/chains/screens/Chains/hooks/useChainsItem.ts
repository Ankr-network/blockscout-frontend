import { useCallback } from 'react';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { Chain } from '../components/ChainsList/ChainsListTypes';
import { ChainID } from 'modules/chains/types';
import { useDispatch } from 'react-redux';
import { setOriginChainURL } from 'domains/chains/store/chainsSlice';
import { INDEX_PATH } from 'domains/chains/routes';

const publicKey = 'chains.links.public';
const privateKey = 'chains.links.private';

export const useChainsItem = (
  chain: Chain,
  hasPrivateAccess: boolean,
  path?: string,
) => {
  const urls = [
    ...chain.urls,
    ...(chain.extensions || []).flatMap<IApiChainURL>(
      extension => extension.urls,
    ),
    ...(chain.extenders || []).flatMap<IApiChainURL>(extender => extender.urls),
  ];

  const dummyMessage = t(hasPrivateAccess ? privateKey : publicKey, {
    number: urls.length,
  });

  const isSui = chain.id === ChainID.SUI;

  const [label, tooltip] = isSui
    ? [t('chains.beta'), '']
    : [t('chains.archive'), tHTML('chains.archive-tooltip-text')];

  const dispatch = useDispatch();

  const handleOriginUrlClick = useCallback(() => {
    dispatch(setOriginChainURL(path ?? INDEX_PATH));
  }, [path, dispatch]);

  return {
    dummyMessage,
    handleOriginUrlClick,
    isSui,
    label,
    tooltip,
    urls,
  };
};
