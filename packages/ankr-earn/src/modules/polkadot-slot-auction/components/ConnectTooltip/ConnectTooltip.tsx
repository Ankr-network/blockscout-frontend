import { IconButton, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

import { t } from 'modules/i18n/utils/intl';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';

import { useConnectTooltipStyles } from './useConnectTooltipStyles';

interface IConnectTooltipProps {
  rootClass?: string;
}

export const ConnectTooltip = ({
  rootClass,
}: IConnectTooltipProps): JSX.Element => {
  const classes = useConnectTooltipStyles();

  return (
    <div className={classNames(classes.root, rootClass)}>
      <Tooltip
        className={classes.tooltip}
        title={t('polkadot-slot-auction.tooltips.connect-polkadot-wallet')}
      >
        <IconButton>
          <QuestionIcon size="xs" />
        </IconButton>
      </Tooltip>
    </div>
  );
};
