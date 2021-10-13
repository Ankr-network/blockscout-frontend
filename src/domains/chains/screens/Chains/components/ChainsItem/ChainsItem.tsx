import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { t } from 'modules/i18n/utils/intl';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useStyles } from './ChainsItemStyles';
import { ChainsItemProps } from './ChainsItemTypes';

export const ChainsItem = ({
  logoSrc,
  name,
  description,
  period,
  chainLink,
  chainDetailsLink,
}: ChainsItemProps) => {
  const classes = useStyles();
  const history = useHistory();

  const onButtonClick = useCallback(() => {
    history.push(chainDetailsLink);
  }, [history, chainDetailsLink]);

  return (
    <div className={classes.root}>
      <ChainMainInfo
        logoSrc={logoSrc}
        name={name}
        className={classes.mainInfo}
        description={
          <ChainRequestsLabel description={description} label={period} />
        }
      />
      <div className={classes.bottom}>
        <CopyToClipIcon text={chainLink} message={t('common.copy-message')} />
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
  );
};
