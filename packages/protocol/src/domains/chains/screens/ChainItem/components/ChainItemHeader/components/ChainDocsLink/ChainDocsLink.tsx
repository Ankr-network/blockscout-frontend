import { Button } from '@material-ui/core';
import classNames from 'classnames';

import { IApiChain } from 'domains/chains/api/queryChains';
import { ReactComponent as FileIcon } from 'uiKit/Icons/file.svg';
import { getChainDocsLink } from '../../utils/getChainDocsLink';
import { t } from 'modules/i18n/utils/intl';
import { useChainDocsLinkStyles } from './ChainDocsLinkStyles';

export interface ChainDocsLinkProps {
  chain: IApiChain;
  className?: string;
}

export const ChainDocsLink = ({
  chain: { id },
  className,
}: ChainDocsLinkProps) => {
  const link = getChainDocsLink(id);

  const classes = useChainDocsLinkStyles();

  return (
    <Button
      className={classNames(className, classes.button)}
      classes={{
        iconSizeMedium: classes.iconSize,
      }}
      disabled={!link}
      href={link || ''}
      startIcon={<FileIcon />}
      target="_blank"
      variant="outlined"
    >
      {t('chain-item.header.docs')}
    </Button>
  );
};
