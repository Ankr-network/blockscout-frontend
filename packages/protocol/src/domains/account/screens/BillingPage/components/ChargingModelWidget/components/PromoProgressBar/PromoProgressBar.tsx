import { Clock } from '@ankr.com/ui';
import { Link, Tooltip, Typography } from '@mui/material';

import { useTooltip } from 'modules/common/components/TextTooltip';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { promoProgressBarTranslation } from './translation';
import { usePromoProgressBarStyles } from './usePromoProgressBarStyles';

export interface IPromoProgressBarProps {
  expiresAt?: string;
}

const separator = '·';

export const PromoProgressBar = ({ expiresAt }: IPromoProgressBarProps) => {
  const { classes } = usePromoProgressBarStyles();

  const tooltipProps = useTooltip();
  const { onOpen: handleTooltipOpen } = tooltipProps;

  const { keys, t } = useTranslation(promoProgressBarTranslation);

  return (
    <div className={classes.root}>
      <div className={classes.expiration}>
        <Clock size={20} />
        <Typography variant="body2">{expiresAt}</Typography>
      </div>
      <Typography variant="body3">{separator}</Typography>
      <Tooltip
        {...tooltipProps}
        classes={{ tooltip: classes.tooltip }}
        disableHoverListener
        placement="top"
        title={t(keys.tooltipTitle)}
      >
        <Link
          className={classes.link}
          component="div"
          onClick={handleTooltipOpen}
          tabIndex={-1} // to make it focusable
          variant="body3"
        >
          {t(keys.whatIsPromo)}
        </Link>
      </Tooltip>
    </div>
  );
};
