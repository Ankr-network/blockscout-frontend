import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useForm } from 'react-final-form';

import { projectsIntlRoot } from 'domains/projects/const';
import { useBalance } from 'domains/account/hooks/useBalance';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';

import { useSummaryContentStyles } from './useSummaryContentStyles';
import {
  PRICE_FOR_CONTRACT_USD,
  PRICE_FOR_CONTRACT_CREDITS,
  getCreditsAndUsdPrice,
  getContractsCount,
} from './SummaryContentUtils';
import { useCreditsPayment } from './hooks/useCreditsPayment';
import { useCreditCardPayment } from './hooks/useCreditCardPayment';
import { NewProjectFormValues } from '../../../../NewProjectFormTypes';

interface SummaryContentProps {
  onClose: () => void;
}

export const SummaryContent = ({ onClose }: SummaryContentProps) => {
  const { creditBalance } = useBalance({
    skipFetching: true,
  });

  const { cx, classes } = useSummaryContentStyles();

  const { getState } = useForm<NewProjectFormValues>();
  const { values } = getState();

  const contractsCount = useMemo(() => getContractsCount(values), [values]);

  const { credits, usd } = useMemo(
    () => getCreditsAndUsdPrice(contractsCount),
    [contractsCount],
  );
  const onCreditsPayClick = useCreditsPayment(values?.userEndpointToken);
  const onCreditCardPayClick = useCreditCardPayment(usd);

  const isInsufficientBalance = useMemo(
    () => new BigNumber(creditBalance)?.isLessThan(credits),
    [creditBalance, credits],
  );

  return (
    <div className={classes.content}>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.description}
      >
        {t(`${projectsIntlRoot}.summary.description`)}
      </Typography>
      <div className={classes.row}>
        <Typography variant="body2">
          {t(`${projectsIntlRoot}.summary.info.contract`)}
        </Typography>
        <Typography variant="body2">
          {t(`${projectsIntlRoot}.summary.info.price`, {
            contractsCount,
            credits: PRICE_FOR_CONTRACT_CREDITS,
            usd: PRICE_FOR_CONTRACT_USD,
          })}
        </Typography>
      </div>

      <div className={classes.row}>
        <Typography variant="subtitle2" className={classes.total}>
          {t(`${projectsIntlRoot}.summary.info.total`)}
        </Typography>
        <Typography variant="subtitle2">
          {t(`${projectsIntlRoot}.summary.info.total-amount`, {
            credits,
            usd,
          })}
        </Typography>
      </div>
      <div className={classes.buttons}>
        <div className={classes.buttonWrapper}>
          <TooltipWrapper
            hasIcon={false}
            className={cx({
              [classes.tooltipItem]: isInsufficientBalance,
            })}
            tooltipText={
              isInsufficientBalance
                ? t(`${projectsIntlRoot}.summary.info.tooltip`)
                : ''
            }
          >
            <Button
              onClick={onCreditsPayClick}
              size="large"
              fullWidth
              disabled={isInsufficientBalance}
            >
              {t(`${projectsIntlRoot}.summary.info.button-credits`)}
            </Button>
          </TooltipWrapper>

          <Typography
            variant={'body3' as Variant}
            className={classes.balance}
            color="textSecondary"
          >
            {t(`${projectsIntlRoot}.summary.info.balance`, {
              balance: creditBalance,
            })}
          </Typography>
        </div>

        <Button onClick={onCreditCardPayClick} size="large" fullWidth>
          {t(`${projectsIntlRoot}.summary.info.button-stripe`)}
        </Button>
      </div>
      <Button onClick={onClose} size="large" fullWidth variant="outlined">
        {t(`${projectsIntlRoot}.summary.info.cancel`)}
      </Button>
    </div>
  );
};
