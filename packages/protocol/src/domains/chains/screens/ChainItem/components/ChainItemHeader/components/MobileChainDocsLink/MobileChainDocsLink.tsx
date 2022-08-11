import { Button } from '@material-ui/core';

import { ReactComponent as OpenLinkIcon } from 'uiKit/Icons/open-link.svg';
import { getChainDocsLink } from '../../utils/getChainDocsLink';
import { t } from 'modules/i18n/utils/intl';
import { useMobileChainDocsLinkStyles } from './MobileChainDocsLinkStyles';

export interface MobileChainDocsLinkProps {
  chainId: string;
}

export const MobileChainDocsLink = ({ chainId }: MobileChainDocsLinkProps) => {
  const link = getChainDocsLink(chainId);

  const classes = useMobileChainDocsLinkStyles();

  return (
    <Button
      className={classes.button}
      disabled={!link}
      href={link || ''}
      endIcon={<OpenLinkIcon />}
      target="_blank"
      variant="text"
    >
      {t('chain-item.header.docs')}
    </Button>
  );
};
