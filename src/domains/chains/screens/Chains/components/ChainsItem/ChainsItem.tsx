import React from 'react';
import { Button } from '@material-ui/core';

import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { t } from 'modules/i18n/utils/intl';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useStyles } from './ChainsItemStyles';
import { ChainsItemProps } from './ChainsItemTypes';
import { ButtonSpecial } from '../../../../../../uiKit/ButtonSpecial';

export const ChainsItem = ({
  logoSrc,
  name,
  description,
  period,
  links,
  onButtonClick,
  hasWalletButton,
  isWalletConnectButtonActive,
  onNetworkAdd,
}: ChainsItemProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ChainMainInfo
        logoSrc={logoSrc}
        name={name}
        className={classes.mainInfo}
        description={
          description && (
            <ChainRequestsLabel description={description} label={period} />
          )
        }
      />
      <div className={classes.bottom}>
        <div className={classes.links}>
          {links.map(link => (
            <CopyToClipIcon
              text={link}
              message={t('common.copy-message')}
              key={link}
              className={classes.copyItem}
            />
          ))}
        </div>
        <div className={classes.buttonsWrapper}>
          {hasWalletButton && (
            <ButtonSpecial
              className={classes.buttonAddNetwork}
              isDisabled={!isWalletConnectButtonActive}
              onClick={onNetworkAdd}
              size="m"
            />
          )}

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={onButtonClick}
          >
            {t('chains.more-details')}
          </Button>
        </div>
      </div>
    </div>
  );
};
